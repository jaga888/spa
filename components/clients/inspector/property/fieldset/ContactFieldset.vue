<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Contact</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.phone.$dirty}">
            <input
                id="form_property_phone"
                type="tel"
                name="phone"
                class="senex__form__input"
                placeholder="Phone..."
                @input="$emit('update:phone', ($event.target as HTMLInputElement).value)"
                :value="phone"
                @keyup="setDirty(validation.phone)"
            />
          </div>
          <label class="senex__form__label" for="form_property_contact_name">Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.fax.$dirty}">
            <input
                id="form_property_fax"
                type="text"
                name="fax"
                class="senex__form__input"
                @input="$emit('update:fax', ($event.target as HTMLInputElement).value)"
                :value="fax"
                @change="setDirty(validation.fax)"
            />
          </div>
          <label class="senex__form__label" for="form_property_contact_phone">Fax</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.email.$dirty}">
            <input
                id="form_property_email"
                type="email"
                name="email"
                class="senex__form__input"
                placeholder="Email..."
                @input="$emit('update:email', ($event.target as HTMLInputElement).value)"
                :value="email"
                @keyup="setDirty(validation.email)"
            />
          </div>
          <label class="senex__form__label" for="form_property_contact_email">Email</label>
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
  phone: {
    type: String,
    default: ""
  },
  fax: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  validation: {
    type: Object as PropType<Validation<Property>>,
    default: <Validation<Property>>{}
  },
})

const {setIsDirty} = usePropertyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}
</script>
