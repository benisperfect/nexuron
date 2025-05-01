<script lang="ts" setup>
import { ArrowRight } from "lucide-vue-next";
import { HEADER_TEAM } from "~/assets/constants/header";
</script>

<template>
  <Card
    v-for="team in HEADER_TEAM"
    :key="team.id"
    class="rounded-md gap-0 hover:scale-103 transition-[scale] duration-300"
  >
    <NuxtLink :href="'/apply/' + team.url">
      <CardHeader>
        <CardTitle
          class="text-lg font-semibold pb-3 underline underline-offset-3"
        >
          {{ team.title }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-1.5">
          <div class="text-sm text-muted-foreground">
            {{ team.function }}
          </div>
          <div class="text-sm text-muted-foreground">
            {{ team.position }}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" class="p-0!">
          Xem chi tiết <ArrowRight />
        </Button>
      </CardFooter>
    </NuxtLink>
  </Card>
</template>

<style></style>
