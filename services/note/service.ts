import {routes} from "~/services/note/routes";
import type {NoteList, Note} from "~/services/note/types";
import type {QueryParams} from "~/services/utils/types";

export const noteService = {
    getNotes: (params?: QueryParams) => {
        return useNuxtApp().$api().get<NoteList[]>(routes.get, {params})
    },
    getNote: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<Note>(routes.getById(id), {params})
    },
}
