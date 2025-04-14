<template>
  <div class="senex__master-button-group">
    <div
        class="senex__master-button senex__master-button--cancel senex__clients__reset-info"
        @click.prevent="cancelNote"
    >
      Cancel
    </div>
    <div
        class="senex__master-button senex__master-button--save senex__clients__update-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setSaveNote()"
    >
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import {useNoteStore} from "~/store/note";

const {isDirty} = storeToRefs(useNoteStore());

const {setSaveNote, setActiveNote, setIsNewNote} = useNoteStore();

const isDisabled = ref<boolean>(true);

watch(isDirty, async () => {
  console.log(isDirty.value);
  isDisabled.value = !isDirty.value;
});

const cancelNote = () => {
  setActiveNote();
  setIsNewNote(false);
}
</script>
