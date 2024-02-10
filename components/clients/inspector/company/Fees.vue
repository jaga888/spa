<template>
  <div class="senex__body company-fees" v-if="activeTab === 'fees'">
    <form class="senex__form">
      <div class="senex__form__fieldset">
        <div class="senex__form__header">{{ company.name }} Fees</div>
        <div class="senex__form__text">
          These fees will apply as defaults to all <span></span> properties. Individual properties
          may override these values with alternative fees. Court costs are not shown,
          they will vary per Property jurisdiction.
        </div>
      </div>
      <div id="company-processing-types">
        <div class="senex__form__fieldset"
             :class="{'senex__form__fieldset--disabled': !processingTypeAvailability.available}"
             v-for="processingTypeAvailability in company.processing_type_availabilities">
          <legend class="senex__form__legend">
            {{ processingTypeAvailability.processing_type.plural_name }}
            <a class="senex__clients__make-unavailable"
               style="float: right;"
               v-if="processingTypeAvailability.available">
              Disable
            </a>
          </legend>
          <div class="senex__form__block" v-if="!processingTypeAvailability.available">
            <div class="senex__form__header"><i class="fa fa-minus-circle"></i> Not Available</div>

            <div class="senex__form__text">
              {{ processingTypeAvailability.processing_type.plural_name }} have been disabled for {{ company.name }}.
            </div>

            <div class="senex__form__text">
              <a class="senex__clients__make-available">
                Make {{ processingTypeAvailability.processing_type.plural_name }} Available</a>.
            </div>
          </div>
          <div class="senex__form__block" v-else-if="(processingTypeAvailability.fees & 2) === 2">
            <div class="senex__form__header">
              <i class="fa fa-exclamation-circle"></i> It's Complicated...
            </div>

            <div class="senex__form__text">
              {{ processingTypeAvailability.processing_type.plural_name }} require complicated fee calculations that
              don't lend well to a simple form field.
            </div>

            <div class="senex__form__text">
              {{ processingTypeAvailability.note }}
            </div>
          </div>
          <div v-else>
            <div class="senex__form__text" v-if="(processingTypeAvailability.fees & 1) === 1">
              {{ company.name }} is using custom fees for {{ processingTypeAvailability.processing_type.plural_name }}
            </div>
            <div class="senex__form__text" v-else>
              {{ company.name }} is using the default {{ processingTypeAvailability.processing_type.plural_name }}
            </div>
            <div class="senex__form__block" v-if="feeIsset(processingTypeAvailability.processing_type_id).length > 0">
              123
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type {FeeList} from "~/services/fee/types";

const {activeCompany, saveCompany, isDirty, activeTab} = storeToRefs(useCompanyStore())
const {setSaveCompany, setIsDirty} = useCompanyStore();
const company = ref<Company>({
  id: undefined,
  name: '',
  legal_name: '',
  active: false,
  processing_type_availabilities: [],
  address: '',
  city: '',
  contact_email: '',
  contact_name: '',
  contact_phone: '',
  invoice_address: '',
  invoice_address2: '',
  invoice_city: '',
  invoice_email: '',
  invoice_state: '',
  invoice_zip: '',
  pm_software_id: 0,
  policy_ids: [],
  short_name: '',
  state: '',
  ud_filing_threshold: 0,
  url: '',
  zip: '',
  files: [],
  firm: null
})

const rules = {
  legal_name: {
    required: helpers.withMessage('The legal name field is required', required)
  },
  name: {
    required: helpers.withMessage('The name field is required', required)
  },
  short_name: {
    required: helpers.withMessage('The short name field is required', required)
  },
  address: {
    dirty: false
  },
  city: {
    required: helpers.withMessage('The city field is required', required),
    dirty: false
  },
  state: {
    required: helpers.withMessage('Required', required),
    dirty: false
  },
  zip: {
    required: helpers.withMessage('The field is required', required),
    dirty: false
  },
  invoice_address: {
    dirty: false
  },
  invoice_address2: {
    dirty: false
  },
  invoice_city: {
    dirty: false
  },
  invoice_email: {
    dirty: false
  },
  invoice_state: {
    dirty: false
  },
  invoice_zip: {
    dirty: false
  },
  contact_email: {
    dirty: false
  },
  contact_name: {
    dirty: false
  },
  contact_phone: {
    dirty: false
  },
  pm_software_id: {
    dirty: false
  },
  url: {
    dirty: false
  },
  ud_filing_threshold: {
    dirty: false
  },
};

const validation = useVuelidate(
    rules,
    company
)

const feeIsset = (processingTypeId: number): FeeList[] => {
  return company.value.firm
      ? company.value.firm.fees.filter(
          (fee: any) => fee.processing_type_id === processingTypeId
      )
      : []
}

watch(activeCompany, async () => {
  if (activeCompany.value?.id) {
    try {
      if (!isDirty.value) {
        company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'info'}))

        validation.value.$reset()

        console.log(company.value)
      } else {
        setIsDirty(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
})

if (activeCompany.value?.id) {
  try {
    if (!isDirty.value) {
      company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'fees'}))

      console.log(company.value)
    } else {
      setIsDirty(false)
    }
  } catch (error) {
    console.log(error)
  }
}

watch(saveCompany, async () => {
  if (saveCompany.value) {
    console.log(company.value.policy_ids)
    setSaveCompany(false)
  }
})

watch(isDirty, async () => {
  console.log(isDirty.value);
  if (!isDirty.value && activeCompany.value) {
    company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'fees'}))

    console.log(company.value)

    validation.value.$reset()
  }
})
</script>
