import {routes} from "~/services/property/routes";
import type {PropertyList, Property, PropertyFee, PropertyDoc} from "~/services/property/types";
import type {QueryParams} from "~/services/utils/types";

export const propertyService = {
    getProperties: (params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyList[]>(routes.get, {params})
    },
    getProperty: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<Property>(routes.getById(id), {params})
    },
    getPropertyFees: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyFee>(routes.getById(id), {params})
    },
    getPropertyDocs: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyDoc>(routes.getById(id), {params})
    }
}
