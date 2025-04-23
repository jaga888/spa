<template>
  <div id="frmunit">
    <form id="unitForm" class="senex__form" method="post">
      <fieldset class="senex__form__fieldset">
        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <input
                type="checkbox"
                id="form_unit_active"
                name="active"
                v-model="unit.active"
                :checked="unit.active"
                @click="setDirty('active')"
            >
            Active
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field"
                 :class="{'senex__form__field--dirty': dirtyUnitColumns.complete_client_identifier}"
            >
              <input
                  type="text"
                  name="complete_client_identifier"
                  id="form_unit_complete_client_identifier"
                  class="senex__form__input"
                  placeholder="Complete client identifier..."
                  v-model="unit.complete_client_identifier"
                  @keyup="setDirty('complete_client_identifier')"
              />
            </div>
            <label class="senex__form__label" for="form_unit_complete_client_identifier">
              Complete Client Identifier
            </label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.identifier}">
              <input
                  type="text"
                  name="identifier"
                  id="form_unit_identifier"
                  class="senex__form__input"
                  placeholder="Identifier..."
                  v-model="unit.identifier"
                  @keyup="setDirty('identifier')"
              />
            </div>
            <label class="senex__form__label" for="form_unit_identifier">Identifier</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.address.address}">
              <input
                  type="text"
                  name="unit_address_address"
                  id="form_unit_address"
                  class="senex__form__input"
                  placeholder="Unit Address..."
                  v-model="unit.address.address"
                  @keyup="setDirty('address', 'address')"
                  autocomplete="true"
              />
            </div>
            <span class="error" style="color: red" v-if="validation.address.address.required.$invalid">
              {{ validation.address.address.required.$message }}
            </span><br v-if="validation.address.address.required.$invalid">
            <label class="senex__form__label" for="form_unit_address">Unit Address</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.address2}">
              <input
                  type="text"
                  name="unit_address2"
                  id="form_unit_address2"
                  class="senex__form__input"
                  placeholder="Unit Address 2..."
                  v-model="unit.address2"
                  @keyup="setDirty('address2')"
              />
            </div>
            <label class="senex__form__label" for="form_unit_address2">Unit Address 2</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.address.state}">
              <input
                  type="text"
                  name="state"
                  id="form_unit_state"
                  class="senex__form__input"
                  placeholder="State..."
                  v-model="unit.address.state"
                  @keyup="setDirty('state', 'address')"
              />
            </div>
            <span class="error" style="color: red" v-if="validation.address.state.required.$invalid">
              {{ validation.address.state.required.$message }}
            </span><br v-if="validation.address.state.required.$invalid">
            <label class="senex__form__label" for="form_unit_state">State</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.address.city}">
              <input
                  type="text"
                  name="city"
                  id="form_unit_city"
                  class="senex__form__input"
                  placeholder="City..."
                  v-model="unit.address.city"
                  @keyup="setDirty('city', 'address')"
              />
            </div>
            <span class="error" style="color: red" v-if="validation.address.city.required.$invalid">
              {{ validation.address.city.required.$message }}
            </span><br v-if="validation.address.city.required.$invalid">
            <label class="senex__form__label" for="form_unit_city">City</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': dirtyUnitColumns.address.zip}">
              <input
                  type="text"
                  name="zip"
                  id="form_unit_zip"
                  class="senex__form__input"
                  placeholder="Zip..."
                  v-model="unit.address.zip"
                  @keyup="setDirty('zip', 'address')"
              />
            </div>
            <span class="error" style="color: red" v-if="validation.address.zip.required.$invalid">
              {{ validation.address.zip.required.$message }}
            </span><br v-if="validation.address.zip.required.$invalid">
            <label class="senex__form__label" for="form_unit_zip">Zip</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field"
                 :class="{'senex__form__field--dirty': dirtyUnitColumns.pm_software_unit_id}"
            >
              <input
                  type="text"
                  name="pm_software_unit_id"
                  id="form_unit_pm_software_unit_id"
                  class="senex__form__input"
                  placeholder="PM Software Unit ID..."
                  v-model="unit.pm_software_unit_id"
                  @keyup="setDirty('pm_software_unit_id')"
              />
            </div>
            <label class="senex__form__label" for="form_unit_pm_software_unit_id">PM Software Unit ID</label>
          </div>
        </div>
      </fieldset>
      <div class="senex__footer senex__strip">
        <div class="senex__strip__left">
          <UnitButtons/>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {unitService} from "~/services/unit/service";
