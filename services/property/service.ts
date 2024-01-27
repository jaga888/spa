import {routes} from "~/services/property/routes";
import type {PropertyList} from "~/services/property/types";
import type {QueryParams} from "~/services/utils/types";

export const propertyService = {
    getProperties: (params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyList[]>(routes.get, {params})
    }
}
