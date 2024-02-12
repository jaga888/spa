import type {QueryParams} from "~/services/utils/types";
import type {ChargeType} from "~/services/charge_type/types";
import {routes} from "~/services/charge_type/routes";

export const chargeTypeService = {
    getChargeTypes: (params?: QueryParams) => {
        return useNuxtApp().$api().get<ChargeType[]>(routes.get, {params})
    },
}
