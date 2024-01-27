import {defineStore} from "pinia";
import type {UserList} from "~/services/user/types";

export const useUserStore = defineStore('user', () => {
    const activeUser = ref<UserList>();
    const filter = ref<string>();

    const setActiveUser = (user: UserList) => {
        activeUser.value = user
    }

    const setUserFilter = (search: string) => {
        activeUser.value = undefined
        filter.value = search
    }

    return {
        activeUser,
        filter,
        setActiveUser,
        setUserFilter
    }
})
