import { defineStore } from "pinia";

export const useClientStore = defineStore('client', () => {
    const activeTab = ref<string>('');

    const setActiveTab = (tab: string) => {
        activeTab.value = tab
    }

    return {
        activeTab,
        setActiveTab,
    }
})
