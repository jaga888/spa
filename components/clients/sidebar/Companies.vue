<template>
  <div id="companies-wrapper" class="senex__list senex__list--selectable">
    <div
        v-if="isNewCompany"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
    >
      <div class="senex__list__item-title">New Client...</div>
      <div class="senex__list__item-subtitle"></div>
    </div>
    <div
        v-for="company in companies"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
        :class="{'senex__list__item--active': activeCompany?.id === company.id && !isNewCompany}"
        @click="setActiveCompany(company)"
    >
      <div class="senex__list__item-title">{{ company.name }}</div>
      <div class="senex__list__item-subtitle">{{ company.legal_name }}</div>
      <div v-if="!company.active" class="senex__list__item-text">
        <div class="senex__tag senex__tag--error">Not Active</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import type {CompanyList} from "~/services/company/types";
import {useCompanyStore} from "~/store/company";
import { useDebounceFn } from '@vueuse/core'

const {filter} = storeToRefs(useCompanyStore())
const {setActiveCompany} = useCompanyStore()
const {activeCompany, isNewCompany} = storeToRefs(useCompanyStore())

const companies = ref<CompanyList[]>([])

const debouncedFn = useDebounceFn(async () => {
  companies.value = (await companyService.getCompanies({sort: 'name', 'filter[name]': filter.value}))

  console.log(companies.value)
}, 200)

watch(filter,  () => {
  try {
    debouncedFn();
  } catch (response) {
    console.log(response)
  }
})

const fetchCompanies = async () => {
  try {
    companies.value = (await companyService.getCompanies({sort: 'name'}))

    console.log(companies.value)
  } catch (error) {
    // const response = error as AxiosError;

    console.log(error)
  }
};

fetchCompanies()
</script>
