<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Location</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.$dirty}">
            <input
                id="form_property_address"
                type="text"
                name="address"
                class="senex__form__input"
                placeholder="Address..."
                @input="$emit('update:address', ($event.target as HTMLInputElement).value)"
                :value="address"
                @keyup="setDirty(validation.address)"
                autocomplete="off"
            />
          </div>
          <label class="senex__form__label" for="form_property_address">Address</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.city.$dirty}">
            <input
                id="form_property_city"
                type="text"
                name="city"
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
          <label class="senex__form__label" for="form_property_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.state.$dirty}">
            <input
                id="form_property_state"
                type="text"
                name="state"
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
          <label class="senex__form__label" for="form_property_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.zip.$dirty}">
            <input
                id="form_property_zip"
                type="text"
                name="zip"
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
          <label class="senex__form__label" for="form_property_zip">Zip</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <select id="form_property_court_id"
                    name="court_id"
                    class="senex__form__select"
                    @input="$emit('update:courtId', parseInt(($event.target as HTMLInputElement).value))"
                    :value="courtId"
                    @change="setDirty(validation?.court_id)"
            >
              <Court v-for="court in courts" :court="court"/>
            </select>
          </div>
          <label class="senex__form__label" for="form_property_court_id">Jurisdiction</label>
        </div>
      </div>

      <div class="senex__form__header">Default Unit Address</div>
      <div class="senex__form__text">
        These defaults are used for when creating a new claim.
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <input id="form_property_same_address_default_unit"
                 name="same_address_default_unit"
                 class="senex__clients__same-address-default-unit"
                 type="checkbox"
          />
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_default_unit"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.default_unit_city.$dirty}">
            <input id="form_property_default_unit_city"
                   type="text"
                   name="default_unit_city"
                   class="senex__form__input"
                   placeholder="City..."
                   @input="$emit('update:defaultUnitCity', ($event.target as HTMLInputElement).value)"
                   :value="defaultUnitCity"
                   @keyup="setDirty(validation.default_unit_city)"
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.default_unit_state.$dirty}">
            <input id="form_property_default_unit_state"
                   type="text"
                   name="default_unit_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   @input="$emit('update:defaultUnitState', ($event.target as HTMLInputElement).value)"
                   :value="defaultUnitState"
                   @keyup="setDirty(validation.default_unit_state)"
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.default_unit_zip.$dirty}">
            <input id="form_property_default_unit_zip"
                   type="text"
                   name="default_unit_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   @input="$emit('update:defaultUnitZip', ($event.target as HTMLInputElement).value)"
                   :value="defaultUnitZip"
                   @keyup="setDirty(validation.default_unit_zip)"
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_zip">Zip</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";
import type {Court as CourtType} from "~/services/court/types";
import Court from "~/components/clients/inspector/property/Tabs/Information/fieldset/Court.vue";

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
  courtId: {
    type: Number,
    default: 0
  },
  defaultUnitCity: {
    type: String,
    default: ""
  },
  defaultUnitState: {
    type: String,
    default: ""
  },
  defaultUnitZip: {
    type: String,
    default: ""
  },
  courts: {
    type: Array<CourtType>,
    default: [],
  },
  validation: {
    type: Object as PropType<Validation<Property>>,
    default: <Validation<Property>>{}
  },
});

const {setIsDirty} = usePropertyStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};
</script>
