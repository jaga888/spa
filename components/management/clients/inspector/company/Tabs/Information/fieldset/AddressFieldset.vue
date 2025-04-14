<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Address</legend>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.address.address.$dirty}">
            <input
                id="form_company_address_address"
                type="text"
                name="mailing-address-address"
                class="senex__form__input"
                placeholder="Address..."
                @input="$emit('update:address.address', ($event.target as HTMLInputElement).value)"
                :value="address.address"
                @keyup="setDirty(validation.address.address)"
            />
          </div>
          <label class="senex__form__label" for="form_company_address_address">Address</label>
          <br v-if="validation.address.address.required.$invalid">
          <span class="error" style="color: red" v-if="validation.address.address.required.$invalid">
                {{ validation.address.address.required.$message }}
          </span>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.address.city.$dirty}">
            <input
                id="form_company_address_city"
                type="text"
                name="mailing-address-city"
                class="senex__form__input"
                placeholder="City..."
                @input="$emit('update:address?.city', ($event.target as HTMLInputElement).value)"
                :value="address?.city"
                @keyup="setDirty(validation.address.city)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.city.required.$invalid">
                {{ validation.address.city.required.$message }}
          </span><br v-if="validation.address.city.required.$invalid">
          <label class="senex__form__label" for="form_company_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.address.state.$dirty}">
            <input
                id="form_company_address_state"
                type="text"
                name="mailing-address-state"
                class="senex__form__input"
                placeholder="ST..."
                @input="$emit('update:address?.state', ($event.target as HTMLInputElement).value)"
                :value="address?.state"
                @keyup="setDirty(validation.address.state)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.state.required.$invalid">
                {{ validation.address.state.required.$message }}
          </span><br v-if="validation.address.state.required.$invalid">
          <label class="senex__form__label" for="form_company_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.zip.$dirty}">
            <input
                id="form_company_address_zip"
                type="text"
                name="mailing-address-zip"
                class="senex__form__input"
                placeholder="Zip..."
                @input="$emit('update:address?.zip', ($event.target as HTMLInputElement).value)"
                :value="address?.zip"
                @keyup="setDirty(validation.address.zip)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.zip.required.$invalid">
                {{ validation.address.zip.required.$message }}
          </span><br v-if="validation.address.zip.required.$invalid">
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
               :class="{'senex__form__field--dirty': validation.invoice_address?.address.$dirty}">
            <input
                id="form_company_invoice_address_address"
                type="text"
                name="invoice-address-address"
                class="senex__form__input"
                placeholder="Address Line 1..."
                @input="$emit('update:invoiceAddress?.address', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress?.address"
                @keyup="setDirty(validation.invoice_address?.address)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_address">Address Line 1</label>
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
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.city.$dirty}">
            <input
                id="form_company_invoice_address_city"
                type="text"
                name="invoice-address-city"
                class="senex__form__input"
                placeholder="City..."
                @input="$emit('update:invoiceAddress?.city', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress?.city"
                @keyup="setDirty(validation.invoice_address?.city)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.state.$dirty}">
            <input
                id="form_company_invoice_address_state"
                type="text"
                name="invoice-address-state"
                class="senex__form__input"
                placeholder="ST..."
                @input="$emit('update:invoiceAddress?.state', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress?.state"
                @change="setDirty(validation.invoice_address?.state)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.zip.$dirty}">
            <input
                id="form_company_invoice_address_zip"
                type="text"
                name="invoice-address-zip"
                class="senex__form__input"
                placeholder="Zip..."
                @input="$emit('update:invoiceAddress?.zip', ($event.target as HTMLInputElement).value)"
                :value="invoiceAddress?.zip"
                @keyup="setDirty(validation.invoice_address?.zip)"
            />
          </div>
          <label class="senex__form__label" for="form_company_invoice_address_zip">Zip</label>
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
import {type Validation} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";
import type {Address} from "~/services/address/types";

defineProps({
  address: {
    type: Object as PropType<Address>,
    default: <Address>{}
  },
  invoiceAddress: {
    type: Object as PropType<Address>,
    default: <Address>{}
  },
  invoiceAddress2: {
    type: String,
    default: ""
  },
  invoiceEmail: {
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
