import {routes} from "~/services/fee/routes";
import type {Fee} from "~/services/fee/types";

export const feeService = {
    createFee: (fee: Fee) => {
        return useNuxtApp().$api().post(routes.create, fee)
    },
    deleteFee: (id: number) => {
        return useNuxtApp().$api().delete(routes.delete(id))
    },
}
