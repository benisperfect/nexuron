<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { ref, reactive, watch, onBeforeUnmount, onMounted } from "vue";

const infoSchema = z.object({
  fullname: z.string().min(1, { message: "Họ và tên đầy đủ là bắt buộc" }),
  email: z
    .string()
    .email({ message: "Địa chỉ email không hợp lệ" })
    .refine((e) => e.toLowerCase().endsWith("@ptnk.edu.vn"), {
      message: "Email phải có đuôi @ptnk.edu.vn",
    }),
  phone: z.string().regex(/^0\d{7,14}$/, {
    message: "Số điện thoại phải bắt đầu bằng 0 và chỉ chứa số",
  }),
  github: z
    .string()
    .url({ message: "Invalid URL" })
    .regex(/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/, {
      message: "Phải là một liên kết GitHub hợp lệ",
    }),
  facebook: z
    .string()
    .url({ message: "Invalid URL" })
    .regex(/^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/, {
      message: "Phải là một liên kết Facebook hợp lệ",
    }),
});

const emailTokenSchema = z.object({
  token: z.string().regex(/^[0-9]{64}$/, {
    message: "Mã xác thực phải là 64 chữ số",
  }),
});

const detailSchema = z.object({
  plan_in_the_next_12_months: z
    .string()
    .min(50, {
      message: "Kế hoạch trong 12 tháng tới phải có ít nhất 50 ký tự",
    })
    .max(200, {
      message: "Kế hoạch trong 12 tháng tới tối đa chỉ được 200 ký tự",
    }),
  how_do_people_think_about_you: z
    .string()
    .min(50, {
      message: "Mọi người nghĩ gì về bạn phải có ít nhất 50 ký tự",
    })
    .max(200, {
      message: "Mọi người nghĩ gì về bạn tối đa chỉ được 200 ký tự",
    }),
  specialized_answer: z
    .string()
    .min(50, {
      message: "Câu hỏi chuyên môn phải có ít nhất 50 ký tự",
    })
    .max(200, {
      message: "Câu hỏi chuyên môn tối đa chỉ được 200 ký tự",
    }),
  portfolio_link: z
    .string()
    .url({ message: "Liên kết portfolio phải hợp lệ" })
    .regex(/^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/, {
      message: "Liên kết portfolio phải là một liên kết hợp lệ (bắt đầu bằng http:// hoặc https://)",
    }),
  link_CV_resume: z
    .string()
    .url({ message: "Liên kết đến CV/Resume phải hợp lệ" })
    .regex(/^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/, {
      message: "Liên kết CV/Resume phải là một liên kết hợp lệ (bắt đầu bằng http:// hoặc https://)",
    }),
});

type Info = z.output<typeof infoSchema>;
type EmailToken = z.output<typeof emailTokenSchema>;
type Detail = z.output<typeof detailSchema>;

const route = useRoute();
const toast = useToast();

const { jobId } = route.params as { jobId: string };
const { role } = route.query as { role: string };

const storedForm = useLocalStorage<Partial<Info>>(
  "nexuron:infoForm",
  {} as Partial<Info>
);

const storedEmailToken = useLocalStorage<Partial<EmailToken>>(
  "nexuron:emailToken",
  {} as Partial<EmailToken>
);

const storedDetail = useLocalStorage<
  Record<string, Record<string, Partial<Detail>>>
>("nexuron:detailForm", { [jobId]: { [role]: {} } });

const infoState = reactive<Partial<Info>>({
  fullname: "",
  email: "",
  phone: "",
  github: "",
  facebook: "",
});

onMounted(() => {
  // Chỉ load từ localStorage ở client
  if (storedForm.value) {
    infoState.fullname = storedForm.value.fullname ?? "";
    infoState.email = storedForm.value.email ?? "";
    infoState.phone = storedForm.value.phone ?? "";
    infoState.github = storedForm.value.github ?? "";
    infoState.facebook = storedForm.value.facebook ?? "";
  }
  if (storedEmailToken.value?.token) {
    emailTokenState.token = storedEmailToken.value.token;
  }
  loadDetailState();
});

