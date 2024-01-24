<template>
  <div id="companies-wrapper" class="senex__list senex__list--selectable" data-company-id="">
    <div
        v-if="isNewCompany"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
        data-company-id="808"
        data-company-name="AAA12"
    >
      <div class="senex__list__item-title">New Client...</div>
      <div class="senex__list__item-subtitle"></div>
    </div>
    <div
        v-for="company in companies"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
        data-company-id="808"
        data-company-name="AAA12"
        :class="{'senex__list__item--active': activeCompanyId === company.id && !isNewCompany}"
        @click="setActiveCompanyId(company.id)"
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
import type {Company} from "~/services/company/types";
import {useCompaniesStore} from "~/store/company";
import type {AxiosError} from 'axios';

const {filter} = storeToRefs(useCompaniesStore())
const {setActiveCompanyId} = useCompaniesStore()
const {activeCompanyId, isNewCompany} = storeToRefs(useCompaniesStore())

const companies = ref<Company[]>([])

watch(filter, async () => {
  if (filter.value) {
    try {
      companies.value = (await companyService.getCompanies({sort: 'name', 'filter[name]': filter.value}))

      console.log(companies.value)
    } catch (response) {
      console.log(response)
    }
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
