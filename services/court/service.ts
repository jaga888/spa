import type {QueryParams} from "~/services/utils/types";
import type {Court} from "~/services/court/types";
import {routes} from "~/services/court/routes";

export const courtService = {
    getCourts: (params?: QueryParams) => {
        return useNuxtApp().$api().get<Court[]>(routes.get, {params})
    },
}
