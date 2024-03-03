<template>
  <li class="senex__list__item senex__files__target"
      v-if="!isNewCompany"
      @click="setActiveProperty(property)"
      :class="{'senex__list__item--active': activeProperty?.id === property.id && !isNewProperty}">
    <div class="senex__list__item-title">{{ property.short_name }}</div>
    <div class="senex__list__item-subtitle">{{ property.legal_name }}</div>
    <div class="senex__list__item-text">
      <div class="senex__tag senex__tag--error" v-if="!property.court_id">No Jurisdiction</div>
      <div class="senex__tag senex__tag--error" v-if="!property.active">Not Active</div>
      <div class="senex__tag senex__tag--warn" v-if="(property.data_availability & 1) !== 1">No Units</div>
      <div class="senex__tag senex__tag--warn" v-if="!property.document_email">No Document Email</div>
      <div class="senex__tag senex__tag--info" v-if="!property.manager_name">No PM</div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {PropertyList} from "~/services/property/types";
import {useCompanyStore} from "~/store/company";
import {usePropertyStore} from "~/store/property";

const {isNewCompany} = storeToRefs(useCompanyStore())
const {setActiveProperty} = usePropertyStore()
const {activeProperty, isNewProperty} = storeToRefs(usePropertyStore())

defineProps({
  property: {
    type: Object as PropType<PropertyList>,
    default: <PropertyList>{}
  },
});
</script>
