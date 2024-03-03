<template>
  <div class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
       @click="setActiveCompany(company)"
       :class="{'senex__list__item&#45;&#45;active': activeCompany?.id === company.id && !isNewCompany}">
    <div class="senex__list__item-title">{{ company.name }}</div>
    <div class="senex__list__item-subtitle">{{ company.legal_name }}</div>
    <div v-if="!company.active" class="senex__list__item-text">
      <div class="senex__tag senex__tag--error">Not Active</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {CompanyList} from "~/services/company/types";
import {useCompanyStore} from "~/store/company";

const {setActiveCompany} = useCompanyStore();
const {
  activeCompany,
  isNewCompany
} = storeToRefs(useCompanyStore());

defineProps({
  company: {
    type: Object as PropType<CompanyList>,
    default: <CompanyList>{}
  },
});
</script>
