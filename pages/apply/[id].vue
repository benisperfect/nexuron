<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <PagesId :id="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id" />
</template>

<style></style>