const emailTokenState = reactive<Partial<EmailToken>>({
  token: "",
});

onMounted(() => {
  // Chỉ load từ localStorage ở client
  if (storedEmailToken.value?.token) {
    emailTokenState.token = storedEmailToken.value.token;
  }
});

const detailState = reactive<Record<string, Record<string, Partial<Detail>>>>(
  { [jobId]: { [role]: {} } }
);

function loadDetailState() {
  if (!detailState[jobId]) detailState[jobId] = {};
  // Only load from localStorage on client
  if (import.meta.client) {
    detailState[jobId][role] = {
      plan_in_the_next_12_months: storedDetail.value[jobId]?.[role]?.plan_in_the_next_12_months ?? "",
      how_do_people_think_about_you: storedDetail.value[jobId]?.[role]?.how_do_people_think_about_you ?? "",
      specialized_answer: storedDetail.value[jobId]?.[role]?.specialized_answer ?? "",
      portfolio_link: storedDetail.value[jobId]?.[role]?.portfolio_link ?? "",
      link_CV_resume: storedDetail.value[jobId]?.[role]?.link_CV_resume ?? "",
    };
  } else {
    // SSR: always empty to avoid hydration mismatch
    detailState[jobId][role] = {
      plan_in_the_next_12_months: "",
      how_do_people_think_about_you: "",
      specialized_answer: "",
      portfolio_link: "",
      link_CV_resume: "",
    };
  }
}

onMounted(loadDetailState);
watch([() => jobId, () => role], loadDetailState);

// Cooldown state for resend code
const cooldown = ref(0);
let cooldownInterval: ReturnType<typeof setInterval> | null = null;

async function sendVerificationCode() {
  if (cooldown.value > 0) return;
  try {
    await $fetch("/api/emailValidation", {
      method: "POST",
      body: infoState,
    });
    toast.add({
      title: "Thành công",
      description: "Đã gửi mã xác thực đến email của bạn.",
      color: "success",
    });
    cooldown.value = 60;
    cooldownInterval = setInterval(() => {
      if (cooldown.value > 0) cooldown.value--;
      if (cooldown.value === 0 && cooldownInterval) {
        clearInterval(cooldownInterval);
        cooldownInterval = null;
      }
    }, 1000);
  } catch (err: unknown) {
    const error = err as { status?: number; data?: any; message?: string };
    toast.add({
      title: "Lỗi",
      description:
        error.data?.message ? error.data?.message : error.data?.data?.msg ? error.data?.data?.msg : error.message ? error.message : "Gửi mã xác thực thất bại",
      color: "error",
    });
  }
}

watch(
  infoState,
  (newVal) => {
    storedForm.value = newVal;
  },
  { deep: true }
);

watch(
  emailTokenState,
  (newVal) => {
    storedEmailToken.value = newVal;
  },
  { deep: true }
);

watch(
  () => detailState[jobId]?.[role],
  (newVal) => {
    if (!storedDetail.value[jobId]) storedDetail.value[jobId] = {};
    storedDetail.value[jobId][role] = { ...newVal };
  },
  { deep: true }
);

async function onDetailSubmit(event: FormSubmitEvent<Detail>) {
  try {
    await $fetch("/api/apply", {
      method: "POST",
      query: { jobId, role },
      body: {
        user_info: infoState,
        detail: event.data,
        verify_code: emailTokenState.token,
      },
    });

    toast.add({
      title: "Success",
      description: "Nộp đơn thành công",
      color: "success",
    });

    detailState[jobId][role] = {} as Detail;
  } catch (err: unknown) {
    const error = err as { status?: number; data?: any; message?: string };
    if (
      error?.status === 400 &&
      (error?.data?.data?.msg === "Invalid or already used verification code" ||
        error?.message === "Invalid or already used verification code")
    ) {
      toast.add({
        title: "Lỗi",
        description:
          "Mã xác thực không hợp lệ hoặc đã được sử dụng. Vui lòng nhập lại thông tin cá nhân và xác thực email.",
        color: "error",
      });
    } else {
      toast.add({
        title: "Lỗi",
        description:
          error.data?.message ? error.data?.message : error.data?.data?.msg ? error.data?.data?.msg : error.message ? error.message : "Nộp đơn thất bại",
        color: "error",
      });
    }
  }
}
</script>

