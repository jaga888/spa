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
    address: string,
    address2: string,
    city: string,
    complete_client_identifier: string,
    identifier: string,
    pm_software_unit_id: number,
    property_id: number,
    state: string,
    zip: string,
}
