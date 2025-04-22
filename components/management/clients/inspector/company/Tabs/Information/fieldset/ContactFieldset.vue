<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Contact</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.contactName}">
            <input
                id="form_company_contact_name"
                type="text"
                name="company_contact_name"
                class="senex__form__input"
                placeholder="Name..."
                v-model="contactName"
                @keyup="setDirty('contactName')"
            />
          </div>
          <label class="senex__form__label" for="form_company_contact_name">Name</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.contactPhone}">
            <input
                id="form_company_contact_phone"
                type="tel"
                name="company_contact_phone"
                class="senex__form__input"
                v-model="contactPhone"
                @keyup="setDirty('contactPhone')"
            />
          </div>
          <label class="senex__form__label" for="form_company_contact_phone">Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.contactEmail}">
            <input
                id="form_company_contact_email"
                type="email"
                name="company_contact_email"
                class="senex__form__input"
                placeholder="Email..."
                v-model="contactEmail"
                @keyup="setDirty('contactEmail')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.contact_email?.email?.$invalid">
            {{ validation.contact_email.email.$message }}
          </span><br v-if="validation.contact_email.email.$invalid">
          <label class="senex__form__label" for="form_company_contact_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";

const contactName = defineModel<string>("contactName", {
  default: ""
});

const contactPhone = defineModel<string>("contactPhone", {
  default: ""
});

const contactEmail = defineModel<string>("contactEmail", {
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
