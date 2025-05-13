<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import FormLabel from "~/components/ui/form/FormLabel.vue";

const emptyFiles = ref<FileList | null>(null);

onMounted(() => {
  emptyFiles.value = new DataTransfer().files;
});

const rawSchema = z.object({
  name: z.string().min(1, "Họ và tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  schoolClass: z.string().min(1, "Trường lớp không được để trống"),
  plan: z.string().min(1, "Kế hoạch không được để trống"),
  personality: z.string().min(1, "Tính cách không được để trống"),
  answer: z.string().min(1, "Câu trả lời không được để trống"),
  portfolio: z.string().optional(),
  cv: z
    .any()
    .transform<File[]>((v) =>
      v instanceof FileList
        ? Array.from(v)
        : Array.isArray(v)
        ? v
        : v instanceof File
        ? [v]
        : []
    )
    .superRefine((arr, ctx) => {
      if (arr.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hãy chọn tệp",
        });
        return;
      }

      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ] as const;

      if (!allowed.includes(arr[0].type as (typeof allowed)[number])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Chỉ chấp nhận PDF/DOC/DOCX",
        });
      }
    }),
});

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: toTypedSchema(rawSchema),
  initialValues: {
    name: "",
    email: "",
    phone: "",
    schoolClass: "",
    plan: "",
    personality: "",
    answer: "",
    cv: emptyFiles.value ?? ([] as unknown as FileList),
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <form
    class="border flex-1 flex flex-col p-6 rounded-xs gap-6"
    @submit="onSubmit"
  >
    <div class="text-3xl font-semibold mt-2">Nộp đơn ứng tuyển</div>
    <div class="text-muted-foreground">
      Nếu bạn thấy Mô tả công việc phù hợp với bạn, hãy điền đơn ứng tuyển ngay
      nhé!
    </div>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="name"
    >
      <FormItem class="space-y-2">
        <FormLabel> Họ và Tên </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Ví dụ: Trịnh Văn A"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="email"
    >
      <FormItem class="space-y-2">
        <FormLabel> Email </FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="Ví dụ: studentViDu@ptnk.edu.vn"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="phone"
    >
      <FormItem class="space-y-2">
        <FormLabel> Số điện thoại </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Ví dụ: 0123456789"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="schoolClass"
    >
      <FormItem class="space-y-2">
        <FormLabel> Trường-Lớp </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Ví dụ: Phổ thông Năng khiếu - 10 VD"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="plan"
    >
      <FormItem class="space-y-2">
        <FormLabel> Bạn có dự định gì trong 12 tháng tới? </FormLabel>
        <FormControl>
          <Textarea type="text" placeholder=" " v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="personality"
    >
      <FormItem class="space-y-2">
        <FormLabel>
          Hãy miêu tả tính cách của bạn bằng 3 tính từ. Bạn nghĩ người khác có
          thể đánh giá bạn là người như thế nào?
        </FormLabel>
        <FormControl>
          <Textarea type="text" placeholder=" " v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="answer"
    >
      <FormItem class="space-y-2">
        <FormLabel> Phần trả lời dành cho câu hỏi chuyên môn. </FormLabel>
        <FormControl>
          <Textarea type="text" placeholder=" " v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="portfolio"
    >
      <FormItem class="space-y-2">
        <FormLabel>
          Đính kèm portfolio (Dành cho Tiểu ban Thiết kế, Tiểu ban Quản lý Nội
          dung và Tiểu ban Hình ảnh)
        </FormLabel>
        <FormControl>
          <Textarea type="text" placeholder=" " v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      :validate-on-blur="!isFieldDirty"
      name="cv"
    >
      <FormItem class="space-y-2">
        <FormLabel> Tải lên CV/Resume </FormLabel>
        <FormControl>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            class="input w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white"
            :name="componentField.name"
            @change="componentField.onChange"
            @blur="componentField.onBlur"
          >
        </FormControl>
        <FormDescription> Định dạng hỗ trợ: .pdf, .doc, .docx </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="self-start"> Nộp đơn ứng tuyển </Button>
  </form>
</template>

<style></style>
