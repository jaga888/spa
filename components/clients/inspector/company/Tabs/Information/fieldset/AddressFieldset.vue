<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Address</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.$dirty}">
            <input
                id="form_company_address"
                type="text"
                name="address"
                class="senex__form__input"
                placeholder="Address..."
                @input="$emit('update:address', ($event.target as HTMLInputElement).value)"
                :value="address"
                @keyup="setDirty(validation.address)"
                autocomplete="off"
            />
          </div>
          <label class="senex__form__label" for="form_company_address">Address</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.city.$dirty}">
            <input
                id="form_company_city"
                type="text"
                name="city"
                class="senex__form__input"
                placeholder="City..."
                @input="$emit('update:city', ($event.target as HTMLInputElement).value)"
                :value="city"
                @keyup="setDirty(validation.city)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.city.required.$invalid">
                {{ validation.city.required.$message }}
          </span><br v-if="validation.city.required.$invalid">
          <label class="senex__form__label" for="form_company_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.state.$dirty}">
            <input
                id="form_company_state"
                type="text"
                name="state"
                class="senex__form__input"
                placeholder="ST..."
                @input="$emit('update:state', ($event.target as HTMLInputElement).value)"
                :value="state"
                @keyup="setDirty(validation.state)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.state.required.$invalid">
                {{ validation.state.required.$message }}
          </span><br v-if="validation.state.required.$invalid">
          <label class="senex__form__label" for="form_company_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.zip.$dirty}">
            <input
                id="form_company_zip"
                type="text"
                name="zip"
                class="senex__form__input"
                placeholder="Zip..."
                @input="$emit('update:zip', ($event.target as HTMLInputElement).value)"
                :value="zip"
                @keyup="setDirty(validation.zip)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.zip.required.$invalid">
                {{ validation.zip.required.$message }}
          </span><br v-if="validation.zip.required.$invalid">
          <label class="senex__form__label" for="form_company_zip">Zip</label>
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_address.$dirty}">
            <input
                id="form_company_invoice_address"
                type="text"
                name="invoice_address"
                class="senex__form__input"
                placeholder="Address Line 1..."
                @input="$emit('update:invoiceAddress', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress"
                @keyup="setDirty(validation.invoice_address)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_address2.$dirty}">
            <input
                id="form_company_invoice_address2"
                type="text"
                name="invoice_address2"
                class="senex__form__input"
                placeholder="Address Line 2..."
                @input="$emit('update:invoiceAddress2', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress2"
                @keyup="setDirty(validation.invoice_address2)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_city.$dirty}">
            <input
                id="form_company_invoice_city"
                type="text"
                name="invoice_city"
                class="senex__form__input"
                placeholder="City..."
                @input="$emit('update:invoiceCity', ($event.target as HTMLInputElement).value)"
                :value="invoiceCity"
                @keyup="setDirty(validation.invoice_city)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.$dirty}">
            <input
                id="form_company_invoice_state"
                type="text"
                name="invoice_state"
                class="senex__form__input"
                placeholder="ST..."
                @input="$emit('update:invoiceState', ($event.target as HTMLInputElement).value)"
                :value="invoiceState"
                @change="setDirty(validation.invoice_state)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_zip.$dirty}">
            <input
                id="form_company_invoice_zip"
                type="text"
                name="invoice_zip"
                class="senex__form__input"
                placeholder="Zip..."
                @input="$emit('update:invoiceZip', ($event.target as HTMLInputElement).value)"
                :value="invoiceZip"
                @keyup="setDirty(validation.invoice_zip)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_email.$dirty}">
            <input
                id="form_company_invoice_email"
                type="text"
                name="invoice_email"
                class="senex__form__input"
                placeholder="Email..."
                @input="$emit('update:invoiceEmail', ($event.target as HTMLInputElement).value)"
                :value="invoiceEmail"
                @keyup="setDirty(validation.invoice_email)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";

defineProps({
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  zip: {
    type: String,
    default: ""
  },
  invoiceAddress: {
    type: String,
    default: ""
  },
  invoiceAddress2: {
    type: String,
    default: ""
  },
  invoiceCity: {
    type: String,
    default: ""
  },
  invoiceEmail: {
    type: String,
    default: ""
  },
  invoiceState: {
    type: String,
    default: ""
  },
  invoiceZip: {
    type: String,
    default: ""
  },
  validation: {
    type: Object as PropType<Validation<Company>>,
    default: <Validation<Company>>{}
  },
});

const {setIsDirty} = useCompanyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};
</script>
