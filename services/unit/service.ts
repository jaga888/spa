import {routes} from "~/services/unit/routes";
import type {UnitList, Unit} from "~/services/unit/types";
import type {QueryParams} from "~/services/utils/types";

export const unitService = {
    getUnits: (params?: QueryParams) => {
        return useNuxtApp().$api().get<UnitList[]>(routes.get, {params})
    },
    getUnit: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<Unit>(routes.getById(id), {params})
    },
}
