<template>
  <li class="senex__list__item senex__list__item--no-properties" v-if="!properties.length || isNewCompany">
    <div class="senex__list__item-text">No properties.</div>
  </li>
  <li class="senex__list__item senex__files__target" v-if="isNewProperty">
    <div class="senex__list__item-title">New Property...</div>
    <div class="senex__list__item-subtitle"></div>
    <div class="senex__list__item-text">
      <div class="senex__tag senex__tag--error">No Jurisdiction</div>
      <div class="senex__tag senex__tag--error">Not Active</div>
      <div class="senex__tag senex__tag--warn">No Units</div>
      <div class="senex__tag senex__tag--warn">No Document Email</div>
      <div class="senex__tag senex__tag--info">No PM</div>
    </div>
  </li>
  <li class="senex__list__item senex__files__target" v-for="property in properties" v-if="!isNewCompany"
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
import {propertyService} from "~/services/property/service";
import type {PropertyList} from "~/services/property/types";
import {useCompanyStore} from "~/store/company";
import {usePropertyStore} from "~/store/property";
import {useDebounceFn} from "@vueuse/core";

const {activeCompany, isNewCompany} = storeToRefs(useCompanyStore())
const api = useNuxtApp().$api
const properties = ref<PropertyList[]>([])
const {filter, activeProperty, isNewProperty} = storeToRefs(usePropertyStore())
const {setActiveProperty, setIsNewProperty} = usePropertyStore()

watch(activeCompany, async () => {
  setIsNewProperty(false);

  if (activeCompany.value?.id) {
    try {
      properties.value = (await propertyService.getProperties({
        sort: 'name',
        'filter[company_id]': activeCompany.value?.id
      }))

      console.log(properties.value)
    } catch (error) {
      console.log(error)
    }
  }
})

if (activeCompany.value?.id) {
  setIsNewProperty(false);

  try {
    properties.value = (await propertyService.getProperties({
      sort: 'name',
      'filter[company_id]': activeCompany.value?.id
    }))

    console.log(properties.value)
  } catch (error) {
    console.log(error)
  }
}

const debouncedFn = useDebounceFn(async () => {
  properties.value = (await propertyService.getProperties({
    sort: 'name',
    'filter[company_id]': activeCompany.value?.id,
    'filter[full_name]': filter.value,
  }))

  console.log(properties.value)
}, 200)

watch(filter, () => {
  if (!isNewCompany.value) {
    try {
      debouncedFn();
    } catch (response) {
      console.log(response)
    }
  }
})

</script>
