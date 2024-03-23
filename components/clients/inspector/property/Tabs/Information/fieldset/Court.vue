<template>
  <option :value="court?.id">{{ court?.short_name }}</option>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {Court} from "~/services/court/types";

defineProps({
  court: {
    type: Object as PropType<Court>,
  },
})
</script>
