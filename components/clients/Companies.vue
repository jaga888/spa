<template>
  <div id="companies-wrapper" class="senex__list senex__list--selectable" data-company-id="">
    <div
        v-for="company in companies"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
        data-company-id="808"
        data-company-name="AAA12"
        :class="{'senex__list__item--active': activeCompanyId === company.id}"
        @click="activateCompany(company.id)"
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

const api = useNuxtApp().$api;

const companies = ref<Company[]>([]);

const activeCompanyId = ref(0);

const emit = defineEmits(['chosenCompany']);

const fetchCompanies = async () => {
  try {
    const data = await companyService.getCompanies();

    companies.value = data;

    console.log(data);

  } catch (error) {
    console.log(error);
  }
};

const activateCompany = async (id:number) => {
  activeCompanyId.value = id;

  emit('chosenCompany', id)
};

fetchCompanies();

</script>
