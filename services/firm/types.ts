import type {FeeList} from "~/services/fee/types";
import type {Court} from "~/services/court/types";

export interface Firm{
    name: string,
    fees: FeeList[],
    courts: Court[]
}
