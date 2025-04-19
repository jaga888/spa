<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Other Information</legend>
    <div class="senex__form__block">
      <div class="senex__form__header">Property Management Software</div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <select name="pm_software_id"
                    id="form_company_pm_software_id"
                    class="senex__form__select"
                    v-model="pmSoftwareId"
                    @change="!isDirty ? setIsDirty() : false"
            >
              <PmSoftware v-for="pmSoftware in pmSoftwares" :pmSoftware="pmSoftware"/>
            </select>
          </div>
          <label class="senex__form__label" for="form_company_pm_software_id">PM Software</label>
        </div>
      </div>

      <div class="senex__form__header">Client Website</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.url}">
            <input
                id="form_company_url"
                type="text"
                name="url"
                class="senex__form__input"
                placeholder="Website URL..."
                v-model="url"
                @keyup="setDirty('url')"
            />
          </div>
          <label class="senex__form__label" for="form_company_url">Website URL</label>
        </div>
      </div>

      <div class="senex__form__header">UD Filing Threshold</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.ud_filing_threshold}">
            <input
                id="form_company_ud_filing_threshold"
                type="number"
                name="ud_filing_threshold"
                v-model="udFilingThreshold"
                class="senex__form__input"
                placeholder="UD Filing Threshold..."
                min="0"
                @keyup="setDirty('ud_filing_threshold')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.ud_filing_threshold.required.$invalid">
            {{ validation.ud_filing_threshold.required.$message }}
          </span><br v-if="validation.ud_filing_threshold.required.$invalid">
          <span class="error" style="color: red" v-if="validation.ud_filing_threshold.minValue.$invalid">
            {{ validation.ud_filing_threshold.minValue.$message }}
          </span><br v-if="validation.ud_filing_threshold.minValue.$invalid">
          <label class="senex__form__label" for="form_company_ud_filing_threshold">UD Filing Threshold</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {PmSoftwareList} from "~/services/pm_software/types";
import {pmSoftwareService} from "~/services/pm_software/service";
import type {Company} from "~/services/company/types";
import PmSoftware from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/PmSoftware.vue";

const pmSoftwareId = defineModel<number>("pmSoftwareId", {
  default: 0
});

const url = defineModel<string>("url", {
  default: ""
});

const udFilingThreshold = defineModel<number>("udFilingThreshold", {
  default: 500
});

const props = defineProps({
  dirtyCompanyColumns: {
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
      invoice_address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoice_address2: false,
      invoice_email: false,
      contact_email: false,
      contact_name: false,
      contact_phone: false,
      url: false,
      ud_filing_threshold: false
    }
  },
  validation: {
    type: Object as PropType<Validation<ValidationArgs, Company>>,
    default: <Validation<Company>>{}
  },
});

const {isDirty} = storeToRefs(useCompanyStore());

const {setIsDirty} = useCompanyStore();

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyCompanyColumns[address][column] = true : props.dirtyCompanyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};

const {activeCompany} = storeToRefs(useCompanyStore());

const pmSoftwares = ref<PmSoftwareList[]>([]);

if (activeCompany.value?.id) {
  try {
    pmSoftwares.value = (await pmSoftwareService.getPmSoftwares({sort: "order"}));
  } catch (error) {
    console.log(error);
  }
}
</script>
