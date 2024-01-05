<script setup lang="ts">
import {definePageMeta} from "nuxt/dist/pages/runtime";

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
