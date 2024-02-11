<template>
  <div class="senex__form__fieldset"
       :class="{'senex__form__fieldset--disabled': !processingTypeAvailability.available}"
  >
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
    <div class="senex__form__block"
         v-else-if="(processingTypeAvailability.fees & feesComplicated) === feesComplicated">
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
        {{ company.name }} is using the default {{ company.firm.name }} fees for
        {{ processingTypeAvailability.processing_type.plural_name }}
      </div>

      <div class="senex__form__block">
        <div class="senex__form__text"
             v-if="(processingTypeAvailability.fees & feesOverridden) === feesOverridden && !getFees.length"
        >
          <em>
            However, no custom fees have been added. This will result in no charges
            being applied for this processing type. If this is not intended, please
            <a class="senex__link--button senex__clients__add-fee">add a custom fee</a>, or
            <a class="senex__link--button senex__clients__remove-override-fees">stop using custom fees</a>.
          </em>
        </div>

        <div class="senex__form__item-group" v-if="getFees.length">
          <div class="senex__form__item senex__form__item--flex-2">
            <div class="senex__form__text senex__form__text--list">
              <BriefcaseIcon class="absolute -left-6"/>
              <strong>{{ getFee?.charge_type.name }}</strong>
              ({{ getFee?.scoped_type === scopeFirm ? '' + company.firm.name + '' : '' }})
              <br v-if="getFee?.description">
              {{ getFee?.description ?? '' }}
            </div>
          </div>

          <div class="senex__form__item senex__form__item--flex-1">
            <div class="senex__form__field"
                 :class="{'senex__form__field--readonly': getFee?.scoped_type === scopeFirm}">
              <div class="senex__form__field-add-on">$</div>
              <input type="text"
                     class="senex__form__input senex__form__input--currency"
                     :class="{'senex__input--editable-fee': getFee?.scoped_type === scopeFirm}"
                     :placeholder="getFee?.charge_type.name"
                     :value="getFee?.base_amount"
                     :disabled="getFee?.scoped_type === scopeFirm"
              />
              <div class="senex__form__field-add-on senex__form__field-add-on--button">
                <a href="#"
                   class="senex__clients__remove-fee"
                   v-if="getFee?.scoped_type === scopeCompany"
                >
                  <i class="fa fa-times"></i>
                </a>
                <i class="fa fa-times"></i>
              </div>
            </div>
            <label class="senex__form__label">
              {{ getFee?.charge_type.name }}
            </label>
          </div>
        </div>
      </div>
      <div class="senex__form__block">
        <div class="senex__form__text" v-if="(processingTypeAvailability.fees & feesOverridden) === feesOverridden">
          <a href="#" class="senex__clients__add-fee">Add custom fee</a>
          <a href="#" class="senex__clients__remove-override-fees" style="float: right;">Stop using custom fees</a>
        </div>
        <div class="senex__form__text" v-else>
          <a class="senex__clients__override-fees">
            Setup custom fees</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import type {CompanyFee} from "~/services/company/types";
import type {FeeList} from "~/services/fee/types";
import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";
import BriefcaseIcon from "~/components/icons/BriefcaseIcon.vue";
import type {PropType} from "vue";

const props = defineProps({
  processingTypeAvailability: {
    type: Object as PropType<ProcessingTypeAvailabilityList>,
    default: <ProcessingTypeAvailabilityList>{}
  },
  company: {
    type: Object as PropType<CompanyFee>,
    default: <CompanyFee>{}
  },
})
const {activeCompany, activeTab} = storeToRefs(useCompanyStore())
const activeTabFees: string = 'fees'
const feesOverridden: number = 1;
const feesComplicated: number = 2;
const scopeFirm: string = 'firm';
const scopeCompany: string = 'company';
const getFees = computed((): FeeList[] => {
  return (props.processingTypeAvailability.fees & feesOverridden) !== feesOverridden
      ? props.company.firm.fees.filter(
          (fee) => fee.processing_type_id === props.processingTypeAvailability.processing_type_id
      )
      : props.company.fees.filter(
          (fee) => fee.processing_type_id === props.processingTypeAvailability.processing_type_id
      );
})
const getFee = computed((): FeeList | null => {
  return getFees.value[0] ?? null
})
</script>
