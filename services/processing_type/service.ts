import {routes} from "~/services/processing_type/routes";
import type {ProcessingType} from "~/services/processing_type/types";
import type {QueryParams} from "~/services/utils/types";

export const processingTypeService = {
    getProcessingTypes: (params?: QueryParams) => {
        return useNuxtApp().$api().get<ProcessingType[]>(routes.get, {params})
    },
}
