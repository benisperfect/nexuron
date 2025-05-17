<script lang="ts" setup>
// const route = useRoute();

// const category = computed(() => String(route.query.category || ""));
// const subCategory = computed(() => String(route.query.subCategory || ""));

const cards = computed(() =>
  ["member", "vice", "head"]
    .map((role) =>
      team().map((t) => {
        const label = [
          t.name === "None" ? t.subName : t.name,
          t.name === "None" ? null : t.subName,
        ]
          .filter((v) => v != null)
          .join(" - ");

        const to = [
          t.name === "None" ? t.subName : t.name,
          t.name === "None" ? null : t.subName,
        ]
          .filter((v) => v != null)
          .join("-")
          .toLowerCase();
        return {
          label,
          icon: t.icon,
          to: `/apply/${to}?role=${role}`,
          description: t.description,
          role,
        };
      })
    )
    .flat()
);
</script>

<template>
  <div class="flex-1 pt-20">
    <div class="text-3xl font-semibold text-highlighted mb-10">
      Tuyển thành viên
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <UCard v-for="(card, index) in cards" :key="index">
        <div class="flex flex-col">
          <div
            class="flex items-center text-highlighted font-medium leading-0 gap-2"
          >
            <UIcon :name="card.icon" />
            {{ card.label }}
          </div>
          <div class="text-sm text-muted my-1">
            {{ card.description }}
          </div>
          <UBadge color="neutral" class="self-start mt-2">{{
            card.role.charAt(0).toUpperCase() + card.role.slice(1)
          }}</UBadge>
          <UButton
            class="mt-2 self-start"
            :to="card.to"
            size="sm"
            trailing-icon="i-lucide-arrow-right"
          >
            Đăng ký
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
