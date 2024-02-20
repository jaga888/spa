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
                    @input="$emit('update:pmSoftwareId', parseInt(($event.target as HTMLInputElement).value))"
                    :value="pmSoftwareId"
                    @change="setDirty(validation?.pm_software_id)">
              <option :value="pmSoftware.id" v-for="pmSoftware in pmSoftwares">{{ pmSoftware.name }}</option>
            </select>
          </div>
          <label class="senex__form__label" for="form_company_pm_software_id">PM Software</label>
        </div>
      </div>

      <div class="senex__form__header">Client Website</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.url.$dirty}">
            <input
                id="form_company_url"
                type="text"
                name="url"
                class="senex__form__input"
                placeholder="Website URL..."
                @input="$emit('update:url', ($event.target as HTMLInputElement).value)"
                :value="url"
                @keyup="setDirty(validation.url)"
            />
          </div>
          <label class="senex__form__label" for="form_company_url">Website URL</label>
        </div>
      </div>

      <div class="senex__form__header">UD Filing Threshold</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.ud_filing_threshold.$dirty}">
            <input
                id="form_company_ud_filing_threshold"
                type="number"
                name="ud_filing_threshold"
                @input="$emit('update:udFilingThreshold', ($event.target as HTMLInputElement).value)"
                :value="udFilingThreshold"
                class="senex__form__input"
                placeholder="UD Filing Threshold..."
                min="0"
                @keyup="setDirty(validation.ud_filing_threshold)"
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
import {type Validation} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {PmSoftwareList} from "~/services/pm_software/types";
import {pmSoftwareService} from "~/services/pm_software/service";
import type {Company} from "~/services/company/types";

defineProps({
  pmSoftwareId: {
    type: Number,
  },
  url: {
    type: String,
    default: ""
  },
  udFilingThreshold: {
    type: Number,
    default: 500
  },
  validation: {
    type: Object as PropType<Validation<Company>>,
    default: <Validation<Company>>{}
  },
})

const {setIsDirty} = useCompanyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}

const {activeCompany} = storeToRefs(useCompanyStore())

const pmSoftwares = ref<PmSoftwareList[]>([])

if (activeCompany.value?.id) {
  try {
    pmSoftwares.value = (await pmSoftwareService.getPmSoftwares({sort: 'order'}))

    console.log(pmSoftwares.value)
  } catch (error) {
    console.log(error)
  }
}
</script>
