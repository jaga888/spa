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
                name="mailing-address-address"
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
                name="mailing-address-city"
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
                name="mailing-address-state"
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
                type="text"
                name="mailing-address-zip"
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
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_address.address}">
            <input
                id="form_company_invoice_address_address"
                type="text"
                name="invoice-address-address"
                class="senex__form__input"
                placeholder="Address Line 1..."
                v-model="invoiceAddress.address"
                @keyup="setDirty('address', 'invoice_address')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_address2}">
            <input
                id="form_company_invoice_address2"
                type="text"
                name="invoice_address2"
                class="senex__form__input"
                placeholder="Address Line 2..."
                v-model="invoiceAddress2"
                @keyup="setDirty('invoice_address2')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_address.city}">
            <input
                id="form_company_invoice_address_city"
                type="text"
                name="invoice-address-city"
                class="senex__form__input"
                placeholder="City..."
                v-model="invoiceAddress.city"
                @keyup="setDirty('city', 'invoice_address')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_address.state}">
            <input
                id="form_company_invoice_address_state"
                type="text"
                name="invoice-address-state"
                class="senex__form__input"
                placeholder="ST..."
                v-model="invoiceAddress.state"
                @change="setDirty('state', 'invoice_address')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_address.zip}">
            <input
                id="form_company_invoice_address_zip"
                type="text"
                name="invoice-address-zip"
                class="senex__form__input"
                placeholder="Zip..."
                v-model="invoiceAddress.zip"
                @keyup="setDirty('zip', 'invoice_address')"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyCompanyColumns.invoice_email}">
            <input
                id="form_company_invoice_email"
                type="text"
                name="invoice_email"
                class="senex__form__input"
                placeholder="Email..."
                v-model="invoiceEmail"
                @keyup="setDirty('invoice_email')"
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
  required: true
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
</script>
