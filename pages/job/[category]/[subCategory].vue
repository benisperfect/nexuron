<template>
  <div>job {{ category }} {{ subCategory }}</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { category, subCategory } = route.params;
</script>

<style></style>
