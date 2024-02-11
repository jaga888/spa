<template>
  <div class="senex__body company-fees" v-if="activeTab === activeTabFees">
    <form class="senex__form">
      <div class="senex__form__fieldset">
        <div class="senex__form__header">{{ company.name }} Fees</div>
        <div class="senex__form__text">
          These fees will apply as defaults to all <span>{{ company.name }}</span> properties. Individual properties
          may override these values with alternative fees. Court costs are not shown,
          they will vary per Property jurisdiction.
        </div>
      </div>
      <div id="company-processing-types">
        <FeeItem v-for="processingTypeAvailability in company.processing_type_availabilities"
          :processingTypeAvailability="processingTypeAvailability"
          :company="company"/>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import {useCompanyStore} from "~/store/company";
import type {CompanyFee} from "~/services/company/types";
import type {FeeList} from "~/services/fee/types";
import type {Firm} from "~/services/firm/types";
import FeeItem from "~/components/clients/inspector/company/FeeItem.vue";

const {activeCompany, activeTab} = storeToRefs(useCompanyStore())
const company = ref<CompanyFee>({
  id: 0,
  name: '',
  legal_name: '',
  active: false,
  processing_type_availabilities: [],
  firm: <Firm>{},
  fees: <FeeList[]>[]
})
const activeTabFees: string = 'fees'

watch(activeTab, async () => {
  console.log(activeTab.value)
  if (activeTab.value === activeTabFees && !!activeCompany.value) {
    try {
      company.value = (await companyService.getCompanyFees(activeCompany.value.id, {tab: 'fees'}))

      console.log(company.value)
    } catch (error) {
      console.log(error)
    }
  }
})
</script>
