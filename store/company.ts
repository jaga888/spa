import { defineStore } from "pinia";
import type {CompanyList} from "~/services/company/types";

export const useCompanyStore = defineStore('company', () => {
    const activeCompany = ref<CompanyList>();
    const isNewCompany = ref<boolean>(false);
    const filter = ref<string>();

    const setActiveCompany = (company: CompanyList) => {
        isNewCompany.value = false
        activeCompany.value = company
    }

    const setIsNewCompany = () => {
        activeCompany.value = undefined;
        isNewCompany.value = true
    }

    const setFilter = (search: string) => {
        isNewCompany.value = false
        activeCompany.value = undefined
        filter.value = search
    }

    return {
        activeCompany,
        filter,
        isNewCompany,
        setActiveCompany,
        setIsNewCompany,
        setFilter
    }
})
