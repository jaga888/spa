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
          @change="setDirty($event)"
      >
      <label :for="'form-user-property-' + property.id"><slot/></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PropertyList} from "~/services/property/types";
import {useUserStore} from "~/store/user";

const props = defineProps({
  property: {
    type: Object as PropType<PropertyList>,
    default: {}
  },
  propertyIds: {
    type: Array<Number>,
    default: []
  },
})

const {setIsDirty} = useUserStore();

const setDirty = ($event: any, element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  if ($event.currentTarget) {
    let propertyId = parseInt($event.target.value);

    if ($event.currentTarget.checked) {
      props.propertyIds.push(propertyId);
    } else {
      props.propertyIds.splice(props.propertyIds.indexOf(propertyId), 1);
    }
  }

  setIsDirty(true);
};
</script>
