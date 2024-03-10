import { defineStore } from "pinia";

export const useClientStore = defineStore('client', () => {
    const activeContentTabProperties = ref<string>("properties");
    const activeContentTab = ref<string>(activeContentTabProperties.value);
    const activeContentTabUsers = ref<string>("users");
    const setActiveContentTab = (tab: string) => {
        activeContentTab.value = tab
    }

    const activeInspectorCompany = ref<string>("company");
    const activeInspector = ref<string>(activeInspectorCompany.value);
    const activeInspectorProperty = ref<string>("property");
    const activeInspectorUser = ref<string>("user");
    const setActiveInspector = (inspector: string) => {
        activeInspector.value = inspector
    }

    return {
        activeContentTab,
        activeContentTabProperties,
        activeContentTabUsers,
        activeInspector,
        activeInspectorCompany,
        activeInspectorProperty,
        activeInspectorUser,
        setActiveContentTab,
        setActiveInspector,
    }
})
