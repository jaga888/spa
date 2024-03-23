<template>
  <option
      :value="unit?.id"
      :class="{ activeText: unit.active, deactiveText: !unit.active}"
      @click="setActiveUnit(unit)"
  >
    {{ unit?.address }}
  </option>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {UnitList} from "~/services/unit/types";
import {useUnitStore} from "~/store/unit";

const {setActiveUnit} = useUnitStore();

defineProps({
  unit: {
    type: Object as PropType<UnitList>,
    default: <UnitList>{}
  },
})
</script>

<style>
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert {
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: .25rem;
}

.activeText{ color: #000000; }

.deactiveText{ color: #A6A6A6; }
</style>
