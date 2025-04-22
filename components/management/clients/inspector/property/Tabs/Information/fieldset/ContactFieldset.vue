<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Contact</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.phone}">
            <input
                id="form_property_phone"
                type="tel"
                name="property_phone"
                class="senex__form__input"
                placeholder="Phone..."
                v-model="phone"
                @keyup="setDirty('phone')"
                autocomplete="true"
            />
          </div>
          <label class="senex__form__label" for="form_property_phone">Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.fax}">
            <input
                id="form_property_fax"
                type="text"
                name="property_fax"
                class="senex__form__input"
                v-model="fax"
                @keyup="setDirty('fax')"
            />
          </div>
          <label class="senex__form__label" for="form_property_fax">Fax</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.email}">
            <input
                id="form_property_email"
                type="email"
                name="property_email"
                class="senex__form__input"
                autocomplete="true"
                placeholder="Email..."
                v-model="email"
                @keyup="setDirty('email')"
            />
          </div>
          <label class="senex__form__label" for="form_property_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";

const phone = defineModel<string>("phone", {
  default: ""
});

const fax = defineModel<string>("fax", {
  default: ""
});

const email = defineModel<string>("email", {
  default: ""
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
})

const {isDirty} = storeToRefs(usePropertyStore());

const {setIsDirty} = usePropertyStore();

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyPropertyColumns[address][column] = true : props.dirtyPropertyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};
</script>
