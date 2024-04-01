<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Signatures</legend>
    <Signature v-for="signature in signatures" :signature="signature"/>
  </fieldset>
</template>

<script setup lang="ts">
import Signature from "~/components/clients/inspector/user/tabs/information/fieldset/Signature.vue";
import type {Signature as SignatureType} from "~/services/signature/types";

defineProps({
  signatures: {
    type: Array<SignatureType>,
  },
});
</script>
