<template>
  <div class="senex__master-button-group">
    <div
        class="senex__master-button senex__master-button--cancel senex__clients__reset-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setIsDirty(false)">
      Reset
    </div>
    <div
        class="senex__master-button senex__master-button--save senex__clients__update-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setSaveProperty()"
    >
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";

const {isDirty} = storeToRefs(usePropertyStore());
const {
  setSaveProperty,
  setIsDirty
} = usePropertyStore();

const isDisabled = ref<boolean>(true);

watch(isDirty, async () => {
  console.log(isDirty.value);
  isDisabled.value = !isDirty.value;
});
</script>
