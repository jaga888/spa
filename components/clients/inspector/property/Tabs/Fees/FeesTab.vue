<template>
  <div class="senex__body property-fees">
    <form class="senex__form">
      <div class="senex__form__fieldset">
        <div class="senex__form__header">Fees & Costs</div>
        <div class="senex__form__text">
          For processing types without {{ property.name }}-specific fees,
          defaults are shown for reference. Appropriate court costs are also shown
          for convenience.
        </div>
      </div>
      <div id="company-processing-types">
        <FeeItem v-for="processingTypeAvailability in property.processing_type_availabilities"
                 :processingTypeAvailability="processingTypeAvailability"
                 :property="property"
                 :chargeTypes="chargeTypes"
                 @fee-was-updated="refreshProperty"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {propertyService} from "~/services/property/service";
import {usePropertyStore} from "~/store/property";
import type {PropertyFee} from "~/services/property/types";
import type {FeeList} from "~/services/fee/types";
import type {Firm} from "~/services/firm/types";
import FeeItem from "~/components/clients/inspector/property/Tabs/Fees/FeeItem.vue";
import type {ChargeType} from "~/services/charge_type/types";
import {chargeTypeService} from "~/services/charge_type/service";
import type {CompanyList} from "~/services/company/types";

const {activeProperty} = storeToRefs(usePropertyStore())
const property = ref<PropertyFee>({
  id: 0,
  court_id: 0,
  data_availability: 0,
  document_email: "",
  name: "",
  legal_name: "",
  manager_name: "",
  active: false,
  processing_type_availabilities: [],
  firm: <Firm>{},
  fees: <FeeList[]>[],
  short_name: "",
  sort_name: "",
  company: <CompanyList>{}
})
const chargeTypes = ref<ChargeType[]>([])

if (activeProperty.value) {
  try {
    property.value = (await propertyService.getPropertyFees(activeProperty.value.id, {tab: 'fees'}))

    console.log(property.value)

    chargeTypes.value = (await chargeTypeService.getChargeTypes({
      'filter[fee]': 1,
      sort: 'name'
    }))

    console.log(chargeTypes.value)
  } catch (error) {
    console.log(error)
  }
}

const refreshProperty = async () => {
  if (activeProperty.value) {
    try {
      property.value = (await propertyService.getPropertyFees(activeProperty.value.id, {tab: 'fees'}))

      console.log(property.value)

      chargeTypes.value = (await chargeTypeService.getChargeTypes({
        'filter[fee]': 1,
        sort: 'name'
      }))

      console.log(chargeTypes.value)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
