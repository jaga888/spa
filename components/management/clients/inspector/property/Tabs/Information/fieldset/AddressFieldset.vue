<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Addresses</legend>

    <div class="senex__form__block">
      <div class="senex__form__header">Payment Address</div>
      <div class="senex__form__text">
        This address will be used on resident communications, to indicate where they should send payment.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <input id="form_property_same_address_payment" class="senex__clients__same-address-payment" type="checkbox"/>
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_payment"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.payment_address?.address.$dirty}">
            <input id="form_property_payment_address_address"
                   type="text"
                   name="payment_address_address"
                   class="senex__form__input"
                   placeholder="Address..."
                   v-model="paymentAddress.address"
                   @keyup="setDirty(validation.payment_address?.address)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_address">Address</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.payment_address?.city.$dirty}">
            <input id="form_property_payment_address_city"
                   type="text"
                   name="payment_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="paymentAddress.city"
                   @keyup="setDirty(validation.payment_address?.city)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.payment_address?.state.$dirty}">
            <input id="form_property_payment_address_state"
                   type="text"
                   name="payment_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="paymentAddress.state"
                   @keyup="setDirty(validation.payment_address?.state)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.payment_address?.zip.$dirty}">
            <input id="form_property_payment_address_zip"
                   type="text"
                   name="payment_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="paymentAddress.zip"
                   @keyup="setDirty(validation.payment_address?.zip)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_zip">Zip</label>
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
          <input id="form_property_same_address_invoice"
                 class="senex__clients__same-address-invoice"
                 type="checkbox"/>
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_invoice"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.address.$dirty}">
            <input id="form_property_invoice_address_address"
                   type="text"
                   name="invoice_address_address"
                   class="senex__form__input"
                   placeholder="Address Line 1..."
                   v-model="invoiceAddress.address"
                   @keyup="setDirty(validation.invoice_address?.address)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_address2.$dirty}">
            <input id="form_property_invoice_address2"
                   type="text"
                   name="invoice_address2"
                   class="senex__form__input"
                   placeholder="Address Line 2..."
                   v-model="invoiceAddress2"
                   @keyup="setDirty(validation.invoice_address2)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.city.$dirty}">
            <input id="form_property_invoice_address_city"
                   type="text"
                   name="invoice_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="invoiceAddress.city"
                   @keyup="setDirty(validation.invoice_address?.city)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.state.$dirty}">
            <input id="form_property_invoice_address_state"
                   type="text"
                   name="invoice_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="invoiceAddress.state"
                   @keyup="setDirty(validation.invoice_address?.state)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.invoice_address?.zip.$dirty}">
            <input id="form_property_invoice_address_zip"
                   type="text"
                   name="invoice_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="invoiceAddress.zip"
                   @keyup="setDirty(validation.invoice_address?.zip)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.invoice_email.$dirty}">
            <input id="form_property_invoice_email"
                   type="text"
                   name="invoice_email"
                   class="senex__form__input"
                   placeholder="Email..."
                   v-model="invoiceEmail"
                   @keyup="setDirty(validation.invoice_email)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";
import type {Address} from "~/services/address/types";

const invoiceAddress = defineModel<Address>("invoiceAddress", {
  required: true
});
const paymentAddress = defineModel<Address>("paymentAddress", {
  required: true
});
const invoiceAddress2 = defineModel<string>("invoiceAddress2", {
  default: ""
});
const invoiceEmail = defineModel<string>("invoiceEmail", {
  default: ""
});

defineProps({
  validation: {
    type: Object as PropType<Validation<Property>>,
    default: <Validation<Property>>{}
  },
});

const {setIsDirty} = usePropertyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};
</script>
