<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Location</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.address.address.$dirty}">
            <input
                id="form_property_address_address"
                type="text"
                name="property_address_address"
                class="senex__form__input"
                placeholder="Address..."
                @input="$emit('update:address.address', ($event.target as HTMLInputElement).value)"
                :value="address.address"
                @keyup="setDirty(validation.address.address)"
            />
          </div>
          <label class="senex__form__label" for="form_property_address_address">Address</label>
          <br v-if="validation.address.address.required.$invalid">
          <span class="error" style="color: red" v-if="validation.address.address.required.$invalid">
                {{ validation.address.address.required.$message }}
          </span>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field"
               :class="{'senex__form__field--dirty': validation.address.city.$dirty}">
            <input
                id="form_property_address_city"
                type="text"
                name="property_address_city"
                class="senex__form__input"
                placeholder="City..."
                @input="$emit('update:address.city', ($event.target as HTMLInputElement).value)"
                :value="address.city"
                @keyup="setDirty(validation.address.city)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.city.required.$invalid">
            {{ validation.address.city.required.$message }}
          </span><br v-if="validation.address.city.required.$invalid">
          <label class="senex__form__label" for="form_property_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.state.$dirty}">
            <input
                id="form_property_address_state"
                type="text"
                name="property_address_state"
                class="senex__form__input"
                placeholder="ST..."
                @input="$emit('update:address.state', ($event.target as HTMLInputElement).value)"
                :value="address.state"
                @keyup="setDirty(validation.address.state)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.state.required.$invalid">
                {{ validation.address.state.required.$message }}
              </span><br v-if="validation.address.state.required.$invalid">
          <label class="senex__form__label" for="form_property_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.zip.$dirty}">
            <input
                id="form_property_address_zip"
                type="text"
                name="zip"
                class="senex__form__input"
                placeholder="Zip..."
                @input="$emit('update:address.zip', ($event.target as HTMLInputElement).value)"
                :value="address.zip"
                @keyup="setDirty(validation.address.zip)"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.zip.required.$invalid">
                {{ validation.address.zip.required.$message }}
              </span><br v-if="validation.address.zip.required.$invalid">
          <label class="senex__form__label" for="form_property_address_zip">Zip</label>
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
import Court from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/Court.vue";
import type {Address} from "~/services/address/types";

defineProps({
  address: {
    type: Object as PropType<Address>,
    default: <Address>{}
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
