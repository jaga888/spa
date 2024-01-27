import { defineStore } from "pinia";
import type {PropertyList} from "~/services/property/types";

export const usePropertyStore = defineStore('property', () => {
    const activeProperty = ref<PropertyList>();
    const isNewProperty = ref<boolean>(false);
    const filter = ref<string>();

    const setActiveProperty = (property: PropertyList) => {
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

    return {
        activeProperty,
        filter,
        isNewProperty,
        setActiveProperty,
        setIsNewProperty,
        setPropertyFilter
    }
})
