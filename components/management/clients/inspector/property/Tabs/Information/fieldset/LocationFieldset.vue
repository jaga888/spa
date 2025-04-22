<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Location</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.address.address}">
            <input
                id="form_property_address_address"
                type="text"
                name="property_address_address"
                class="senex__form__input"
                placeholder="Address..."
                v-model="address.address"
                @keyup="setDirty('address', 'address')"
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
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.address.city}">
            <input
                id="form_property_address_city"
                type="text"
                name="property_address_city"
                class="senex__form__input"
                placeholder="City..."
                v-model="address.city"
                @keyup="setDirty('city', 'address')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.city.required.$invalid">
            {{ validation.address.city.required.$message }}
          </span><br v-if="validation.address.city.required.$invalid">
          <label class="senex__form__label" for="form_property_address_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.address.state}">
            <input
                id="form_property_address_state"
                type="text"
                name="property_address_state"
                class="senex__form__input"
                placeholder="ST..."
                v-model="address.state"
                @keyup="setDirty('state', 'address')"
            />
          </div>
          <span class="error" style="color: red" v-if="validation.address.state.required.$invalid">
                {{ validation.address.state.required.$message }}
              </span><br v-if="validation.address.state.required.$invalid">
          <label class="senex__form__label" for="form_property_address_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.address.zip}">
            <input
                id="form_property_address_zip"
                type="number"
                name="zip"
                class="senex__form__input"
                placeholder="Zip..."
                v-model="address.zip"
                @keyup="setDirty('zip', 'address')"
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
                    name="property_court_id"
                    class="senex__form__select"
                    v-model="courtId"
                    @change="!isDirty ? setIsDirty() : false"
            >
              <Court v-for="court in courts" :court="court"/>
            </select>
          </div>
          <span class="error" style="color: red" v-if="validation.court_id.required.$invalid">
            {{ validation.court_id.required.$message }}
          </span><br v-if="validation.court_id.required.$invalid">
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
                 name="property_same_address_default_unit"
                 class="senex__clients__same-address-default-unit"
                 type="checkbox"
                 v-model="useDefaultUnitAddress"
                 @change="changeUseDefaultUnitAddress"
          />
          Same as Property Address
        </div>
        <label class="senex__form__label" for="form_property_same_address_default_unit"></label>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item senex__form__item--flex-5">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.defaultUnitCity}">
            <input id="form_property_default_unit_city"
                   type="text"
                   name="property_default_unit_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="address.city"
                   readonly
                   v-if="useDefaultUnitAddress"
            />
            <input id="form_property_default_unit_city"
                   type="text"
                   name="property_default_unit_city"
                   class="senex__form__input"
                   placeholder="City..."
                   v-model="defaultUnitCity"
                   @keyup="setDirty('defaultUnitCity')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_city">City</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-1">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.defaultUnitState}">
            <input id="form_property_default_unit_state"
                   type="text"
                   name="property_default_unit_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="address.state"
                   readonly
                   v-if="useDefaultUnitAddress"
            />
            <input id="form_property_default_unit_state"
                   type="text"
                   name="property_default_unit_state"
                   class="senex__form__input"
                   placeholder="ST..."
                   v-model="defaultUnitState"
                   @keyup="setDirty('defaultUnitState')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_state">ST</label>
        </div>

        <div class="senex__form__item senex__form__item--flex-2">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyPropertyColumns.defaultUnitZip}">
            <input id="form_property_default_unit_zip"
                   type="number"
                   name="property_default_unit_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="address.zip"
                   readonly
                   v-if="useDefaultUnitAddress"
            />
            <input id="form_property_default_unit_zip"
                   type="number"
                   name="property_default_unit_zip"
                   class="senex__form__input"
                   placeholder="Zip..."
                   v-model="defaultUnitZip"
                   @keyup="setDirty('defaultUnitZip')"
                   v-else
            />
          </div>
          <label class="senex__form__label" for="form_property_default_unit_zip">Zip</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation, type ValidationArgs} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";
import type {Court as CourtType} from "~/services/court/types";
import Court from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/Court.vue";
import type {Address} from "~/services/address/types";
import {courtService} from "~/services/court/service";

const address = defineModel<Address>("address", {
  required: true,
});

const courtId = defineModel<number>("courtId", {
  default: 0
});

const defaultUnitCity = defineModel<string>("defaultUnitCity", {
  default: ""
});

const defaultUnitState = defineModel<string>("defaultUnitState", {
  default: ""
});

const defaultUnitZip = defineModel<string>("defaultUnitZip", {
  default: ""
});

const useDefaultUnitAddress = defineModel<boolean>("useDefaultUnitAddress", {
  default: false
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

const {isDirty} = storeToRefs(usePropertyStore());

const {setIsDirty} = usePropertyStore();

const courts = ref<Array<CourtType>>([]);

const setDirty = (column: string, address?: string) => {
  address ? props.dirtyPropertyColumns[address][column] = true : props.dirtyPropertyColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};

const changeUseDefaultUnitAddress = () => {

  if (useDefaultUnitAddress.value) {
    setDirty("defaultUnitCity");

    setDirty("defaultUnitState");

    setDirty("defaultUnitZip");
  }
};

try {
  courts.value = (await courtService.getCourts());
} catch (error) {
  console.log(error);
}
</script>
