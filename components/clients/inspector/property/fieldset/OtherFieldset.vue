<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Other Information</legend>
    <div class="senex__form__block">
      <div class="senex__form__header">Property Mangement Software</div>
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <select id="form_property_pm_software_id"
                    name="pm_software_id"
                    class="senex__form__select"
                    @input="$emit('update:pmSoftwareId', parseInt(($event.target as HTMLInputElement).value))"
                    :value="pmSoftwareId"
                    @change="setDirty(validation?.pm_software_id)"
            >
              <PmSoftware v-for="pmSoftware in pmSoftwares" :pmSoftware="pmSoftware"/>
            </select>
          </div>
          <label class="senex__form__label" for="form_property_pm_software_id">PM Software</label>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input id="form_property_unit_count"
                   type="text"
                   name="unit_count"
                   class="senex__form__input"
                   placeholder="Unit Count..."
                   :value="unitCount"
                   readonly
            />
          </div>
          <label class="senex__form__label" for="form_property_unit_count">Unit Count</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {type Validation} from "@vuelidate/core";
import {usePropertyStore} from "~/store/property";
import type {PmSoftwareList} from "~/services/pm_software/types";
import {pmSoftwareService} from "~/services/pm_software/service";
import type {Property} from "~/services/property/types";
import PmSoftware from "~/components/clients/inspector/property/fieldset/PmSoftware.vue";

defineProps({
  pmSoftwareId: {
    type: Number,
  },
  unitCount: {
    type: Number,
    default: 0
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

const pmSoftwares = ref<PmSoftwareList[]>([])

try {
  pmSoftwares.value = (await pmSoftwareService.getPmSoftwares({sort: 'order'}))

  console.log(pmSoftwares.value)
} catch (error) {
  console.log(error)
}
</script>
