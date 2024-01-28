import {routes} from "~/services/policy/routes";
import type {PolicyList} from "~/services/policy/types";
import type {QueryParams} from "~/services/utils/types";

export const policyService = {
    getPolicies: (params?: QueryParams) => {
        return useNuxtApp().$api().get<PolicyList[]>(routes.get, {params})
    },

}
