import type {QueryParams} from "~/services/utils/types";
import {routes} from "~/services/file/routes";
import type {FileList} from "~/services/file/types";

export const fileService = {
    getFiles: (params?: QueryParams) => {
        return useNuxtApp().$api().get<FileList[]>(routes.get, {params})
    },
}
