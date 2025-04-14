<template>
  <div class="senex__footer__left">
    <div class="senex__form__field">
      <div class="senex__form__field-add-on">
        <FilterIcon />
      </div>
      <input type="text"
             class="senex__form__input client-mgmt-unit-search"
             placeholder="Filter units..."
             name="units-filter"
             id="units_filter"
             v-model="search"
             @input="setUnitFilter(search)"
      />
      <div class="senex__form__field-add-on senex__form__field-add-on--button">
        <CancelIcon stroke="#2c3e50"
                    :disabled="search === ''"
                    @click.prevent="clearFilter"
        />
      </div>
    </div>
  </div>

  <div class="senex__footer__right"></div>
</template>

<script setup lang="ts">
import {useUnitStore} from "~/store/unit";
import FilterIcon from "~/components/icons/FilterIcon.vue";
import CancelIcon from "~/components/icons/CancelIcon.vue";

const {setUnitFilter} = useUnitStore();

const search = ref("");

const clearFilter = () => {
  search.value = "";
  setUnitFilter(search.value);
};
</script>
