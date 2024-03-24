<template>
  <option :value="chargeType.id">
    {{ chargeType.name }}
  </option>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {ChargeType} from "~/services/charge_type/types";

defineProps({
  chargeType: {
    type: Object as PropType<ChargeType>,
    default: <ChargeType>{}
  },
})
</script>
