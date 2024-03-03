<template>
  <li class="senex__list__item senex__list__item--no-properties"
      v-if="(!properties.length && !isNewProperty) || isNewCompany">
    <div class="senex__list__item-text">No properties.</div>
  </li>
  <li class="senex__list__item senex__files__target senex__list__item--active" v-if="isNewProperty">
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
  <Property v-for="property in properties" :property="property"/>
</template>

<script setup lang="ts">
import {propertyService} from "~/services/property/service";
import type {PropertyList} from "~/services/property/types";
import {useCompanyStore} from "~/store/company";
import {usePropertyStore} from "~/store/property";
import {useDebounceFn} from "@vueuse/core";
import Property from "./Property.vue"

const {activeCompany, isNewCompany} = storeToRefs(useCompanyStore())
const properties = ref<PropertyList[]>([])
const {filter, isNewProperty} = storeToRefs(usePropertyStore())
const {setIsNewProperty} = usePropertyStore()

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
      'filter[company_id]': activeCompany.value?.id,
      'filter[full_name]': filter.value,
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
