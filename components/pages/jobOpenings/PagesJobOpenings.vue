<script lang="ts" setup>
const isFilterOn = ref(false);

function toggleFilter() {
  isFilterOn.value = !isFilterOn.value;
}
</script>

<template>
  <div class="flex-1 pt-20">
    <div class="text-3xl font-semibold mb-10">Tuyển thành viên</div>
    <PagesJobOpeningsSearchAndFilter
      :is-filter-on
      @toggle-filter="toggleFilter"
    />
    <div
      :class="isFilterOn ? 'h-42 sm:h-20 lg:h-20' : 'h-0'"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 transition-[height] duration-300 overflow-hidden my-4"
    >
      <LazyPagesJobOpeningsSelect :loop="4" :item-loop="4" />
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <PagesJobOpeningsCard />
    </div>
  </div>
</template>

<style></style>
