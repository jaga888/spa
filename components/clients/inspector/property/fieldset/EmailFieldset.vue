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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.notification_email.$dirty}">
            <input id="form_property_notification_email"
                   type="text"
                   name="notification_email"
                   class="senex__form__input"
                   placeholder="email..."
                   @input="$emit('update:notificationEmail', ($event.target as HTMLInputElement).value)"
                   :value="notificationEmail"
                   @keyup="setDirty(validation.notification_email)"
            />
          </div>
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.document_email.$dirty}">
            <input id="form_property_document_email"
                   type="text"
                   name="document_email"
                   class="senex__form__input"
                   placeholder="email..."
                   @input="$emit('update:documentEmail', ($event.target as HTMLInputElement).value)"
                   :value="documentEmail"
                   @keyup="setDirty(validation.document_email)"
            />
          </div>
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
import type {Validation} from "@vuelidate/core";
import type {Property} from "~/services/property/types";

defineProps({
  notificationEmail: {
    type: String,
    default: ""
  },
  documentEmail: {
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
