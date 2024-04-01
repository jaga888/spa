<template>
  <div class="senex__form__item-group">
    <div class="senex__form__item">
      <input
          type="checkbox"
          class="senex__form__checkbox"
          name="properties[]"
          :id="'form-user-property-' + property.id"
          :checked="propertyIds.includes(property.id)"
          :value="property.id"
          style="margin: 3px"
      >
      <label :for="'form-user-property-' + property.id"><slot/></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PropertyList} from "~/services/property/types";

defineProps({
  property: {
    type: Object as PropType<PropertyList>,
    default: {}
  },
  propertyIds: {
    type: Array<Number>,
    default: []
  },
})
</script>
