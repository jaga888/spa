<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Property Manager</legend>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.managerName}">
            <input id="form_property_manager_name"
                   type="text"
                   name="property_manager_name"
                   class="senex__form__input"
                   placeholder="Name..."
                   v-model="managerName"
                   @keyup="setDirty('managerName')"
            />
          </div>
          <label class="senex__form__label" for="form_property_manager_name">Name</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.managerCell}">
            <input id="form_property_manager_cell"
                   type="text"
                   name="property_manager_cell"
                   class="senex__form__input"
                   placeholder="Cell Phone..."
                   v-model="managerCell"
                   @keyup="setDirty('managerCell')"
            />
          </div>
          <label class="senex__form__label" for="form_property_manager_cell">Cell Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.managerEmail}">
            <input id="form_property_manager_email"
                   type="text"
                   name="property_manager_email"
                   class="senex__form__input"
                   placeholder="Email..."
                   v-model="managerEmail"
                   @keyup="setDirty('managerEmail')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.manager_email?.email.$invalid">
            {{ validation.manager_email?.email.$message }}
          </span><br v-if="validation.manager_email.email.$invalid">
          <label class="senex__form__label" for="form_property_manager_email">Email</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";
import type {Validation, ValidationArgs} from "@vuelidate/core";
import type {Property} from "~/services/property/types";

const managerName = defineModel<string>("managerName", {
  default: ""
});
const managerCell = defineModel<string>("managerCell", {
  default: ""
});
const managerEmail = defineModel<string>("managerEmail", {
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
      managerCell: false,
      managerEmail: false,
      lateAfterDom: false,
      noticeRentTrigger: false,
      useCompanyFilingThreshold: false,
      udFilingThreshold: false,
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
</script>