import type {Unit} from "~/services/unit/types";
import {useUnitStore} from "~/store/unit";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import UnitButtons from "~/components/management/clients/inspector/property/UnitButtons.vue";

const {activeProperty} = storeToRefs(usePropertyStore());
const {
  activeUnit,
  isNewUnit,
  isDirty,
  saveUnit
} = storeToRefs(useUnitStore());
const {
  setSaveUnit,
  setIsDirty
} = useUnitStore();
const unit = ref<Unit>(<Unit>{});

const rules = {
  address: {
    address: {
      required: helpers.withMessage("The address field is required", required),
      $lazy: true,
    },
    city: {
      required: helpers.withMessage("The city field is required", required),
      $lazy: true,
    },
    state: {
      required: helpers.withMessage("The state field is required", required),
      $lazy: true,
    },
    zip: {
      required: helpers.withMessage("The zip field is required", required),
      $lazy: true,
    },
  },
};

const validation = useVuelidate(
    rules,
    unit
);

watch(activeUnit, async () => {
  if (activeUnit.value) {
    try {
      unit.value = (await unitService.getUnit(activeUnit.value.id));

      if (!unit.value.address) {
        unit.value.address = {
          address: "",
          city: "",
          state: "",
          zip: "",
        };
      }

      validation.value.$reset();
    } catch (error) {
      console.log(error);
    }
  }
});

if (activeUnit.value) {
  try {
    unit.value = (await unitService.getUnit(activeUnit.value.id));

    if (!unit.value.address) {
      unit.value.address = {
        address: "",
        city: "",
        state: "",
        zip: "",
      };
    }

    validation.value.$reset();
  } catch (error) {
    console.log(error);
  }
}

const props = defineProps({
  dirtyUnitColumns: {
    type: Object,
    default: {
      active: false,
      address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      address2: false,
      complete_client_identifier: false,
      identifier: false,
      pm_software_unit_id: false,
    }
  }
});

const setDirty = (column: string, address?: string, element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  address ? props.dirtyUnitColumns[address][column] = true : props.dirtyUnitColumns[column] = true;

  !isDirty.value ? setIsDirty() : false;
};

watch(isNewUnit, async () => {
  if (isNewUnit.value) {
    unit.value = {
      id: undefined,
      active: true,
      address: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      address2: "",
      complete_client_identifier: "",
      identifier: "",
      pm_software_unit_id: 0,
      property_id: activeProperty.value ? activeProperty.value.id : 0,
    };

    validation.value.$reset();
  }
});

watch(isDirty, async () => {
  if (!isDirty.value && activeUnit.value) {
    try {
      unit.value = (await unitService.getUnit(activeUnit.value.id));

      if (!unit.value.address) {
        unit.value.address = {
          address: "",
          city: "",
          state: "",
          zip: "",
        };
      }

      validation.value.$reset();
    } catch (error) {
      console.log(error);
    }
  }
});

watch(saveUnit, async () => {
  if (saveUnit.value) {
    const isFormCorrect = await validation.value.$validate();
    if (isFormCorrect) {
      if (unit.value.id) {
        try {
          unit.value = (await unitService.updateUnit(unit.value.id, unit.value));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          unit.value = (await unitService.createUnit(unit.value));
        } catch (error) {
          console.log(error);
        }
      }
    }

    setSaveUnit(false);
  }
});
</script>
