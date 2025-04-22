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
                  v-model:policyIds="policyIds"
                  :excludedPolicyIds="excludedPolicyIds"
                  :companyPolicies="companyPolicies"
              />
            </div>
            <div class="policies_container_2" v-if="policies.length > 5">
              <Policy
                  v-for="policy in policies.length > 5 ? policies.slice(Math.round(policies.length / 2)) : policies"
                  :policy="policy"
                  v-model:policyIds="policyIds"
                  :excludedPolicyIds="excludedPolicyIds"
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.lateAfterDom}">
            <input id="form_property_late_after_dom"
                   type="number"
                   name="late_after_dom"
                   class="senex__form__input"
                   placeholder="Late after day of month..."
                   required
                   min="1"
                   max="15"
                   v-model="lateAfterDom"
                   @keyup="setDirty('lateAfterDom')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.late_after_dom.required.$invalid">
            {{ validation.late_after_dom.required.$message }}
          </span><br v-if="validation.late_after_dom.required.$invalid">
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
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.noticeRentTrigger}">
            <input id="form_property_notice_rent_trigger"
                   type="number"
                   name="property_notice_rent_trigger"
                   class="senex__form__input"
                   placeholder="Notice creation threshold..."
                   required
                   min="0"
                   v-model="noticeRentTrigger"
                   @keyup="setDirty('noticeRentTrigger')"
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
                   name="property_use_company_filing_threshold"
                   class="senex__form__checkbox senex__clients__use_company_filing_threshold"
                   v-model="useCompanyFilingThreshold"
                   @click="setDirty('useCompanyFilingThreshold')"
            />
            <label for="form_property_use_company_filing_threshold"
                   title="Use Company Filing Threshold">
              Use Company Filing Threshold
            </label>
          </div>
          <div class="senex__form__field"
               :class="{
                  'senex__form__field--dirty': dirtyPropertyColumns.useCompanyFilingThreshold || dirtyPropertyColumns.udFilingThreshold
              }"
          >
            <input id="form_property_ud_filing_threshold_company"
                   type="number"
                   name="property_ud_filing_threshold_company"
                   class="senex__form__input"
                   placeholder="UD Filing Threshold..."
                   required
                   min="0"
                   :value="companyUdFilingThreshold"
                   readonly
                   v-if="useCompanyFilingThreshold"
            />
            <input id="form_property_ud_filing_threshold"
                   type="number"
                   name="property_ud_filing_threshold"
                   class="senex__form__input"
                   placeholder="UD Filing Threshold..."
                   required
                   min="0"
                   v-model="udFilingThreshold"
                   @keyup="setDirty('udFilingThreshold')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_ud_filing_threshold_company" v-if="useCompanyFilingThreshold">
            UD Filing Threshold
          </label>
          <label class="senex__form__label" for="form_property_ud_filing_threshold" v-else>
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
import Policy from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/Policy.vue";
import type {Validation, ValidationArgs} from "@vuelidate/core";
import type {Property} from "~/services/property/types";
import {usePropertyStore} from "~/store/property";

const policyIds = defineModel<Array<Number>>("policyIds", {
  default: []
});
const lateAfterDom = defineModel<number>("lateAfterDom", {
  default: 5
});
const noticeRentTrigger = defineModel<number>("noticeRentTrigger", {
  default: 100
});
const useCompanyFilingThreshold = defineModel<boolean>("useCompanyFilingThreshold", {
  default: false
});
const udFilingThreshold = defineModel<number>("udFilingThreshold", {
  default: 500
});

const props = defineProps({
  companyPolicies: {
    type: Array<PolicyList>,
    default: []
  },
  excludedPolicyIds: {
    type: Array<Number>,
    default: []
  },
  companyUdFilingThreshold: {
    type: Number,
    default: 500
  },
  dirtyPropertyColumns: {
    type: Object,
    default: {
      legalName: false,
      name: false,
      shortName: false,
      address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      defaultUnitCity: false,
      defaultUnitState: false,
      defaultUnitZip: false,
      phone: false,
      fax: false,
      email: false,
      invoiceAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoiceAddress2: false,
      invoiceEmail: false,
      paymentAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      notificationEmail: false,
      documentEmail: false,
      managerName: false,
      managerCell: false,
      managerEmail: false,
      lateAfterDom: false,
      noticeRentTrigger: false,
      useCompanyFilingThreshold: false,
      udFilingThreshold: false,
      pmSoftwareId: false,
    }
  },
  validation: {
    type: Object as PropType<Validation<ValidationArgs, Property>>,
    default: <Validation<ValidationArgs, Property>>{}
  },
});

const policies = ref<PolicyList[]>([]);

const {isDirty} = storeToRefs(usePropertyStore());

const {setIsDirty} = usePropertyStore();

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyPropertyColumns[address][column] = true : props.dirtyPropertyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};

try {
  policies.value = (await policyService.getPolicies({
    "filter[is_published]": 1,
    sort: "sort"
  }));
} catch (error) {
  console.log(error);
}
</script>
