import { defineStore } from "pinia";

export const useCompaniesStore = defineStore('companies', () => {
    const activeCompanyId = ref<number>();
    const isNewCompany = ref<boolean>(false);
    const filter = ref<string>();

    const setActiveCompanyId = (id: number) => {
        isNewCompany.value = false
        activeCompanyId.value = id
    }

    const setIsNewCompany = () => {
        isNewCompany.value = true
    }

    const setFilter = (event: { target: { value: string; }; }) => {
        filter.value = '&filter[name]=' + event.target.value
    }

    return {
        activeCompanyId,
        filter,
        isNewCompany,
        setActiveCompanyId,
        setIsNewCompany,
        setFilter
    }
})
