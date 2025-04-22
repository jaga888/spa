import { defineStore } from "pinia";
import type {ActiveCompany} from "~/services/company/types";

export const useCompanyStore = defineStore('company', () => {
    const activeCompany = ref<ActiveCompany>();
    const activeCompanyId = ref<number>();
    const saveCompany = ref<boolean>(false);
    const isDirty = ref<boolean>(false);
    const isNewCompany = ref<boolean>(false);
    const filter = ref<string>();
    const refreshCompanies = ref<boolean>(false);

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setActiveCompanyId = (value:number) => {
        activeCompanyId.value = value
    }

    const setSaveCompany = ($value:boolean = true) => {
        saveCompany.value = $value
    }

    const setRefreshCompanies = ($value:boolean = true) => {
        refreshCompanies.value = $value
    }

    const setActiveCompany = (company: ActiveCompany) => {
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
        saveCompany,
        isDirty,
        refreshCompanies,
        activeCompanyId,
        setActiveCompanyId,
        setIsDirty,
        setSaveCompany,
        setActiveCompany,
        setIsNewCompany,
        setFilter,
        setRefreshCompanies
    }
})
