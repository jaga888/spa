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
          <div class="senex__form__field">
            <input id="form_property_payment_address"
                   type="text"
                   name="payment_address"
                   class="senex__form__input"
                   placeholder="Address..."
                   @input="$emit('update:payment_address', ($event.target as HTMLInputElement).value)"
                   :value="paymentAddress"
                   @keyup="setDirty(validation.payment_address)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address">Address</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field">
            <input id="form_property_payment_city"
                   type="text"
                   name="payment_city"
                   class="senex__form__input"
                   placeholder="City..."
                   @input="$emit('update:payment_city', ($event.target as HTMLInputElement).value)"
                   :value="paymentCity"
                   @keyup="setDirty(validation.payment_city)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field">
            <input id="form_property_payment_state"
                   type="text"
                   name="payment_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   @input="$emit('update:payment_state', ($event.target as HTMLInputElement).value)"
                   :value="paymentState"
                   @keyup="setDirty(validation.payment_state)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field">
            <input id="form_property_payment_zip"
                   type="text"
                   name="payment_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   @input="$emit('update:payment_zip', ($event.target as HTMLInputElement).value)"
                   :value="paymentZip"
                   @keyup="setDirty(validation.payment_zip)"
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_zip">Zip</label>
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
          <div class="senex__form__field">
            <input id="form_property_invoice_address"
                   type="text"
                   name="invoice_address"
                   class="senex__form__input"
                   placeholder="Address Line 1..."
                   @input="$emit('update:invoice_address', ($event.target as HTMLInputElement).value)"
                   :value="invoiceAddress"
                   @keyup="setDirty(validation.invoice_address)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input id="form_property_invoice_address2"
                   type="text"
                   name="invoice_address2"
                   class="senex__form__input"
                   placeholder="Address Line 2..."
                   @input="$emit('update:invoice_address2', ($event.target as HTMLInputElement).value)"
                   :value="invoiceAddress2"
                   @keyup="setDirty(validation.invoice_address2)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field">
            <input id="form_property_invoice_city"
                   type="text"
                   name="invoice_city"
                   class="senex__form__input"
                   placeholder="City..."
                   @input="$emit('update:invoice_city', ($event.target as HTMLInputElement).value)"
                   :value="invoiceCity"
                   @keyup="setDirty(validation.invoice_city)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field">
            <input id="form_property_invoice_state"
                   type="text"
                   name="invoice_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   @input="$emit('update:invoice_state', ($event.target as HTMLInputElement).value)"
                   :value="invoiceState"
                   @keyup="setDirty(validation.invoice_state)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field">
            <input id="form_property_invoice_zip"
                   type="text"
                   name="invoice_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   @input="$emit('update:invoice_zip', ($event.target as HTMLInputElement).value)"
                   :value="invoiceZip"
                   @keyup="setDirty(validation.invoice_zip)"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input id="form_property_invoice_email"
                   type="text"
                   name="invoice_email"
                   class="senex__form__input"
                   placeholder="Email..."
                   @input="$emit('update:invoice_email', ($event.target as HTMLInputElement).value)"
                   :value="invoiceEmail"
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

  defineProps({
    paymentAddress: {
      type: String,
      default: ""
    },
    paymentCity: {
      type: String,
      default: ""
    },
    paymentState: {
      type: String,
      default: ""
    },
    paymentZip: {
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
      type: Object as PropType<Validation<Property>>,
      default: <Validation<Property>>{}
    },
  })

  const {setIsDirty} = usePropertyStore();

  const setDirty = (element: { $touch: any; }|undefined = undefined) => {
    if (element) {
      element.$touch();
    }

    setIsDirty(true)
  }
</script>
