<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  variant: {
    type: String as PropType<
      "ghost" | "default" | "destructive" | "outline" | "secondary" | "link"
    >,
    default: "ghost",
  },
});

const emit = defineEmits(["handleOpenChange"]);
</script>

<template>
  <div
    :class="
      cn(buttonVariants({ variant: props.variant, size: 'sm' }), props.class)
    "
    @click="emit('handleOpenChange')"
  >
    <slot />
  </div>
</template>

<style></style>
