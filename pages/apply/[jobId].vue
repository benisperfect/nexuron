<script lang="ts" setup>
const route = useRoute();
const { jobId } = route.params as { jobId: string };
</script>

<template>
  <div>{{ jobId }}</div>
</template>
