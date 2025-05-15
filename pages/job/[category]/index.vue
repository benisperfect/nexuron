<template>
  <div>job {{ category }}</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { category } = route.params;
</script>

<style></style>
