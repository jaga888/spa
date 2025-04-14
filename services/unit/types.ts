import type {Address} from "~/services/address/types";

export interface ActiveUnit{
    id: number,
}

export interface UnitList{
    id: number,
    active: boolean,
    address: string,
}

export interface Unit{
    id?: number,
    active: boolean,
    address: Address,
    address2: string,
    complete_client_identifier: string,
    identifier: string,
    pm_software_unit_id: number,
    property_id: number,
}
