<script lang="ts" setup></script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div
      class="flex-1 flex flex-col lg:w-4xl md:w-2xl sm:w-xl w-sm mx-auto transition-all duration-300 pt-15"
    >
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style></style>
