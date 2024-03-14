<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Property Manager</legend>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.manager_name.$dirty}">
            <input id="form_property_manager_name"
                   type="text"
                   name="manager_name"
                   class="senex__form__input"
                   placeholder="Name..."
                   @input="$emit('update:managerName', ($event.target as HTMLInputElement).value)"
                   :value="managerName"
                   @keyup="setDirty(validation.manager_name)"
            />
          </div>
          <label class="senex__form__label" for="form_property_manager_name">Name</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.manager_cell.$dirty}">
            <input id="form_property_manager_cell"
                   type="text"
                   name="manager_cell"
                   class="senex__form__input"
                   placeholder="Cell Phone..."
                   @input="$emit('update:managerCell', ($event.target as HTMLInputElement).value)"
                   :value="managerCell"
                   @keyup="setDirty(validation.manager_cell)"
            />
          </div>
          <label class="senex__form__label" for="form_property_manager_cell">Cell Phone</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.manager_email.$dirty}">
            <input id="form_property_manager_email"
                   type="text"
                   name="manager_email"
                   class="senex__form__input"
                   placeholder="Email..."
                   @input="$emit('update:managerEmail', ($event.target as HTMLInputElement).value)"
                   :value="managerEmail"
                   @keyup="setDirty(validation.manager_email)"
            />
          </div>
          <label class="senex__form__label" for="form_property_manager_email">Email</label>
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
  managerName: {
    type: String,
    default: ""
  },
  managerCell: {
    type: String,
    default: ""
  },
  managerEmail: {
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
