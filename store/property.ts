import { defineStore } from "pinia";
import type {ActiveProperty, PropertyList} from "~/services/property/types";

export const usePropertyStore = defineStore('property', () => {
    const activeProperty = ref<ActiveProperty>();
    const isNewProperty = ref<boolean>(false);
    const filter = ref<string>();
    const isDirty = ref<boolean>(false);
    const saveProperty = ref<boolean>(false);
    const refreshProperties = ref<boolean>(false);

    const setActiveProperty = (property?: ActiveProperty) => {
        isNewProperty.value = false
        activeProperty.value = property
    }

    const setRefreshProperties = ($value:boolean = true) => {
        refreshProperties.value = $value
    }

    const setIsNewProperty = (value: boolean = true) => {
        activeProperty.value = undefined
        isNewProperty.value = value
    }

    const setPropertyFilter = (search: string) => {
        filter.value = search
        isNewProperty.value = false
        activeProperty.value = undefined
    }

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setSaveProperty= ($value:boolean = true) => {
        saveProperty.value = $value
    }

    return {
        activeProperty,
        filter,
        isNewProperty,
        saveProperty,
        isDirty,
        refreshProperties,
        setRefreshProperties,
        setIsDirty,
        setSaveProperty,
        setActiveProperty,
        setIsNewProperty,
        setPropertyFilter
    }
})
