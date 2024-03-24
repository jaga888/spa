import { defineStore } from "pinia";
import type {ActiveUnit} from "~/services/unit/types";

export const useUnitStore = defineStore('unit', () => {
    const activeUnitId = ref<Number>(0);
    const activeUnit = ref<ActiveUnit>();
    const isNewUnit = ref<boolean>(false);
    const filter = ref<string>();
    const isDirty = ref<boolean>(false);
    const saveUnit = ref<boolean>(false);

    const setActiveUnitId = (id: number) => {
        isNewUnit.value = false
        activeUnitId.value = id
    }

    const setActiveUnit = (unit?: ActiveUnit) => {
        isNewUnit.value = false
        activeUnit.value = unit ?? undefined
    }

    const setIsNewUnit = (value: boolean = true) => {
        activeUnitId.value = 0
        isNewUnit.value = value
    }

    const setUnitFilter = (search: string) => {
        filter.value = search
        isNewUnit.value = false
        activeUnitId.value = 0
    }

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setSaveUnit= ($value:boolean = true) => {
        saveUnit.value = $value
    }

    return {
        activeUnit,
        activeUnitId,
        filter,
        isNewUnit,
        saveUnit,
        isDirty,
        setIsDirty,
        setSaveUnit,
        setIsNewUnit,
        setUnitFilter,
        setActiveUnitId,
        setActiveUnit,
    }
})
