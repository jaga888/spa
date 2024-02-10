import type {FeeList} from "~/services/fee/types";

export interface Firm{
    name: string,
    fees: FeeList[],
}
