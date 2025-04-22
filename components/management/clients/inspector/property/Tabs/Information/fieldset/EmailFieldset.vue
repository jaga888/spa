<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Email</legend>

    <div class="senex__form__block">
      <div class="senex__form__header">Notification Email</div>
      <div class="senex__form__text">
        Senex client notifications will be sent to these addresses.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': dirtyPropertyColumns.notificationEmail}">
            <input id="form_property_notification_email"
                   type="text"
                   name="property_notification_email"
                   class="senex__form__input"
                   placeholder="email..."
                   v-model="notificationEmail"
                   @keyup="setDirty('notificationEmail')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.notification_email?.eachEmail.$invalid">
            {{ validation.notification_email?.eachEmail.$message }}
          </span><br v-if="validation.notification_email?.eachEmail.$invalid">
          <label class="senex__form__label" for="form_property_notification_email">
            Separate multiple addresses with a semicolon.
          </label>
        </div>
      </div>
    </div>

    <div class="senex__form__block">
      <div class="senex__form__header">Document Email</div>
      <div class="senex__form__text">
        Processed document PDFs will be sent to these addresses.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.documentEmail}">
            <input id="form_property_document_email"
                   type="text"
                   name="property_document_email"
                   class="senex__form__input"
                   placeholder="email..."
                   v-model="documentEmail"
                   @keyup="setDirty('documentEmail')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.document_email?.eachEmail.$invalid">
            {{ validation.document_email?.eachEmail.$message }}
          </span><br v-if="validation.document_email?.eachEmail.$invalid">
          <label class="senex__form__label" for="form_property_document_email">
            Separate multiple addresses with a semicolon.
          </label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";
import type {Validation, ValidationArgs} from "@vuelidate/core";
import type {Property} from "~/services/property/types";

const notificationEmail = defineModel<string>("notificationEmail", {
  default: ""
});

const documentEmail = defineModel<string>("documentEmail", {
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
