<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Contact</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation?.contact_name.$dirty}">
            <input
                id="form_company_contact_name"
                type="text"
                name="contact_name"
                class="senex__form__input"
                placeholder="Name..."
                @input="$emit('update:contactName', $event.target.value)"
                :value="contactName"
                @keyup="setDirty(validation?.contact_name)"
            />
          </div>
          <label class="senex__form__label" for="form_company_contact_name">Name</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation?.contact_phone.$dirty}">
            <input
                id="form_company_contact_phone"
                type="tel"
                name="contact_phone"
                class="senex__form__input"
                @input="$emit('update:contactPhone', $event.target.value)"
                :value="contactPhone"
                @change="setDirty(validation?.contact_phone)"
            />
          </div>
          <label class="senex__form__label" for="form_company_contact_phone">Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation?.contact_email.$dirty}">
            <input
                id="form_company_contact_email"
                type="email"
                name="contact_email"
                class="senex__form__input"
                placeholder="Email..."
                @input="$emit('update:contactEmail', $event.target.value)"
                :value="contactEmail"
                @keyup="setDirty(validation?.contact_email)"
            />
          </div>
          <label class="senex__form__label" for="form_company_contact_email">Email</label>
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
    contactName: {
      type: String,
      default: ""
    },
    contactPhone: {
      type: String,
      default: ""
    },
    contactEmail: {
      type: String,
      default: ""
    },
    validation: {
      type: Object as PropType<Validation<Company>>
    },
  })

  const {setIsDirty} = useCompanyStore();

  const setDirty = (element: { $touch: any; }|undefined = undefined) => {
    if (element) {
      element.$touch();
    }

    setIsDirty(true)
  }
</script>
