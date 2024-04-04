import {defineStore} from "pinia";
import type {UserList} from "~/services/user/types";

export const useUserStore = defineStore('user', () => {
    const activeUser = ref<UserList>();
    const filter = ref<string>();
    const isDirty = ref<boolean>(false);
    const saveUser = ref<boolean>(false);

    const setActiveUser = (user?: UserList) => {
        activeUser.value = user
    }

    const setUserFilter = (search: string) => {
        activeUser.value = undefined
        filter.value = search
    }

    const setIsDirty = (value:boolean = true) => {
        isDirty.value = value
    }

    const setSaveUser= ($value:boolean = true) => {
        saveUser.value = $value
    }

    return {
        activeUser,
        filter,
        isDirty,
        saveUser,
        setActiveUser,
        setUserFilter,
        setIsDirty,
        setSaveUser
    }
})