<template>
  <div>
    <div class="flex-1 flex flex-col">
      <div class="text-4xl font-semibold mt-20 mb-12">
        {{
          teamDescription(jobId, role)
            ?.title.split("-")
            .map((ts) =>
              ts
                .split("_")
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .join(" ")
            )
            .join(" ")
        }}
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex flex-col gap-2">
          <div
            class="bg-primary text-inverted w-fit px-2 py-1 italic rounded-xs font-medium mb-10"
          >
            Deadline: {{ teamDescription(jobId, role)?.deadline }}
          </div>
          <div
            v-for="desc in teamDescription(jobId, role)?.description"
            :key="desc.title"
            class="mb-6"
          >
            <div class="text-3xl font-semibold">{{ desc.title }}</div>
            <div
              class="text-muted-foreground"
              :class="
                desc.isQuestion
                  ? 'border mt-4 px-3 py-2 rounded-xs space-y-6'
                  : 'pl-10 py-6 space-y-1'
              "
            >
              <li
                v-for="(text, idx) in desc.description"
                :key="typeof text === 'string' ? text : text.link || idx"
                :class="desc.isQuestion ? 'hidden' : ''"
              >
                <template v-if="typeof text === 'string'">
                  {{ text }}
                </template>
                <template v-else>
                  <a
                    :href="text.link"
                    target="_blank"
                    rel="noopener"
                    class="text-blue-600 underline"
                  >
                    {{ text.text || text.link }}
                  </a>
                </template>
              </li>
              <li
                v-for="(text, i) in desc.description"
                :key="typeof text === 'string' ? text : text.link || i"
                class="list-none"
                :class="desc.isQuestion ? '' : 'hidden'"
              >
                <div>
                  <span class="font-medium">
                    {{ "Câu " + (i + 1) + ". " }}
                  </span>
                  <template v-if="typeof text === 'string'">
                    {{ text }}
                  </template>
                  <template v-else>
                    <a
                      :href="text.link"
                      target="_blank"
                      rel="noopener"
                      class="text-blue-600 underline"
                    >
                      {{ text.text || text.link }}
                    </a>
                  </template>
                </div>
              </li>
            </div>
          </div>
          <div>
            <span class="font-medium"> Chức năng: </span>
            {{ teamDescription(jobId, role)?.function }}
          </div>
          <div>
            <span class="font-medium"> Chức vụ: </span>
            {{ teamDescription(jobId, role)?.position }}
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4 p-1 h-fit">
          <!-- User Info Form -->
          <UForm
            :schema="infoSchema"
            :state="infoState"
            class="space-y-4 border-2 border-muted rounded-md p-4 w-full mb-4"
          >
            <div class="text-3xl font-medium text-highlighted pb-3 pt-1">
              Thông tin cá nhân
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField
                required
                label="Họ tên"
                name="fullname"
                help="Nhập họ tên đầy đủ"
              >
                <UInput v-model="infoState.fullname" class="w-full" type="text" />
              </UFormField>
              <UFormField
                required
                label="Email"
                name="email"
                help="Đuôi của email phải là @ptnk.edu.vn"
              >
                <UInput v-model="infoState.email" class="w-full" type="email" />
              </UFormField>
              <UFormField
                required
                label="Số điện thoại"
                name="phone"
                help="Số điện thoại phải bắt đầu bằng 0 và chỉ chứa số"
              >
                <UInput v-model="infoState.phone" class="w-full" type="tel" />
              </UFormField>
              <UFormField
                required
                label="GitHub"
                name="github"
                help="Vui lòng nhập một liên kết GitHub hợp lệ"
              >
                <UInput v-model="infoState.github" class="w-full" type="url" />
              </UFormField>
              <UFormField
                required
                label="Facebook"
                name="facebook"
                help="Vui lòng nhập một liên kết Facebook hợp lệ"
              >
                <UInput v-model="infoState.facebook" class="w-full" type="url" />
              </UFormField>
            </div>
          </UForm>
          <!-- Email Token Form -->
          <UForm
            :schema="emailTokenSchema"
            :state="emailTokenState"
            class="space-y-4 border-2 border-muted rounded-md p-4 w-full mb-4"
          >
            <div class="text-3xl font-medium text-highlighted pb-3 pt-1">
              Xác thực email
            </div>
            <div class="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
              <div class="flex-1">
                <UFormField
                  required
                  label="Mã xác thực"
                  name="token"
                  class="w-full"
                  help="Vui lòng nhập mã xác thực đã gửi đến email của bạn"
                >
                  <UInput
                    v-model="emailTokenState.token"
                    class="w-full"
                    type="text"
                  />
                </UFormField>
              </div>
            </div>
            <UButton
                type="button"
                :disabled="cooldown > 0"
                @click="sendVerificationCode"
              >
                {{ cooldown > 0 ? `Gửi lại mã (${cooldown}s)` : "Gửi mã" }}
              </UButton>
          </UForm>
          <!-- Detail Form -->
          <UForm
            :schema="detailSchema"
            :state="detailState[jobId][role]"
            class="space-y-4 border-2 border-muted rounded-md p-4 w-full"
            @submit="onDetailSubmit"
          >
            <div class="text-3xl font-medium text-highlighted pb-3 pt-1">
              Nộp đơn ứng tuyển
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField
                required
                label="Kế hoạch trong 12 tháng tới"
                name="plan_in_the_next_12_months"
                help="Vui lòng viết ít nhất 50 ký tự và tối đa 200 ký tự"
              >
                <UTextarea
                  v-model="detailState[jobId][role].plan_in_the_next_12_months"
                  class="w-full"
                  type="text"
                />
              </UFormField>
              <UFormField
                required
                label="Mọi người nghĩ gì về bạn"
                name="how_do_people_think_about_you"
                help="Vui lòng viết ít nhất 50 ký tự và tối đa 200 ký tự"
              >
                <UTextarea
                  v-model="detailState[jobId][role].how_do_people_think_about_you"
                  class="w-full"
                  type="text"
                />
              </UFormField>
              <UFormField
                required
                label="Câu hỏi chuyên môn"
                name="specialized_answer"
                help="Vui lòng viết ít nhất 50 ký tự và tối đa 200 ký tự"
              >
                <UTextarea
                  v-model="detailState[jobId][role].specialized_answer"
                  class="w-full"
                  type="text"
                />
              </UFormField>
              <UFormField
                required
                label="Link portfolio"
                name="portfolio_link"
                help="Vui lòng nhập một liên kết hợp lệ"
              >
                <UInput
                  v-model="detailState[jobId][role].portfolio_link"
                  class="w-full"
                  type="url"
                />
              </UFormField>
              <UFormField
                required
                label="Link CV/Resume"
                name="link_CV_resume"
                help="Vui lòng nhập một liên kết hợp lệ"
              >
                <UInput
                  v-model="detailState[jobId][role].link_CV_resume"
                  class="w-full"
                  type="url"
                />
              </UFormField>
            </div>
            <UButton type="submit"> Nộp đơn </UButton>
          </UForm>
        </div>
      </div>
      <div class="mt-4">
        <UButton
          variant="link"
          class="text-muted-foreground underline underline-offset-3"
          to="/jobs"
          icon="i-lucide-arrow-left"
        >
          Tất cả vị trí đang tuyển dụng
        </UButton>
      </div>
    </div>
  </div>
</template>