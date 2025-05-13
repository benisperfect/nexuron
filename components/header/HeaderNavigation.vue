<script lang="ts" setup>
import { HEADER_TEAM, NAVIGATION_MENU } from "~/assets/constants/header";

const props = defineProps({
  menuClass: { type: String, default: "" },
  menuListClass: { type: String, default: "" },
  menuItemClass: { type: String, default: "" },
  menuLinkClass: { type: String, default: "" },
  menuLinkChildClass: { type: String, default: "" },
  menuTriggerClass: { type: String, default: "" },
  menuTriggerChildClass: { type: String, default: "" },
  menuContentClass: { type: String, default: "" },
});
</script>

<template>
  <NavigationMenu :class="props.menuClass">
    <NavigationMenuList :class="props.menuListClass">
      <NavigationMenuItem
        v-for="team in NAVIGATION_MENU"
        :key="team.id"
        :class="props.menuItemClass"
      >
        <NavigationMenuLink
          :href="team.url"
          class="font-medium"
          :class="props.menuLinkClass"
        >
          <div :class="props.menuLinkChildClass">
            {{ team.title }}
          </div>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem :class="props.menuItemClass">
        <NavigationMenuTrigger :class="props.menuTriggerClass">
          <div :class="props.menuTriggerChildClass">Ban tuyển dụng</div>
        </NavigationMenuTrigger>
        <LazyNavigationMenuContent>
          <ul class="grid gap-3 p-4" :class="props.menuContentClass">
            <li v-for="team in HEADER_TEAM" :key="team.id">
              <NavigationMenuLink as-child>
                <NuxtLink
                  :href="'/apply/' + team.url"
                  class="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div
                    class="text-base font-medium group-hover:translate-x-2 transition-[translate]"
                  >
                    {{ team.title }}
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {{ team.description }}
                  </p>
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </LazyNavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style></style>
