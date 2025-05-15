<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const ban = [
  "None-Marketing",
  "Cybersecurity-Web",
  "Cybersecurity-App",
  "AI-ML",
  "AI-CV",
  "AI-NLP",
  "Web-Frontend",
  "Web-Backend",
  "Web-Ui_Ux",
  "App-Desktop",
  "App-Embedded",
  "None-Game",
];

const banDescription: Record<string, string> = {
  None: "General roles that don’t fit into a single tech‐category (e.g. marketing & game dev).",
  Cybersecurity:
    "Security positions focused on protecting web and application systems from threats.",
  AI: "Artificial-Intelligence roles: machine learning, computer vision and natural language processing.",
  Web: "Web-development jobs across front-end, back-end and UI/UX disciplines.",
  App: "Application development roles targeting desktop and embedded platforms.",
};

const route = useRoute();

const childrenItems = computed(() => {
  const seen = new Set<string>();
  return ban
    .map((str) => {
      const [category, subCategory] = str.split("-");
      const label = category === "None" ? subCategory : category;

      const to = {
        path: "/job",
        query:
          category === "None"
            ? { category: "None", subCategory }
            : { category },
      };

      const active =
        route.path === "/job" &&
        String(route.query.category) === category &&
        (category === "None"
          ? String(route.query.subCategory) === subCategory
          : true);

      return {
        label,
        icon: "i-lucide-users",
        to,
        description: banDescription[category],
        active,
      };
    })
    .filter((item) => {
      if (seen.has(item.label)) return false;
      seen.add(item.label);
      return true;
    });
});

const items = computed<NavigationMenuItem[]>(() => [
  { label: "Trang chủ", icon: "i-lucide-home", to: "/" },
  {
    label: "Tuyển thành viên",
    icon: "i-lucide-users",
    to: "/job",
    children: childrenItems.value,
  },
  { label: "Liên hệ", icon: "i-lucide-mail", to: "/contact" },
]);
</script>

<template>
  <div
    class="fixed top-0 flex justify-between items-center h-15 w-full border-b border-muted px-7 gap-2 z-50"
  >
    <NuxtLink to="/" class="flex-1 flex justify-between items-center h-10 w-27">
      <UIcon name="i-custom-logo" size="24" />
      <div
        class="hidden sm:inline text-highlighted italic text-xl font-medium leading-0"
      >
        Nexuron
      </div>
    </NuxtLink>
    <div class="flex-4">
      <UNavigationMenu
        :items="items"
        :ui="{
          root: 'w-full justify-center hidden md:flex',
        }"
        highlight
        variant="link"
      />
    </div>
    <div class="flex-1 flex items-center justify-end">
      <UButton
        variant="ghost"
        color="neutral"
        class="size-8 p-0 justify-center"
      >
        <UIcon name="i-lucide-search" />
      </UButton>
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          variant="ghost"
          color="neutral"
          class="size-8 p-0 justify-center"
          @click="isDark = !isDark"
        >
          <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" />
        </UButton>
        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
      <USlideover>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-menu"
          class="size-8 justify-center md:hidden"
        />

        <template #title>
          <NuxtLink to="/" class="flex items-center gap-2">
            <UIcon name="i-custom-logo" size="24" />
            <div
              class="hidden sm:inline text-highlighted italic text-xl font-medium leading-0"
            >
              Nexuron
            </div>
          </NuxtLink>
        </template>
        <template #body>
          <UNavigationMenu
            :items="items"
            :ui="{
              root: 'w-full justify-center',
              linkLabel: 'text-base font-semibold',
            }"
            highlight
            variant="link"
            orientation="vertical"
          />
        </template>
        <template #footer> </template>
      </USlideover>
    </div>
  </div>
</template>
