<template>
  <fieldset class="senex__form__fieldset">
    <div class="senex__form__block">
      <div class="senex__form__header">Legal Name</div>

      <div class="senex__form__text">
        The full Legal Name of the client company.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.legal_name.$dirty}">
            <input id="form_company_legal_name"
                   type="text"
                   name="legal_name"
                   class="senex__form__input"
                   placeholder="Legal Name..."
                   @input="$emit('update:legalName', $event.target.value)"
                   :value="legalName"
                   @keyup="setDirty(validation.legal_name)"
            />
          </div>

          <span class="error" style="color: red" v-if="validation.legal_name.required.$invalid">
            {{ validation.legal_name.required.$message }}
          </span><br v-if="validation.legal_name.required.$invalid">
          <label class="senex__form__label" for="form_company_legal_name">Legal Name</label>
        </div>
      </div>

      <div class="senex__form__header">Name</div>

      <div class="senex__form__text">
        The name of the client.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.name.$dirty}">
            <input
                id="form_company_name"
                type="text"
                name="name"
                class="senex__form__input"
                placeholder="Name..."
                @input="$emit('update:name', $event.target.value)"
                :value="name"
                @keyup="setDirty(validation.name)"
                autocomplete="off"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.name.required.$invalid">
            {{ validation.name.required.$message }}
          </span><br v-if="validation.name.required.$invalid">
          <label class="senex__form__label" for="form_company_name">Name</label>
        </div>
      </div>

      <div class="senex__form__header">Identifier</div>
      <div class="senex__form__text">
        The short name of the client.
      </div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.short_name.$dirty}">
            <input
                id="form_company_short_name"
                type="text"
                name="short_name"
                class="senex__form__input"
                placeholder="Short Name..."
                @input="$emit('update:shortName', $event.target.value)"
                :value="shortName"
                @keyup="setDirty(validation.short_name)"
                required
            />
          </div>
          <span class="error" style="color: red" v-if="validation.short_name.required.$invalid">
            {{ validation.short_name.required.$message }}
          </span><br v-if="validation.short_name.required.$invalid">
          <label class="senex__form__label" for="form_company_short_name">Identifier</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import type {Validation} from "@vuelidate/core";
import type {Company} from "~/services/company/types";

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
  validation: {
    type: Object as PropType<Validation<Company>>,
    default: <Validation<Company>>{}
  },
})

const {setIsDirty} = useCompanyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}
</script>
