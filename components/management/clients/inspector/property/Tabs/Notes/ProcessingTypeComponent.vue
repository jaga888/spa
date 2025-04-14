<template>
  <option :value="processingType.id">
    {{ processingType.name }}
  </option>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ProcessingType} from "~/services/processing_type/types";

defineProps({
  processingType: {
    type: Object as PropType<ProcessingType>,
    default: <ProcessingType>{}
  },
})
</script>
