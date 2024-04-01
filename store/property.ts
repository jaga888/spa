import { defineStore } from "pinia";
import type {PropertyList} from "~/services/property/types";

export const usePropertyStore = defineStore('property', () => {
    const activeProperty = ref<PropertyList>();
    const isNewProperty = ref<boolean>(false);
    const filter = ref<string>();
    const isDirty = ref<boolean>(false);
    const saveProperty = ref<boolean>(false);

    const setActiveProperty = (property?: PropertyList) => {
        isNewProperty.value = false
        activeProperty.value = property
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
        setIsDirty,
        setSaveProperty,
        setActiveProperty,
        setIsNewProperty,
        setPropertyFilter
    }
})
