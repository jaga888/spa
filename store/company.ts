import { defineStore } from "pinia";
import type {Company, CompanyList} from "~/services/company/types";

export const useCompanyStore = defineStore('company', () => {
    const activeCompany = ref<CompanyList>();
    const saveCompany = ref<boolean>(false);
    const isNewCompany = ref<boolean>(false);
    const filter = ref<string>();
    const activeTab = ref<string>('');

    const setActiveTab = (tab: string) => {
        activeTab.value = tab
    }

    const setSaveCompany = () => {
        saveCompany.value = true
    }

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
        activeTab,
        saveCompany,
        setSaveCompany,
        setActiveTab,
        setActiveCompany,
        setIsNewCompany,
        setFilter
    }
})
