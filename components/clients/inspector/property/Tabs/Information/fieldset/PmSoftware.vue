<template>
  <option :value="pmSoftware?.id">{{ pmSoftware?.name }}</option>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PmSoftwareList} from "~/services/pm_software/types";

defineProps({
  pmSoftware: {
    type: Object as PropType<PmSoftwareList>,
  },
})
</script>
