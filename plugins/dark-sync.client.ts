import { useDark } from "@vueuse/core";

export default defineNuxtPlugin(() => {
  const nuxtColor = useColorMode();
  const isDark = useDark();

  watch(
    isDark,
    (dark) => {
      nuxtColor.value = dark ? "dark" : "light";
    },
    { immediate: true }
  );

  watch(
    () => nuxtColor.value,
    (mode) => {
      isDark.value = mode === "dark";
    }
  );
});
