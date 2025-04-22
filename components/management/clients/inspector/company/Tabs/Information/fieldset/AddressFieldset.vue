<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Address</legend>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.address.address}">
            <span>{{ }}</span>
            <input
                id="form_company_address_address"
                type="text"
                name="company_mailing_address_address"
                class="senex__form__input"
                placeholder="Address..."
                v-model="address.address"
                @keyup="setDirty('address', 'address')"
            />
          </div>
          <label class="senex__form__label" for="form_company_address_address">Address</label>
          <br v-if="validation.address?.address.required.$invalid">
          <span class="error" style="color: red" v-if="validation.address?.address.required.$invalid">
                {{ validation.address.address.required.$message }}
          </span>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.address.city}">
            <input
                id="form_company_address_city"
                type="text"
                name="company_mailing_address_city"
                class="senex__form__input"
                placeholder="City..."
                v-model="address.city"
                @keyup="setDirty('city', 'address')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address?.city.required.$invalid">
                {{ validation.address?.city.required.$message }}
          </span><br v-if="validation.address?.city.required.$invalid">
          <label class="senex__form__label" for="form_company_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.address.state}">
            <input
                id="form_company_address_state"
                type="text"
                name="company_mailing_address_state"
                class="senex__form__input"
                placeholder="ST..."
                v-model="address.state"
                @keyup="setDirty('state', 'address')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address?.state.required.$invalid">
                {{ validation.address?.state.required.$message }}
          </span><br v-if="validation.address?.state.required.$invalid">
          <label class="senex__form__label" for="form_company_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.address.zip}">
            <input
                id="form_company_address_zip"
                type="number"
                name="company_mailing_address_zip"
                class="senex__form__input"
                placeholder="Zip..."
                v-model="address.zip"
                @keyup="setDirty('zip', 'address')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address?.zip.required.$invalid">
                {{ validation.address?.zip.required.$message }}
          </span><br v-if="validation.address?.zip.required.$invalid">
          <label class="senex__form__label" for="form_company_address_zip">Zip</label>
        </div>
      </div>
    </div>

    <div class="senex__form__block">
      <div class="senex__form__header">Invoice Address</div>
      <div class="senex__form__text">
        This is the address where Client Invoices should be sent.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceAddress.address}">
            <input
                id="form_company_invoice_address_address"
                type="text"
                name="company_invoice_address_address"
                class="senex__form__input"
                placeholder="Address Line 1..."
                v-model="invoiceAddress.address"
                @keyup="setDirty('address', 'invoiceAddress')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceAddress2}">
            <input
                id="form_company_invoice_address2"
                type="text"
                name="company_invoice_address2"
                class="senex__form__input"
                placeholder="Address Line 2..."
                v-model="invoiceAddress2"
                @keyup="setDirty('invoiceAddress2')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceAddress.city}">
            <input
                id="form_company_invoice_address_city"
                type="text"
                name="company_invoice_address_city"
                class="senex__form__input"
                placeholder="City..."
                v-model="invoiceAddress.city"
                @keyup="setDirty('city', 'invoiceAddress')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceAddress.state}">
            <input
                id="form_company_invoice_address_state"
                type="text"
                name="company_invoice_address_state"
                class="senex__form__input"
                placeholder="ST..."
                v-model="invoiceAddress.state"
                @keyup="setDirty('state', 'invoiceAddress')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceAddress.zip}">
            <input
                id="form_company_invoice_address_zip"
                type="number"
                name="company_invoice_address_zip"
                class="senex__form__input"
                placeholder="Zip..."
                v-model="invoiceAddress.zip"
                @keyup="setDirty('zip', 'invoiceAddress')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoiceEmail}">
            <input
                id="form_company_invoice_email"
                type="text"
                name="company_invoice_email"
                class="senex__form__input"
                placeholder="Email..."
                v-model="invoiceEmail"
                @keyup="setDirty('invoiceEmail')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.invoice_email.eachEmail.$invalid">
            {{ validation.invoice_email.eachEmail.$message }}
          </span><br v-if="validation.invoice_email.eachEmail.$invalid">
          <label class="senex__form__label" for="form_company_invoice_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";
import type {Address} from "~/services/address/types";
import type {PropType} from "vue";

const address = defineModel<Address>("address", {
  required: true,
  default: <Address>{
    address: "",
    city: "",
    state: "",
    zip: "",
  }
});

const invoiceAddress = defineModel<Address>("invoiceAddress", {
  default: <Address>{
    address: "",
    city: "",
    state: "",
    zip: "",
  }
});

const invoiceAddress2 = defineModel<string>("invoiceAddress2", {
  default: ""
});

const invoiceEmail = defineModel<string>("invoiceEmail", {
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
