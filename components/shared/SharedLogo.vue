<script lang="ts" setup>
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="props.class" class="flex items-center h-10 text-2xl italic">
    Logo
  </div>
</template>

<style></style>
