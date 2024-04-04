import type {Signature} from "~/services/signature/types";
import type {PropertyList} from "~/services/property/types";

export interface UserLogin{
    email: string,
    password: string,
}

export interface UserList{
    id: number,
    first_name: string,
    last_name: string,
}

export interface User{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    signatures: Array<Signature>
}

export interface UserPermissions{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    property_ids: Array<Number>
}
