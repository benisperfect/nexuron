<script lang="ts" setup>
const props = defineProps({
  loop: {
    type: Number,
    default: 4,
  },
  itemLoop: {
    type: Number,
    default: 3,
  },
});
</script>

<template>
  <Select v-for="l in props.loop" :key="l">
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Chọn bộ lọc" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="i in props.itemLoop" :key="i" :value="i">
        Bộ lọc {{ i }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<style></style>
