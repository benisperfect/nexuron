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
</script>

<template>
  <NuxtLink
    href="/"
    class="size-8!"
    :class="
      cn(buttonVariants({ variant: props.variant, size: 'icon' }), props.class)
    "
  >
    <Icon name="uil:github" size="1rem" />
    <slot />
  </NuxtLink>
</template>

<style></style>
