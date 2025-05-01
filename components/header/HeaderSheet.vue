<script lang="ts" setup>
import { Menu } from "lucide-vue-next";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="size-8 md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="gap-0">
      <SheetHeader>
        <SharedLogo class="justify-center py-16" />
      </SheetHeader>
      <div class="flex justify-center px-4 pb-2">
        <Separator />
      </div>
      <div class="flex flex-col">
        <HeaderNavigation
          menu-class="max-w-none [&>div:first-child]:w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2"
          menu-list-class="flex-col"
          menu-item-class="w-full"
          menu-link-class="text-lg pl-8 rounded-none"
          menu-link-child-class="hover:translate-x-2 transition-[translate]"
          menu-trigger-class="text-lg font-medium w-full justify-start h-11 pl-8 rounded-none transition-colors duration-500"
          menu-trigger-child-class="group-hover:translate-x-2 duration-300 transition-[translate]"
          menu-content-class="w-[300px]"
        />
      </div>
      <SheetFooter>
        <div class="flex gap-2">
          <HeaderToggleTheme
            class="flex-1"
            variant="outline"
            :children="{ light: 'Chế độ sáng', dark: 'Chế độ tối' }"
          />
          <HeaderGithub class="flex-1" variant="outline"> Github </HeaderGithub>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<style></style>
