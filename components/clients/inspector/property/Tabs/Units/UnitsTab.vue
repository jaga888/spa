<template>
  <div class="senex__body property-units">
    <div v-if="units.length > 0">
      <div class="senex__form">
        <div class="senex__form__fieldset">
          <div class="senex__form__header">Official Unit List</div>
          <div class="senex__form__text">
            Please report any discrepancies.
          </div>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <select
                id="select_unit"
                class="senex__form__select"
                name="select_unit"
                v-model="selectedUnitId"
                @change="setActiveUnit({id: selectedUnitId})"
            >
              <Unit :unit="{id: 0, address: 'Select Unit', active: true}"/>
              <Unit v-for="unit in units" :unit="unit"/>
            </select>
          </div>
          <label class="senex__form__label" for="select_unit">Unit</label>
        </div>
      </div>
    </div>

    <div class="senex__form" v-else>
      <div class="senex__form__fieldset">
        <div class="senex__form__header">Official Unit List</div>
        <div class="senex__form__text">
          We currently do not have a unit list for this Property.
        </div>
      </div>
    </div>

    <div class="senex__form senex__strip">
      <div class="senex__strip__right">
        <Button class="senex__button" id="import_new" @click="importUnit = true">Import Unit</Button>
        <Button class="senex__button" id="add_new" @click.prevent="setIsNewUnit">Add New Unit</Button>
      </div>
    </div>

    <Import v-if="importUnit" :activePropertyId="activeProperty?.id" v-model:importUnit="importUnit"/>
    <UnitForm v-if="activeUnit || isNewUnit" />
  </div>
</template>

<script setup lang="ts">
import {unitService} from "~/services/unit/service";
import {usePropertyStore} from "~/store/property";
import {useUnitStore} from "~/store/unit";
import type {UnitList} from "~/services/unit/types";
import Unit from "~/components/clients/inspector/property/Tabs/Units/Unit.vue";
import Import from "~/components/clients/inspector/property/Tabs/Units/Import.vue";
import UnitForm from "~/components/clients/inspector/property/Tabs/Units/UnitForm.vue";

const {activeProperty} = storeToRefs(usePropertyStore());
const {activeUnit, isNewUnit} = storeToRefs(useUnitStore());
const units = ref<Array<UnitList>>(<Array<UnitList>>[]);
const importUnit = ref<boolean>(false);

const {setActiveUnit, setIsNewUnit} = useUnitStore();
const selectedUnitId = ref(0);

if (activeProperty.value) {
  try {
    units.value = (await unitService.getUnits({
      "filter[property_id]": activeProperty.value.id,
      sort: "-active,address",
    }));

    console.log(units.value);
  } catch (error) {
    console.log(error);
  }
}

setActiveUnit(undefined)

</script>
