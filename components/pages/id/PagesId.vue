<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";
import { TeamId } from "~/assets/constants/id";
import { buttonVariants } from "~/components/ui/button";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const team = computed(() => TeamId.find((team) => team.id === props.id));

watchEffect(() => {
  if (!team.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Team not found",
    });
  }
});
</script>

<template>
  <div v-if="team" class="flex-1 flex flex-col">
    <div class="text-4xl font-semibold mt-20 mb-12">{{ team.title }}</div>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 flex flex-col gap-2">
        <div
          class="bg-primary text-background w-fit px-2 py-1 italic rounded-xs font-medium mb-10"
        >
          Deadline: {{ team.deadline }}
        </div>
        <div v-for="desc in team.description" :key="desc.title" class="mb-6">
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
              v-for="text in desc.description"
              :key="text"
              :class="desc.isQuestion ? 'hidden' : ''"
            >
              {{ text }}
            </li>
            <li
              v-for="(text, i) in desc.description"
              :key="text"
              class="list-none"
              :class="desc.isQuestion ? '' : 'hidden'"
            >
              <div>
                <span class="font-medium">
                  {{ "Câu " + (i + 1) + ". " }}
                </span>
                {{ text }}
              </div>
            </li>
          </div>
        </div>
        <div>
          <span class="font-medium"> Chức năng: </span>
          {{ team.function }}
        </div>
        <div>
          <span class="font-medium"> Chức vụ: </span>
          {{ team.position }}
        </div>
      </div>
      <div class="flex-1 flex p-1 h-fit">
        <PagesIdForm />
      </div>
    </div>
    <div class="mt-4">
      <NuxtLink
        href="/job-openings"
        :class="buttonVariants({ variant: 'link' })"
      >
        <ArrowLeft />
        Tất cả vị trí đang tuyển dụng
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
