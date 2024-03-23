<template>
  <div id="frmunit">
    <form id="unitForm" class="senex__form" method="post" >
      <fieldset class="senex__form__fieldset">
        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <input
                type="checkbox"
                id="form_unit_active"
                name="active"
                v-model="unit.active"
                :checked="unit.active"
                @click="setDirty(validation.active)"
            >
            Active
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field"
                 :class="{'senex__form__field--dirty': validation.complete_client_identifier.$dirty}"
            >
              <input
                  type="text"
                  name="complete_client_identifier"
                  id="form_unit_complete_client_identifier"
                  class="senex__form__input"
                  placeholder="Complete client identifier..."
                  v-model="unit.complete_client_identifier"
                  @keyup="setDirty(validation.complete_client_identifier)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_complete_client_identifier">
              Complete Client Identifier
            </label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.identifier.$dirty}">
              <input
                  type="text"
                  name="identifier"
                  id="form_unit_identifier"
                  class="senex__form__input"
                  placeholder="Identifier..."
                  v-model="unit.identifier"
                  @keyup="setDirty(validation.identifier)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_identifier">Identifier</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address.$dirty}">
              <input
                  type="text"
                  name="address"
                  id="form_unit_address"
                  class="senex__form__input"
                  placeholder="Unit Address..."
                  v-model="unit.address"
                  @keyup="setDirty(validation.address)"
                  autocomplete="true"
              />
            </div>
            <label class="senex__form__label" for="form_unit_address">Unit Address</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.address2.$dirty}">
              <input
                  type="text"
                  name="unit_address2"
                  id="form_unit_address2"
                  class="senex__form__input"
                  placeholder="Unit Address 2..."
                  v-model="unit.address2"
                  @keyup="setDirty(validation.address2)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_address2">Unit Address 2</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.state.$dirty}">
              <input
                  type="text"
                  name="state"
                  id="form_unit_state"
                  class="senex__form__input"
                  placeholder="State..."
                  v-model="unit.state"
                  @keyup="setDirty(validation.state)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_state">State</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.city.$dirty}">
              <input
                  type="text"
                  name="city"
                  id="form_unit_city"
                  class="senex__form__input"
                  placeholder="City..."
                  v-model="unit.city"
                  @keyup="setDirty(validation.city)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_city">City</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.zip.$dirty}">
              <input
                  type="text"
                  name="zip"
                  id="form_unit_zip"
                  class="senex__form__input"
                  placeholder="Zip..."
                  v-model="unit.zip"
                  @keyup="setDirty(validation.zip)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_zip">Zip</label>
          </div>
        </div>

        <div class="senex__form__item-group">
          <div class="senex__form__item">
            <div class="senex__form__field"
                 :class="{'senex__form__field--dirty': validation.pm_software_unit_id.$dirty}"
            >
              <input
                  type="text"
                  name="pm_software_unit_id"
                  id="form_unit_pm_software_unit_id"
                  class="senex__form__input"
                  placeholder="PM Software Unit ID..."
                  v-model="unit.pm_software_unit_id"
                  @keyup="setDirty(validation.pm_software_unit_id)"
              />
            </div>
            <label class="senex__form__label" for="form_unit_pm_software_unit_id">PM Software Unit ID</label>
          </div>
        </div>
      </fieldset>
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

const {activeProperty} = storeToRefs(usePropertyStore());

const {activeUnit, isNewUnit} = storeToRefs(useUnitStore());

const unit = ref<Unit>(<Unit>{})

const rules = {
  active: {
    dirty: false
  },
  complete_client_identifier: {
    dirty: false
  },
  identifier: {
    dirty: false
  },
  address: {
    dirty: false
  },
  address2: {
    dirty: false
  },
  city: {
    required: helpers.withMessage("The city field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  state: {
    required: helpers.withMessage("Required", required),
    $autoDirty: true,
    $lazy: true,
  },
  zip: {
    required: helpers.withMessage("The field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  pm_software_unit_id: {
    dirty: false
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

      console.log(unit.value);

      validation.value.$reset();
    } catch (error) {
      console.log(error);
    }
  }
});

const {setIsDirty} = useUnitStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}

watch(isNewUnit, async () => {
  if (isNewUnit.value) {
    unit.value = {
      id: undefined,
      active: true,
      address: "",
      address2: "",
      city: "",
      complete_client_identifier: "",
      identifier: "",
      pm_software_unit_id: 0,
      property_id: activeProperty.value ? activeProperty.value.id : 0,
      state: "",
      zip: "",
    };

    validation.value.$reset();
  }
});
</script>
