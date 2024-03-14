<template>
  <fieldset class="senex__form__fieldset">
    <div class="senex__form__block">
      <div class="senex__form__header">Legal Name</div>

      <div class="senex__form__text">
        The Legal Name is used on most documents.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.legal_name.$dirty}">
            <input id="form_property_legal_name"
                   type="text"
                   name="legal_name"
                   class="senex__form__input"
                   placeholder="Legal Name..."
                   @input="$emit('update:legalName', ($event.target as HTMLInputElement).value)"
                   :value="legalName"
                   @keyup="setDirty(validation.legal_name)"
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.name.$dirty}">
            <input
                id="form_property_name"
                type="text"
                name="name"
                class="senex__form__input"
                placeholder="Name..."
                @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
                :value="name"
                @keyup="setDirty(validation.name)"
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.short_name.$dirty}">
            <input
                id="form_property_short_name"
                type="text"
                name="short_name"
                class="senex__form__input"
                placeholder="Nickname..."
                @input="$emit('update:shortName', ($event.target as HTMLInputElement).value)"
                :value="shortName"
                @keyup="setDirty(validation.short_name)"
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.client_property_id.$dirty}">
            <input
                id="form_property_client_property_id"
                type="text"
                name="client_property_id"
                class="senex__form__input"
                placeholder="Client Property Id..."
                @input="$emit('update:shortName', ($event.target as HTMLInputElement).value)"
                :value="clientPropertyId"
                @keyup="setDirty(validation.client_property_id)"
                required
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
import type {Validation} from "@vuelidate/core";
import type {Property} from "~/services/property/types";

defineProps({
  legalName: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  shortName: {
    type: String,
    default: ""
  },
  clientPropertyId: {
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
