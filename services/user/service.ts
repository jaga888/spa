import {routes} from "~/services/user/routes";
import type {User, UserList, UserPermissions} from "~/services/user/types";
import type {QueryParams} from "~/services/utils/types";

export const userService = {
    getUsers: (params?: QueryParams) => {
        return useNuxtApp().$api().get<UserList[]>(routes.get, {params})
    },
    getUser: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<User>(routes.getById(id), {params})
    },
    getUserPermissions: (id: number, params?: QueryParams) => {
        return useNuxtApp().$api().get<UserPermissions>(routes.getById(id), {params})
    },
}
