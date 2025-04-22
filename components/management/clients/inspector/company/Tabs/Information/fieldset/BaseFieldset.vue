<template>
  <fieldset class="senex__form__fieldset">
    <div class="senex__form__block">
      <div class="senex__form__header">Legal Name</div>

      <div class="senex__form__text">
        The full Legal Name of the client company.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.legalName}">
            <input id="form_company_legal_name"
                   type="text"
                   name="company_legal_name"
                   class="senex__form__input"
                   placeholder="Legal Name..."
                   v-model="legalName"
                   @keyup="setDirty('legalName')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.legal_name.required.$invalid">
            {{ validation.legal_name.required.$message }}
          </span><br v-if="validation.legal_name.required.$invalid">
          <label class="senex__form__label" for="form_company_legal_name">Legal Name</label>
        </div>
      </div>

      <div class="senex__form__header">Name</div>

      <div class="senex__form__text">
        The name of the client.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.name}">
            <input
                id="form_company_name"
                type="text"
                name="company_name"
                class="senex__form__input"
                placeholder="Name..."
                v-model="name"
                @keyup="setDirty('name')"
                autocomplete="false"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.name.required.$invalid">
            {{ validation.name.required.$message }}
          </span><br v-if="validation.name.required.$invalid">
          <label class="senex__form__label" for="form_company_name">Name</label>
        </div>
      </div>

      <div class="senex__form__header">Identifier</div>
      <div class="senex__form__text">
        The short name of the client.
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.shortName}">
            <input
                id="form_company_short_name"
                type="text"
                name="company_short_name"
                class="senex__form__input"
                placeholder="Short Name..."
                v-model="shortName"
                @keyup="setDirty('shortName')"
                required
            />
          </div>
          <span class="error" style="color: red" v-if="validation.short_name.required.$invalid">
            {{ validation.short_name.required.$message }}
          </span><br v-if="validation.short_name.required.$invalid">
          <label class="senex__form__label" for="form_company_short_name">Identifier</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import type {Validation, ValidationArgs} from "@vuelidate/core";
import type {Company} from "~/services/company/types";

const legalName = defineModel<string>("legalName", {
  default: ""
});

const name = defineModel<string>("name", {
  default: ""
});

const shortName = defineModel<string>("shortName", {
  default: ""
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
      invoiceAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoiceAddress2: false,
      invoiceEmail: false,
      contactEmail: false,
      contactName: false,
      contactPhone: false,
      url: false,
      udFilingThreshold: false
    }
  },
  validation: {
    type: Object as PropType<Validation<ValidationArgs, Company>>,
    default: <Validation<ValidationArgs, Company>>{}
  },
});

const {isDirty} = storeToRefs(useCompanyStore());

const {setIsDirty} = useCompanyStore();

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyCompanyColumns[address][column] = true : props.dirtyCompanyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};
</script>
