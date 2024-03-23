<template>
  <div class="senex__form__fieldset">
    <div class="senex__form__legend">
      {{ processingTypeAvailability?.processing_type.name }}
    </div>
    <PacketTemplate
        v-for="packetTemplate in processingTypeAvailability?.packet_templates"
        :packetTemplate="packetTemplate"
    />
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";
import PacketTemplate from "~/components/clients/inspector/property/Tabs/Docs/PacketTemplate.vue";

defineProps({
  processingTypeAvailability: {
    type: Object as PropType<ProcessingTypeAvailabilityList>,
  },
})
</script>
