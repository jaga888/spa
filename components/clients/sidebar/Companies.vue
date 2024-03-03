<template>
  <div id="companies-wrapper" class="senex__list senex__list--selectable">
    <div
        v-if="isNewCompany"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper senex__list__item--active"
    >
      <div class="senex__list__item-title">New Client...</div>
      <div class="senex__list__item-subtitle"></div>
    </div>
    <p v-if="!companies.length">
      No companies
    </p>
    <Company v-for="company in companies" :company="company" />
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import type {CompanyList} from "~/services/company/types";
import {useCompanyStore} from "~/store/company";
import {useDebounceFn} from "@vueuse/core";
import Company from "~/components/clients/sidebar/Company.vue";

const {filter} = storeToRefs(useCompanyStore());
const {isNewCompany} = storeToRefs(useCompanyStore());

const companies = ref<CompanyList[]>([]);

const debouncedFn = useDebounceFn(async () => {
  companies.value = (await companyService.getCompanies({
    sort: "name",
    "filter[name]": filter.value
  }));

  console.log(companies.value);
}, 200);

watch(filter, () => {
  try {
    debouncedFn();
  } catch (response) {
    console.log(response);
  }
});

const fetchCompanies = async () => {
  try {
    companies.value = (await companyService.getCompanies({sort: "name"}));

    console.log(companies.value);
  } catch (error) {
    // const response = error as AxiosError;

    console.log(error);
  }
};

fetchCompanies();
</script>
