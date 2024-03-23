<template>
  <div class="senex__body senex__form">

    <div class="senex__form__header">Notes</div>

    <div class="senex__form__text">
      <a href="#" class="senex__clients__create-note">
        Add Note...
      </a>
    </div>

    <div class="senex__accordion">
      <p v-if="notes.length === 0">No notes</p>
      <Note class="senex__form__fieldset senex__note senex__accordion__item" v-for="note in notes" :note="note" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";
import type {NoteList} from "~/services/note/types";
import {noteService} from "~/services/note/service";
import Note from "~/components/clients/inspector/property/Tabs/Notes/Note.vue";

const {activeProperty} = storeToRefs(usePropertyStore());

const notes = ref<Array<NoteList>>(<Array<NoteList>>[]);

if (activeProperty.value) {
  try {
    notes.value = (await noteService.getNotes({
      "filter[scoped_id]": activeProperty.value.id,
      "filter[scoped_type]": 'property',
      sort: "-created_at",
    }));

    console.log(notes.value);
  } catch (error) {
    console.log(error);
  }
}
</script>
