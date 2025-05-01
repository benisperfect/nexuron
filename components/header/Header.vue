<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { useMagicKeys } from "@vueuse/core";

const open = ref(false);

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    }
  },
});

watch(
  [Meta_K, Ctrl_K],
  ([metaK, ctrlK]) => {
    if (metaK || ctrlK) {
      handleOpenChange();
    }
  },
  { immediate: true }
);

function handleOpenChange() {
  open.value = !open.value;
}
</script>

<template>
  <div
    class="fixed top-0 flex justify-between items-center h-15 w-full bg-background border-b px-3 gap-2 z-50"
  >
    <SharedLogo class="flex-1 pl-3" />
    <div class="flex-4 flex justify-center">
      <HeaderNavigation
        menu-class="hidden md:flex [&>div:last-child]:-left-1/4"
        menu-content-class="w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
      />
      <HeaderSearch
        class="md:hidden w-full justify-between! p-1.5!"
        variant="outline"
        @handle-open-change="handleOpenChange"
      >
        <div class="text-sm font-normal leading-none pl-3">Tìm kiếm...</div>
        <kbd
          class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
        >
          <span class="text-xs">{{ Meta_K ? "⌘" : "Ctrl" }}</span
          >K
        </kbd>
      </HeaderSearch>
    </div>

    <div class="flex-1 flex flex-row-reverse items-center w-36 gap-0.5">
      <LazyHeaderSheet />
      <HeaderToggleTheme />
      <HeaderGithub />
      <HeaderSearch
        class="size-8! hidden! md:inline-flex!"
        @handle-open-change="handleOpenChange"
      >
        <Search />
      </HeaderSearch>
    </div>
  </div>
  <LazyHeaderCommand :open @handle-open-change="handleOpenChange" />
</template>

<style></style>
