import {routes} from "~/services/property/routes";
import type {PropertyList, Property, PropertyFee, PropertyDoc, ActiveProperty} from "~/services/property/types";
import type {QueryParams} from "~/services/utils/types";

export const propertyService = {
    getProperties: (params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyList[]>(routes.get, {params})
    },
    getProperty: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<Property>(routes.getById(id), {params})
    },
    getPropertyFees: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyFee>(routes.getFees(id), {params})
    },
    getPropertyDocs: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<PropertyDoc>(routes.getDocs(id), {params})
    },
    createProperty: (params?: QueryParams) => {
        return useNuxtApp().$api().post<Property>(routes.create(), params)
    },
    updateProperty: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().put<Property>(routes.update(id), params)
    },
}
