import {routes} from "~/services/user/routes";
import type {UserList} from "~/services/user/types";
import type {QueryParams} from "~/services/utils/types";

export const userService = {
    getUsers: (params?: QueryParams) => {
        return useNuxtApp().$api().get<UserList[]>(routes.get, {params})
    }
}
