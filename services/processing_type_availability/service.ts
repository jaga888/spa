import {routes} from "~/services/processing_type_availability/routes";
import type {QueryParams} from "~/services/utils/types";

export const processingTypeAvailabilityService = {
    updateProcessingTypeAvailability: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().put(routes.update(id), params)
    },
}


