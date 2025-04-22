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
          <input id="form_property_same_address_payment"
                 name="property_use_same_as_property_address_for_payment_address"
                 class="senex__clients__same-address-payment"
                 type="checkbox"
                 v-model="useSameAsPropertyAddressForPaymentAddress"
                 @change="changeUseSameAsPropertyAddressForPaymentAddress"
          />
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_payment"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.paymentAddress.address}">
            <input id="form_property_payment_address_address"
                   type="text"
                   name="property_payment_address_address"
                   class="senex__form__input"
                   placeholder="Address..."
                   v-model="address.address"
                   readonly
                   v-if="useSameAsPropertyAddressForPaymentAddress"
            />
            <input id="form_property_payment_address_address"
                   type="text"
                   name="property_payment_address_address"
                   class="senex__form__input"
                   placeholder="Address..."
                   v-model="paymentAddress.address"
                   @keyup="setDirty('address', 'paymentAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_address">Address</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.paymentAddress.city}">
            <input id="form_property_payment_address_city"
                   type="text"
                   name="property_payment_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="address.city"
                   readonly
                   v-if="useSameAsPropertyAddressForPaymentAddress"
            />
            <input id="form_property_payment_address_city"
                   type="text"
                   name="property_payment_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="paymentAddress.city"
                   @keyup="setDirty('city', 'paymentAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.paymentAddress.state}">
            <input id="form_property_payment_address_state"
                   type="text"
                   name="property_payment_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="address.state"
                   readonly
                   v-if="useSameAsPropertyAddressForPaymentAddress"
            />
            <input id="form_property_payment_address_state"
                   type="text"
                   name="property_payment_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="paymentAddress.state"
                   @keyup="setDirty('state', 'paymentAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_payment_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.paymentAddress.zip}">
            <input id="form_property_payment_address_zip"
                   type="number"
                   name="property_payment_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="address.zip"
                   readonly
                   v-if="useSameAsPropertyAddressForPaymentAddress"
            />
            <input id="form_property_payment_address_zip"
                   type="number"
                   name="property_payment_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="paymentAddress.zip"
                   @keyup="setDirty('zip', 'paymentAddress')"
                   v-else
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
                 name="property_use_same_as_property_address_for_invoice_address"
                 class="senex__clients__same-address-invoice"
                 type="checkbox"
                 v-model="useSameAsPropertyAddressForInvoiceAddress"
                 @change="changeUseSameAsPropertyAddressForInvoiceAddress"
          />
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_invoice"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceAddress.address}">
            <input id="form_property_invoice_address_address"
                   type="text"
                   name="property_invoice_address_address"
                   class="senex__form__input"
                   placeholder="Address Line 1..."
                   v-model="address.address"
                   readonly
                   v-if="useSameAsPropertyAddressForInvoiceAddress"
            />
            <input id="form_property_invoice_address_address"
                   type="text"
                   name="property_invoice_address_address"
                   class="senex__form__input"
                   placeholder="Address Line 1..."
                   v-model="invoiceAddress.address"
                   @keyup="setDirty('address', 'invoiceAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_address">Address Line 1</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceAddress2}">
            <input id="form_property_invoice_address2"
                   type="text"
                   name="property_invoice_address2"
                   class="senex__form__input"
                   placeholder="Address Line 2..."
                   v-model="invoiceAddress2"
                   @keyup="setDirty('invoiceAddress2')"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address2">Address Line 2</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceAddress.city}">
            <input id="form_property_invoice_address_city"
                   type="text"
                   name="property_invoice_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="address.city"
                   readonly
                   v-if="useSameAsPropertyAddressForInvoiceAddress"
            />
            <input id="form_property_invoice_address_city"
                   type="text"
                   name="property_invoice_address_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="invoiceAddress.city"
                   @keyup="setDirty('city', 'invoiceAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceAddress.state}">
            <input id="form_property_invoice_address_state"
                   type="text"
                   name="property_invoice_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="address.state"
                   readonly
                   v-if="useSameAsPropertyAddressForInvoiceAddress"
            />
            <input id="form_property_invoice_address_state"
                   type="text"
                   name="property_invoice_address_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="invoiceAddress.state"
                   @keyup="setDirty('state', 'invoiceAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceAddress.zip}">
            <input id="form_property_invoice_address_zip"
                   type="number"
                   name="property_invoice_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="address.zip"
                   readonly
                   v-if="useSameAsPropertyAddressForInvoiceAddress"
            />
            <input id="form_property_invoice_address_zip"
                   type="number"
                   name="property_invoice_address_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="invoiceAddress.zip"
                   @keyup="setDirty('zip', 'invoiceAddress')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_address_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.invoiceEmail}">
            <input id="form_property_invoice_email"
                   type="text"
                   name="property_invoice_email"
                   class="senex__form__input"
                   placeholder="Email..."
                   v-model="invoiceEmail"
                   @keyup="setDirty('invoiceEmail')"
            />
          </div>
          <label class="senex__form__label" for="form_property_invoice_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";
import type {Address} from "~/services/address/types";

const invoiceAddress = defineModel<Address>("invoiceAddress", {
  default: <Address>{
    address: "",
    city: "",
    state: "",
    zip: "",
  }
});

const paymentAddress = defineModel<Address>("paymentAddress", {
  default: <Address>{
    address: "",
    city: "",
    state: "",
    zip: "",
  }
});

const address = defineModel<Address>("address", {
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

const useSameAsPropertyAddressForInvoiceAddress = defineModel<boolean>("useSameAsPropertyAddressForInvoiceAddress", {
  default: false
});

const useSameAsPropertyAddressForPaymentAddress = defineModel<boolean>("useSameAsPropertyAddressForPaymentAddress", {
  default: false
});

const props = defineProps({
  dirtyPropertyColumns: {
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
      defaultUnitCity: false,
      defaultUnitState: false,
      defaultUnitZip: false,
      phone: false,
      fax: false,
      email: false,
      invoiceAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoiceAddress2: false,
      invoiceEmail: false,
      paymentAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      notificationEmail: false,
      documentEmail: false,
      managerName: false,
      managerCell: false,
      managerEmail: false,
      lateAfterDom: false,
      noticeRentTrigger: false,
      useCompanyFilingThreshold: false,
      udFilingThreshold: false,
      pmSoftwareId: false,
    }
  },
  validation: {
    type: Object as PropType<Validation<ValidationArgs, Property>>,
    default: <Validation<ValidationArgs, Property>>{}
  },
});

const {isDirty} = storeToRefs(usePropertyStore());

const {setIsDirty} = usePropertyStore();

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyPropertyColumns[address][column] = true : props.dirtyPropertyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};

const changeUseSameAsPropertyAddressForInvoiceAddress = () => {
  if (useSameAsPropertyAddressForInvoiceAddress) {
    setDirty("address", "invoiceAddress");

    setDirty("city", "invoiceAddress");

    setDirty("state", "invoiceAddress");

    setDirty("zip", "invoiceAddress");
  }
};

const changeUseSameAsPropertyAddressForPaymentAddress = () => {
  if (useSameAsPropertyAddressForPaymentAddress) {
    setDirty("address", "paymentAddress");

    setDirty("city", "paymentAddress");

    setDirty("state", "paymentAddress");

    setDirty("zip", "paymentAddress");
  }
};
</script>
