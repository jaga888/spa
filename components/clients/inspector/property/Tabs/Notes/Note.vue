<template>
  <div>
    <legend class="senex__form__legend">{{ note.title }}</legend>
    <div class="senex__form__block">
      <MDC class="senex__markdown" :value="note.content"/>
    </div>

    <div class="senex__form__block">
      <div class="senex__form__text">
        <a class="senex__link senex__clients__edit-note">Edit Note</a>
        <a style="float: right;" class="senex__link senex__link--danger senex__clients__delete-note">Delete Note</a>
      </div>
      <div class="senex__form__text">
        <span style="vertical-align: text-bottom; font-size: 0.6rem;" :style="{'color': note.color}">&#11044;</span>
        <span v-if="note.is_published">
          Note is <strong>Published</strong> for
          <em v-if="note.processing_type_id">{{note.processing_type?.plural_name}}</em>
          <em v-else>All Processing Types.</em>
        </span>
        <span v-else>
          Note is <strong>Not Published</strong>.
        </span>
      </div></div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {NoteList} from "~/services/note/types";

defineProps({
  note: {
    type: Object as PropType<NoteList>,
    default: <NoteList>{}
  },
})
</script>
