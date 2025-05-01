<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-vue-next";

const props = defineProps({
  class: { type: String, default: "" },
  variant: {
    type: String as PropType<
      "ghost" | "default" | "destructive" | "outline" | "secondary" | "link"
    >,
    default: "ghost",
  },
  children: { type: Object, default: () => ({ light: "", dark: "" }) },
});

const theme = ref("light");

const colorMode = useColorMode();

onMounted(() => {
  watch(
    () => colorMode.preference,
    (newValue) => {
      theme.value = newValue;
    },
    { immediate: true }
  );
});
</script>

<template>
  <Button
    :variant="props.variant"
    size="icon"
    :class="cn(theme === 'dark' ? 'inline-flex' : 'hidden', props.class)"
    class="size-8"
    @click="colorMode.preference = 'light'"
  >
    <Sun /> {{ props.children.light }}
  </Button>
  <Button
    :variant="props.variant"
    size="icon"
    :class="cn(theme === 'light' ? 'inline-flex' : 'hidden', props.class)"
    class="size-8!"
    @click="colorMode.preference = 'dark'"
  >
    <Moon /> {{ props.children.dark }}
  </Button>
</template>

<style></style>
