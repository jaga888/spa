<template>
  <form class="senex__form senex__note__form" action="/api/admin/notes" method="POST">
    <legend class="senex__form__header">{{ isNewNote ? 'Add Note' : 'Edit Note' }}</legend>
    <div class="senex__form__text">
      Note title will not be displayed on processing pages and is for reference only.
    </div>

    <div class="senex__form__item-group">
      <div class="senex__form__item">
        <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.title.$dirty}">
          <input id="form_note_title"
                 type="text"
                 name="title"
                 class="senex__form__input"
                 placeholder="Title..."
                 v-model="note.title"
                 @keyup="setDirty(validation.title)"
          />
        </div>
        <label class="senex__form__label" for="form_note_title">Title</label>
      </div>
    </div>

    <div class="senex__form__header">
      Publish Note
    </div>

    <div class="senex__form__text">
      Published notes will display in the sidebar of Senex Server, optionally limited for a specific processing type.
    </div>

    <div class="senex__form__item-group">
      <div class="senex__form__item">
        <input id="form_note_is_published"
               name="is_published"
               type="checkbox"
               v-model="note.is_published"
               :checked="note.is_published"
               @click="setDirty(validation.is_published)"
        />
        Publish note for
      </div>
      <div class="senex__form__item">
        <div class="senex__form__field">
          <select id="form_note_processing_type_id"
                  name="processing_type_id"
                  class="senex__form__select"
                  required
                  v-model="note.processing_type_id"
                  @change="setDirty(validation.processing_type_id)"
          >
            <ProcessingTypeComponent :processingType="{id: 0, name: 'All processing types'}"/>
            <ProcessingTypeComponent v-for="processingType in processingTypes" :processingType="processingType"/>
          </select>
        </div>
        <label class="senex__form__label">Processing Type</label>
      </div>
    </div>

    <div class="senex__form__text">
      Published notes can be given a highlight color for emphasis.
    </div>
    <div class="senex__form__item-group">
      <div class="senex__form__item">
        <div class="senex__form__field">
          <div class="senex__swatch-picker">
            <input id="form_note_color"
                   name="color"
                   type="hidden"
                   v-model="note.color"
                   @change="setDirty(validation.color)"
            />
            <Color class="senex__swatch-picker__selected" :data-color="note.color" />
            <Color class="senex__swatch-picker__swatch"
                   :data-color="color"
                   v-for="color in colors"
                   @click="note.color = color"
            />
          </div>
        </div>
        <label class="senex__form__label">Color</label>
      </div>
    </div>
    <div class="senex__form__header">
      Note Content
    </div>
    <div class="senex__form__text">
      Markdown formatting is supported.
    </div>
    <MdEditor v-model="note.content" language="en-US"/>
  </form>
</template>

<script setup lang="ts">
import type {Note} from "~/services/note/types";
import {useUnitStore} from "~/store/unit";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {noteService} from "~/services/note/service";
import {useNoteStore} from "~/store/note";
import {processingTypeService} from "~/services/processing_type/service";
import type {ProcessingType} from "~/services/processing_type/types";
import ProcessingTypeComponent from "~/components/clients/inspector/property/Tabs/Notes/ProcessingTypeComponent.vue";
import Color from "~/components/clients/inspector/property/Tabs/Notes/Color.vue";
import {MdEditor} from "md-editor-v3";
import 'md-editor-v3/lib/style.css';

const {
  activeNote,
  isNewNote
} = storeToRefs(useNoteStore());

const note = ref<Note>(<Note>{
  id: undefined,
  title: "",
  is_published: true,
  processing_type_id: 0,
  color: "",
  content: "",
});

const rules = {
  title: {
    dirty: false
  },
  is_published: {
    dirty: false
  },
  processing_type_id: {
    dirty: false,
  },
  color: {
    dirty: ""
  },
  content: {
    required: helpers.withMessage("The city field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
};

const validation = useVuelidate(
    rules,
    note
);

const processingTypes = ref<ProcessingType[]>([]);

watch(activeNote, async () => {
  if (activeNote.value) {
    try {
      note.value = (await noteService.getNote(activeNote.value.id));

      console.log(note.value);

      validation.value.$reset();

      processingTypes.value = (await processingTypeService.getProcessingTypes({
        sort: "name"
      }));

      console.log(processingTypes.value);
    } catch (error) {
      console.log(error);
    }
  }
});

if (activeNote.value) {
  try {
    note.value = (await noteService.getNote(activeNote.value.id));

    console.log(note.value);

    validation.value.$reset();

    processingTypes.value = (await processingTypeService.getProcessingTypes({
      sort: "name"
    }));

    console.log(processingTypes.value);
  } catch (error) {
    console.log(error);
  }
}

const {setIsDirty} = useUnitStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};

processingTypes.value = (await processingTypeService.getProcessingTypes({
  sort: "name"
}));

console.log(processingTypes.value);

watch(isNewNote, async () => {
  if (isNewNote.value) {
    note.value = {
      id: undefined,
      title: "",
      is_published: true,
      processing_type_id: 0,
      color: "",
      content: "",
    };

    validation.value.$reset();

    processingTypes.value = (await processingTypeService.getProcessingTypes({
      sort: "name"
    }));

    console.log(processingTypes.value);
  }
});

const colors = ref([
  "transparent",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple"
]);
</script>
