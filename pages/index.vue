<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})
</script>

<template>
  <div>
    <p>This page will be displayed at the /index page.</p>
  </div>
</template>
