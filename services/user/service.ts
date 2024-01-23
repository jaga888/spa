import {companiesRoutes} from "~/services/companies/companies.routes";
import type {Companies} from "~/services/companies/companies.types";

export const companiesServices = {
    getCompanies: (): Promise<Companies[]> => {
        return useNuxtApp().$api.get(companiesRoutes.get_companies)
    }
}
