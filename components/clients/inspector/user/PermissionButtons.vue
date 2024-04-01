<template>
  <div class="senex__master-button-group">
    <div
        class="senex__master-button senex__master-button--cancel senex__clients__reset-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setIsDirty(false)"
    >
      Reset
    </div>
    <div
        class="senex__master-button senex__master-button--save senex__clients__update-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setSaveUser()"
    >
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";

const {isDirty} = storeToRefs(useUserStore());
const {
  setSaveUser,
  setIsDirty
} = useUserStore();

const isDisabled = ref<boolean>(true);

watch(isDirty, async () => {
  isDisabled.value = !isDirty.value;
});
</script>
