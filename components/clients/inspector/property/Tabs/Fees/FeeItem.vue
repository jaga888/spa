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
        {{ processingTypeAvailability.processing_type.plural_name }} have been disabled for {{ property.name }}.
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
        {{ property.name }} is using custom fees for {{ processingTypeAvailability.processing_type.plural_name }}
      </div>

      <div class="senex__form__text" v-else>
        {{ property.name }} is using the default {{ property.company.name }} fees for
        {{ processingTypeAvailability.processing_type.plural_name }}
      </div>

      <div class="senex__form__block  wrapper-form" v-if="showForm">
        <form class="senex__clients__add-fee-form">
          <div class="senex__form__header">Add New Fee</div>
          <div class="senex__form__text"></div>
          <div class="senex__form__item-group">
            <div class="senex__form__item senex__form__item--flex-2">
              <select class="senex__form__select"
                      name="charge_type_id"
                      v-model="fee.charge_type_id"
                      placeholder="Charge Type..."
                      :id="`form_fee_charge_type_id_${processingTypeAvailability.id}`"
              >
                <ChargeTypeComponent v-for="chargeType in chargeTypes" :chargeType="chargeType" />
              </select>
              <label class="senex__form__label"  :for="`form_fee_charge_type_id_${processingTypeAvailability.id}`">
                Charge Type
              </label>
            </div>
            <div class="senex__form__item">
              <div class="senex__form__field">
                <div class="senex__form__field-add-on">$</div>
                <input class="senex__form__input senex__form__input--currency"
                       type="text"
                       name="base_amount"
                       placeholder="Fee amount..."
                       v-model="fee.base_amount"
                       :id="`form_fee_base_amount_${processingTypeAvailability.id}`"
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" :for="`form_fee_base_amount_${processingTypeAvailability.id}`">
                Fee
              </label>
            </div>
          </div>
          <div class="senex__form__text">An optional description may be added for clarity.</div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input class="senex__form__input"
                       type="text"
                       name="description"
                       placeholder="Description..."
                       v-model="fee.description"
                       :id="`form_fee_description_${processingTypeAvailability.id}`"
                />
              </div>
              <label class="senex__form__label" :for="`form_fee_description_${processingTypeAvailability.id}`">
                Description
              </label>
            </div>
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item" style="text-align: right">
              <Button type="submit"
                      class="senex__clients__cancel-fee senex__button--cancel"
                      @click.prevent="showForm = !showForm"
              >
                Cancel
              </Button>
              <Button type="submit"
                      class="senex__clients__save-fee senex__button senex__button--save"
                      @click.prevent="saveFee"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div class="senex__form__block" v-if="!showForm">
        <div class="senex__form__text"
             v-if="(processingTypeAvailability.fees & feesOverridden) === feesOverridden && !getFees.length"
        >
          <em>
            However, no custom fees have been added. This will result in no charges
            being applied for this processing type. If this is not intended, please
            <a href="#" class="senex__link--button senex__clients__add-fee" @click.prevent="showForm = !showForm">
              add a custom fee
            </a>, or
            <a href="#"
               class="senex__link--button senex__clients__remove-override-fees"
               @click.prevent="setCustomFee(0)">
              stop using custom fees
            </a>.
          </em>
        </div>

        <div class="senex__form__item-group" v-if="getFees.length">
          <div class="senex__form__item senex__form__item--flex-2">
            <div class="senex__form__text senex__form__text--list">
              <BriefcaseIcon class="absolute -left-6"/>
              <strong>{{ getFee?.charge_type.name }}</strong>
              {{ getFee?.scoped_type === scopeFirm ? "(" + property.firm.name + ")" : "" }}
              <br v-if="getFee?.description">
              {{ getFee?.description ? getFee?.description : "" }}
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
                <a href="#" class="senex__clients__remove-fee"
                   v-if="getFee?.scoped_type === scopeProperty"
                   @click.prevent="deleteFee"
                >
                  <CancelIcon stroke="#2c3e50" width="12" height="12"/>
                </a>
              </div>
            </div>
            <label class="senex__form__label">{{ getFee?.charge_type.name }}</label>
          </div>
        </div>
      </div>
      <div class="senex__form__block" v-if="!showForm">
        <div class="senex__form__text" v-if="(processingTypeAvailability.fees & feesOverridden) === feesOverridden">
          <a href="#" class="senex__clients__add-fee" @click.prevent="showForm = !showForm">Add custom fee</a>
          <a href="#"
             class="senex__clients__remove-override-fees"
             style="float: right;"
             @click.prevent="setCustomFee(0)"
          >
            Stop using custom fees
          </a>
        </div>
        <div class="senex__form__text" v-else>
          <a class="senex__clients__override-fees" @click.prevent="setCustomFee(1)">Setup custom fees</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropertyFee} from "~/services/property/types";
import type {Fee, FeeList} from "~/services/fee/types";
import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";
import BriefcaseIcon from "~/components/icons/BriefcaseIcon.vue";
import type {PropType} from "vue";
import type {ChargeType} from "~/services/charge_type/types";
import {processingTypeAvailabilityService} from "~/services/processing_type_availability/service";
import {feeService} from "~/services/fee/service";
import CancelIcon from "~/components/icons/CancelIcon.vue";
import ChargeTypeComponent from "~/components/clients/ChargeTypeComponent.vue";

const props = defineProps({
  processingTypeAvailability: {
    type: Object as PropType<ProcessingTypeAvailabilityList>,
    default: <ProcessingTypeAvailabilityList>{}
  },
  property: {
    type: Object as PropType<PropertyFee>,
    default: <PropertyFee>{}
  },
  chargeTypes: {
    type: Array as PropType<ChargeType[]>
  }
});
const feesOverridden: number = 1;
const feesComplicated: number = 2;
const scopeFirm: string = "firm";
const scopeProperty: string = "property";
const getFees = computed((): FeeList[] => {
  return (props.processingTypeAvailability.fees & feesOverridden) !== feesOverridden
      ? props.property.firm.fees.filter(
          (fee) => fee.processing_type_id === props.processingTypeAvailability.processing_type_id
      )
      : props.property.fees.filter(
          (fee) => fee.processing_type_id === props.processingTypeAvailability.processing_type_id
      );
});
const getFee = computed((): FeeList | null => {
  return getFees.value[0] ? getFees.value[0] : null;
});
const showForm = ref(false);
const emit = defineEmits(["feeWasUpdated"]);
const setCustomFee = async (fees: number) => {
  await processingTypeAvailabilityService.updateProcessingTypeAvailability(props.processingTypeAvailability.id, {fees: fees});

  showForm.value = false;
  emit("feeWasUpdated");
};
const fee = ref<Fee>({
  base_amount: 0,
  charge_type_id: 1,
  description: "",
  processing_type_availability_id: props.processingTypeAvailability.id
});
const saveFee = async () => {
  await feeService.createFee(fee.value);

  showForm.value = false;
  emit("feeWasUpdated");
};
const deleteFee = async () => {
  if (getFee.value) {
    await feeService.deleteFee(getFee.value.id);
  }
  showForm.value = false;
  emit("feeWasUpdated");
};
</script>
