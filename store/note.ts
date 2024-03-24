import { defineStore } from "pinia";
import type {ActiveNote} from "~/services/note/types";

export const useNoteStore = defineStore('note', () => {
    const activeNoteId = ref<Number>(0);
    const activeNote = ref<ActiveNote>();
    const isNewNote = ref<boolean>(false);
    const filter = ref<string>();
    const isDirty = ref<boolean>(false);
    const saveNote = ref<boolean>(false);

    const setActiveNoteId = (id: number) => {
        isNewNote.value = false
        activeNoteId.value = id
    }

    const setActiveNote = (note?: ActiveNote) => {
        isNewNote.value = false
        activeNote.value = note ?? undefined
    }

    const setIsNewNote = (value: boolean = true) => {
        activeNoteId.value = 0
        isNewNote.value = value
    }

    const setNoteFilter = (search: string) => {
        filter.value = search
        isNewNote.value = false
        activeNoteId.value = 0
    }

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setSaveNote= ($value:boolean = true) => {
        saveNote.value = $value
    }

    return {
        activeNote,
        activeNoteId,
        filter,
        isNewNote,
        saveNote,
        isDirty,
        setIsDirty,
        setSaveNote,
        setIsNewNote,
        setNoteFilter,
        setActiveNoteId,
        setActiveNote,
    }
})
