<template>
  <div class="senex__form__text senex__form__text--list" v-if="packetTemplateDocument?.document_type.document_template">
    <a href="#" target="_blank" style="margin-left: -25px">
      <PDFIcon width="1.5em" height="1.5em" />
      {{ packetTemplateDocument.document_type.document_template.name }} ({{ packetTemplateDocument.document_type.name }})
    </a>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PacketTemplateList} from "~/services/packet_template/types";
import type {PacketTemplateDocumentList} from "~/services/packet_template_document/types";
import PDFIcon from "~/components/icons/File/PDFIcon.vue";

defineProps({
  packetTemplateDocument: {
    type: Object as PropType<PacketTemplateDocumentList>,
  },
})
</script>
