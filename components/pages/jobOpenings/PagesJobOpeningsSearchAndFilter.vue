<script lang="ts" setup>
import { Search, Settings2 } from "lucide-vue-next";
import { buttonVariants } from "~/components/ui/button";

const props = defineProps({
  isFilterOn: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggleFilter"]);
</script>

<template>
  <div class="flex gap-4">
    <div class="relative flex-1">
      <Input placeholder="Tìm kiếm..." class="pr-10" />
      <div
        :class="buttonVariants({ variant: 'ghost', size: 'icon' })"
        class="absolute top-1/2 -translate-y-1/2 right-0.5 size-8!"
      >
        <Search />
      </div>
    </div>
    <div
      :class="
        buttonVariants({ variant: props.isFilterOn ? 'default' : 'outline' })
      "
      @click="emit('toggleFilter')"
    >
      <Settings2 />
      Filter {{ props.isFilterOn ? "On" : "Off" }}
    </div>
  </div>
</template>

<style></style>
