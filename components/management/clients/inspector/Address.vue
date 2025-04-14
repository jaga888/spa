<template>
  <div class="senex__form__block">
    <div class="senex__form__item-group">
      <div class="senex__form__item">
        <div class="senex__form__field"
             :class="{'senex__form__field--dirty': validation.address.$dirty}">
          <input
              id="form_company_address_address"
              type="text"
              name="mailing-address-address"
              class="senex__form__input"
              placeholder=".."
              @input="$emit('update:address', ($event.target as HTMLInputElement).value)"
              :value="address"
              @keyup="setDirty(validation.address)"
          />
        </div>
        <label class="senex__form__label" for="form_company_address_address">Address</label>
        <br v-if="validation.address.required.$invalid">
        <span class="error" style="color: red" v-if="validation.address.required.$invalid">
                {{ validation.address.required.$message }}
          </span>
      </div>
    </div>

    <div class="senex__form__item-group">
      <div class="senex__form__item senex__form__item--flex-5">
        <div class="senex__form__field"
             :class="{'senex__form__field--dirty': validation.city.$dirty}">
          <input
              id="form_company_address_city"
              type="text"
              name="mailing-address-city"
              class="senex__form__input"
              placeholder="City..."
              @input="$emit('update:city', ($event.target as HTMLInputElement).value)"
              :value="city"
              @keyup="setDirty(validation.city)"
          />
        </div>
        <span class="error" style="color: red" v-if="validation.city.required.$invalid">
                {{ validation.city.required.$message }}
          </span><br v-if="validation.city.required.$invalid">
        <label class="senex__form__label" for="form_company_address_city">City</label>
      </div>

      <div class="senex__form__item senex__form__item--flex-1">
        <div class="senex__form__field"
             :class="{'senex__form__field--dirty': validation.state.$dirty}">
          <input
              id="form_company_address_state"
              type="text"
              name="mailing-address-state"
              class="senex__form__input"
              placeholder="ST..."
              @input="$emit('update:state', ($event.target as HTMLInputElement).value)"
              :value="state"
              @keyup="setDirty(validation.state)"
          />
        </div>
        <span class="error" style="color: red" v-if="validation.state.required.$invalid">
                {{ validation.state.required.$message }}
          </span><br v-if="validation.state.required.$invalid">
        <label class="senex__form__label" for="form_company_address_state">ST</label>
      </div>

      <div class="senex__form__item senex__form__item--flex-2">
        <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.zip.$dirty}">
          <input
              id="form_company_address_zip"
              type="text"
              name="mailing-address-zip"
              class="senex__form__input"
              placeholder="Zip..."
              @input="$emit('update:zip', ($event.target as HTMLInputElement).value)"
              :value="zip"
              @keyup="setDirty(validation.zip)"
          />
        </div>
        <span class="error" style="color: red" v-if="validation.zip.required.$invalid">
                {{ validation.zip.required.$message }}
          </span><br v-if="validation.zip.required.$invalid">
        <label class="senex__form__label" for="form_company_address_zip">Zip</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Company} from "~/services/company/types";
import type {Validation} from "@vuelidate/core";
import {useCompanyStore} from "~/store/company";

defineProps({
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  zip: {
    type: String,
    default: ""
  },
  validation: {
    type: Object as PropType<Validation<Company>>,
    default: <Validation<Company>>{}
  },
});

const {setIsDirty} = useCompanyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};
</script>
