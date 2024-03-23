<template>
  <div class="senex__form__block">

    <div class="senex__form__header">
      {{ packetTemplate?.name }}
    </div>

    <PacketTemplateDocument
        v-for="packetTemplateDocument in packetTemplate?.packet_template_documents"
        :packetTemplateDocument="packetTemplateDocument"
    />
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PacketTemplateList} from "~/services/packet_template/types";
import PacketTemplateDocument from "~/components/clients/inspector/property/Tabs/Docs/PacketTemplateDocument.vue";

defineProps({
  packetTemplate: {
    type: Object as PropType<PacketTemplateList>,
  },
})
</script>
