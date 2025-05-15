import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./assets/icons",
      },
    ],
  },
  app: {
    head: {
      title: "Nexuron",
      meta: [
        { name: "description", content: "Organize 10 Tin-LN" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
        },
      ],
    },
  },
});
