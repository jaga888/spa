<template>
  <div class="senex__form__fieldset">
    <div class="senex__form__legend">
      {{ processingTypeAvailability?.processing_type.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";

defineProps({
  processingTypeAvailability: {
    type: Object as PropType<ProcessingTypeAvailabilityList>,
  },
})
</script>
