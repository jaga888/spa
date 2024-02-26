import type {UserList} from "~/services/user/types";

export interface FileList{
    uuid: string,
    name: string,
    mime_type: string,
    extension: string,
    description?: string,
    created_at: string,
    creator: UserList
}
