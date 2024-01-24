import {companyRoutes} from "~/services/company/routes";
import type {Company} from "~/services/company/types";
import type {AxiosResponse} from "axios";
import type {QueryParams} from "~/services/utils/types";

export const companyService = {
    getCompanies: (params?: QueryParams) => {
        return useNuxtApp().$api().get<Company[]>(companyRoutes.get_companies, {params})
    }
}
