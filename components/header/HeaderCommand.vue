<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["handleOpenChange"]);
</script>

<template>
  <CommandDialog :open="props.open" @update:open="emit('handleOpenChange')">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
    </CommandList>
  </CommandDialog>
</template>

<style></style>
