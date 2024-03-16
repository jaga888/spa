<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Policies</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__policies" id="property_policies_wrapper">
            <div :class="{'policies_container_1': policies.length > 5, 'policies_container': policies.length < 6}">
              <Policy
                  v-for="policy in policies.length > 5 ? policies.slice(0, Math.round(policies.length / 2)) : policies"
                  :policy="policy"
                  :policyIds="policyIds"
                  :excludedPolicyIds="excludedPolicyIds"
                  :policies="propertyPolicies"
                  :companyPolicies="companyPolicies"
              />
            </div>
            <div class="policies_container_2" v-if="policies.length > 5">
              <Policy
                  v-for="policy in policies.length > 5 ? policies.slice(Math.round(policies.length / 2)) : policies"
                  :policy="policy"
                  :policyIds="policyIds"
                  :policies="propertyPolicies"
                  :companyPolicies="companyPolicies"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__text">
            Rent is considered late, and new claims may be created after this day:
          </div>
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.late_after_dom.$dirty}">
            <input id="form_property_late_after_dom"
                   type="number"
                   name="late_after_dom"
                   class="senex__form__input"
                   placeholder="Late after day of month..."
                   required
                   min="1"
                   max="15"
                   @input="$emit('update:lateAfterDom', ($event.target as HTMLInputElement).value)"
                   :value="lateAfterDom"
                   @keyup="setDirty(validation.late_after_dom)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.late_after_dom.required.$invalid">
            {{ validation.late_after_dom.required.$message }}
          </span><br v-if="validation.legal_name.required.$invalid">
          <span class="error" style="color: red" v-if="validation.late_after_dom.minValue.$invalid">
            {{ validation.late_after_dom.minValue.$message }}
          </span><br v-if="validation.late_after_dom.minValue.$invalid">
          <span class="error" style="color: red" v-if="validation.late_after_dom.maxValue.$invalid">
            {{ validation.late_after_dom.maxValue.$message }}
          </span><br v-if="validation.late_after_dom.maxValue.$invalid">
          <label class="senex__form__label" for="form_property_late_after_dom">
            Late after day of month
          </label>
        </div>
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__text">
            New claims may be created if balance outstanding is greater than or equal to this
            amount:
          </div>
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.notice_rent_trigger.$dirty}">
            <input id="form_property_notice_rent_trigger"
                   type="number"
                   name="notice_rent_trigger"
                   class="senex__form__input"
                   placeholder="Notice creation threshold..."
                   required
                   min="0"
                   @input="$emit('update:noticeRentTrigger', ($event.target as HTMLInputElement).value)"
                   :value="noticeRentTrigger"
                   @keyup="setDirty(validation.notice_rent_trigger)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.notice_rent_trigger.required.$invalid">
            {{ validation.notice_rent_trigger.required.$message }}
          </span><br v-if="validation.notice_rent_trigger.required.$invalid">
          <span class="error" style="color: red" v-if="validation.notice_rent_trigger.minValue.$invalid">
            {{ validation.notice_rent_trigger.minValue.$message }}
          </span><br v-if="validation.notice_rent_trigger.minValue.$invalid">
          <label class="senex__form__label" for="form_property_notice_rent_trigger">
            Notice creation threshold
          </label>
        </div>
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__text">
            <input id="form_property_use_company_filing_threshold"
                   type="checkbox"
                   name="use_company_filing_threshold"
                   class="senex__form__checkbox senex__clients__use_company_filing_threshold"
                   :checked="useCompanyFilingThreshold"
                   @change="$emit('update:useCompanyFilingThreshold', ($event.target as HTMLInputElement).checked)"
                   @click="setDirty(validation.use_company_filing_threshold)"
            />
            <label for="form_property_use_company_filing_threshold"
                   title="Use Company Filing Threshold">
              Use Company Filing Threshold
            </label>
          </div>
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.ud_filing_threshold.$dirty}">
            <input id="form_property_ud_filing_threshold"
                   type="number"
                   name="ud_filing_threshold"
                   class="senex__form__input"
                   placeholder="UD Filing Threshold..."
                   required
                   min="0"
                   @input="$emit('update:udFilingThreshold', ($event.target as HTMLInputElement).value)"
                   :value="useCompanyFilingThreshold ? companyUdFilingThreshold : udFilingThreshold"
                   @keyup="setDirty(validation.ud_filing_threshold)"
                   :readonly="useCompanyFilingThreshold"
            />
          </div>
          <label class="senex__form__label" for="form_property_ud_filing_threshold">
            UD Filing Threshold
          </label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {policyService} from "~/services/policy/service";
import type {PolicyList} from "~/services/policy/types";
import Policy from "~/components/clients/inspector/property/fieldset/Policy.vue";
import type {Validation} from "@vuelidate/core";
import type {Property} from "~/services/property/types";
import {usePropertyStore} from "~/store/property";

defineProps({
  companyPolicies: {
    type: Array<PolicyList>,
    default: []
  },
  propertyPolicies: {
    type: Array<PolicyList>,
    default: []
  },
  policyIds: {
    type: Array<Number>,
    default: []
  },
  excludedPolicyIds: {
    type: Array<Number>,
    default: []
  },
  lateAfterDom: {
    type: Number,
    default: 5
  },
  noticeRentTrigger: {
    type: Number,
    default: 100
  },
  useCompanyFilingThreshold: {
    type: Boolean,
    default: false
  },
  udFilingThreshold: {
    type: Number,
    default: 500
  },
  companyUdFilingThreshold: {
    type: Number,
    default: 500
  },
  validation: {
    type: Object as PropType<Validation<Property>>,
    default: <Validation<Property>>{}
  },
});

const policies = ref<PolicyList[]>([]);

const {setIsDirty} = usePropertyStore();

const setDirty = ($event: any, element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }
  setIsDirty(true)
}

try {
  policies.value = (await policyService.getPolicies({
    "filter[is_published]": 1,
    sort: "sort"
  }));

  console.log(policies.value);
} catch (error) {
  console.log(error);
}

// const st = defineEmits(['update:useCompanyFilingThreshold'])
//
// function buttonClick($event: any) {
//   st('update:useCompanyFilingThreshold', ($event.target as HTMLInputElement).checked))
// }
</script>
