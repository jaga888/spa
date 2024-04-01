<template>
  <div class="senex__form__block">
    <div class="senex__form__item-group">
      <div class="senex__form__item">
        <img :src="signature.image_base64" v-if="signature.image_base64" alt=""/>
        <img :src="'/assets/signatures/' + signature.filename" style="width: 100%" v-else alt=""/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Signature} from "~/services/signature/types";
import type {PropType} from "vue";

defineProps({
  signature: {
    type: Object as PropType<Signature>,
    default: {}
  },
})
</script>
