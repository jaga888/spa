<template>
  <div class="senex__body property-docs">
    <div class="senex__form">
      <div class="senex__form__fieldset">
        <div class="senex__form__header">Documents</div>
        <div class="senex__form__text">
          For each processing type, a list of packets that will be generated is
          listed below. Within each packet, sample documents can be viewed.
        </div>
      </div>
      <div id="property-docs"></div>
      <Doc v-for="processingTypeAvailability in property.processing_type_availabilities"
           :processingTypeAvailability="processingTypeAvailability"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {propertyService} from "~/services/property/service";
import {usePropertyStore} from "~/store/property";
import type {PropertyDoc} from "~/services/property/types";
import Doc from "~/components/management/clients/inspector/property/Tabs/Docs/Doc.vue";

const {activeProperty} = storeToRefs(usePropertyStore())
const property = ref<PropertyDoc>({
  processing_type_availabilities: [],
})

if (activeProperty.value) {
  try {
    property.value = (await propertyService.getPropertyDocs(activeProperty.value.id, {tab: 'docs'}))
  } catch (error) {
    console.log(error)
  }
}
</script>
