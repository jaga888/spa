<template>
  <fieldset class="senex__form__fieldset">
    <div class="senex__form__block">
      <div class="senex__form__header">Legal Name</div>

      <div class="senex__form__text">
        The Legal Name is used on most documents.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.legalName}">
            <input id="form_property_legal_name"
                   type="text"
                   name="property_legal_name"
                   class="senex__form__input"
                   placeholder="Legal Name..."
                   v-model="legalName"
                   @keyup="setDirty('legalName', undefined, validation.legal_name)"
            />
          </div>

          <span class="error" style="color: red" v-if="validation.legal_name.required.$invalid">
            {{ validation.legal_name.required.$message }}
          </span><br v-if="validation.legal_name.required.$invalid">
          <label class="senex__form__label" for="form_property_legal_name">Legal Name</label>
        </div>
      </div>

      <div class="senex__form__header">Name</div>

      <div class="senex__form__text">
        The name is the name of the property. Typically, it's the same as the trade name.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.name}">
            <input
                id="form_property_name"
                type="text"
                name="property_name"
                class="senex__form__input"
                placeholder="Name..."
                v-model="name"
                @keyup="setDirty('name')"
                autocomplete="off"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.name.required.$invalid">
            {{ validation.name.required.$message }}
          </span><br v-if="validation.name.required.$invalid">
          <label class="senex__form__label" for="form_property_name">Name</label>
        </div>
      </div>

      <div class="senex__form__header">Nickname</div>
      <div class="senex__form__text">
        The short name of the client.
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.shortName}">
            <input
                id="form_property_short_name"
                type="text"
                name="property_short_name"
                class="senex__form__input"
                placeholder="Nickname..."
                v-model="shortName"
                @keyup="setDirty('shortName')"
                required
            />
          </div>
          <span class="error" style="color: red" v-if="validation.short_name.required.$invalid">
            {{ validation.short_name.required.$message }}
          </span><br v-if="validation.short_name.required.$invalid">
          <label class="senex__form__label" for="form_property_short_name">Nickname</label>
        </div>
      </div>

      <div class="senex__form__header">Client Property Id</div>
      <div class="senex__form__text">
        Identifier for import routine.
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input
                id="form_property_client_property_id"
                type="text"
                name="property_client_property_id"
                class="senex__form__input"
                placeholder="Client Property Id..."
                v-model="clientPropertyId"
                required
                :readonly="!!activeProperty?.id"
            />
          </div>
          <label class="senex__form__label" for="form_property_client_property_id">Client Property Id</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";
import type {Validation, ValidationArgs} from "@vuelidate/core";
import type {Property} from "~/services/property/types";

const legalName = defineModel<string>("legalName", {
  default: ""
});
const name = defineModel<string>("name", {
  default: ""
});
const shortName = defineModel<string>("shortName", {
  default: ""
});
const clientPropertyId = defineModel<string>("clientPropertyId", {
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
});

const {isDirty, activeProperty} = storeToRefs(usePropertyStore());

const {setIsDirty} = usePropertyStore();

const setDirty = (column: string, address?: string, element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  address ? props.dirtyPropertyColumns[address][column] = true : props.dirtyPropertyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};
</script>
