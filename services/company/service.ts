import {companyRoutes} from "~/services/company/routes";
import type {Company} from "~/services/company/types";
import type {AxiosResponse} from "axios";

export const companyService = {
    getCompanies: (filter: string = ''): Promise<AxiosResponse<Company[]>> => {
        return useNuxtApp().$api.get(companyRoutes.get_companies + filter)
    }
}
