<script lang="ts" setup>
// const route = useRoute();

// const category = computed(() => String(route.query.category || ""));
// const subCategory = computed(() => String(route.query.subCategory || ""));

// const banItem = team().map((str) => {
//   const label = str.name === "None" ? str.subName : str.name;
//   const subLabel = str.name === "None" ? "" : str.subName;

//   return {
//     icon: str.icon,
//     description: str.description,
//     subLabel,
//     label,
//   };
// });
const cards = computed(() =>
  team().map((t) =>
    [
      t.name === "None" ? t.subName : t.name,
      t.name === "None" ? null : t.subName,
    ].join(" - ")
  )
);
</script>

<template>
  <div class="flex-1 pt-20">
    <div class="text-3xl font-semibold mb-10">Tuyển thành viên</div>
    <!-- <PagesJobOpeningsSearchAndFilter
      :is-filter-on
      @toggle-filter="toggleFilter"
    /> -->
    <!-- <div
      :class="isFilterOn ? 'h-42 sm:h-20 lg:h-20' : 'h-0'"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 transition-[height] duration-300 overflow-hidden my-4"
    >
      <LazyPagesJobOpeningsSelect :loop="4" :item-loop="4" />
    </div> -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <UCard v-for="(card, index) in cards" :key="index">
        <template #header>
          <!-- <Placeholder class="h-8" /> -->
           {{ card }}
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </div>
  </div>
</template>
