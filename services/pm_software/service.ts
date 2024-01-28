import {routes} from "~/services/pm_software/routes";
import type {PmSoftwareList} from "~/services/pm_software/types";
import type {QueryParams} from "~/services/utils/types";

export const pmSoftwareService = {
    getPmSoftwares: (params?: QueryParams) => {
        return useNuxtApp().$api().get<PmSoftwareList[]>(routes.get, {params})
    },

}
