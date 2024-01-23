import {companyRoutes} from "~/services/company/routes";
import type {Company} from "~/services/company/types";

export const companyService = {
    getCompanies: (): Promise<Company[]> => {
        return useNuxtApp().$api.get(companyRoutes.get_companies)
    }
}
