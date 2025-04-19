import {routes} from "~/services/company/routes";
import type {Company, CompanyFee, CompanyList} from "~/services/company/types";
import type {QueryParams} from "~/services/utils/types";

export const companyService = {
    getCompanies: (params?: QueryParams) => {
        return useNuxtApp().$api().get<CompanyList[]>(routes.get, {params})
    },
    getCompany: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<Company>(routes.getById(id), {params})
    },
    getCompanyFees: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<CompanyFee>(routes.getById(id), {params})
    },
    createCompany: (params?: QueryParams) => {
        return useNuxtApp().$api().post<Company>(routes.create(), params)
    },
    updateCompany: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().put<Company>(routes.update(id), params)
    },
}
