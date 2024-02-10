import type {ChargeType} from "~/services/charge_type/types";

export interface FeeList{
    id: number,
    base_amount: number,
    charge_type: ChargeType,
    description: string,
    processing_type_id: number,
    scoped_type_id: string
}
