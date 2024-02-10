import { defineStore } from "pinia";
import type {CompanyList} from "~/services/company/types";

export const useCompanyStore = defineStore('company', () => {
    const activeCompany = ref<CompanyList>();
    const saveCompany = ref<boolean>(false);
    const isDirty = ref<boolean>(false);
    const isNewCompany = ref<boolean>(false);
    const filter = ref<string>();
    const activeTab = ref<string>('information');

    const setActiveTab = (tab: string) => {
        activeTab.value = tab
    }

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setSaveCompany = ($value:boolean = true) => {
        saveCompany.value = $value
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
        isDirty,
        setIsDirty,
        setSaveCompany,
        setActiveTab,
        setActiveCompany,
        setIsNewCompany,
        setFilter
    }
})
