import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";
import type {Firm} from "~/services/firm/types";
import type {FeeList} from "~/services/fee/types";
import type {PolicyList} from "~/services/policy/types";
import type {Address} from "~/services/address/types";

export interface CompanyList{
    id: number,
    name: string,
    legal_name: string,
    active: boolean,
    policies?: Array<PolicyList>
    ud_filing_threshold?: number,
}

export interface Company{
    id?: number,
    name: string,
    legal_name: string,
    active: boolean,
    address: Address,
    contact_email: string,
    contact_name: string,
    contact_phone: string,
    invoice_address?: Address,
    invoice_address2: string,
    invoice_email: string,
    pm_software_id: 0,
    policy_ids: number[],
    short_name: string,
    ud_filing_threshold: number,
    url: string,
}

export interface CompanyFee{
    id: number,
    name: string,
    legal_name: string,
    active: boolean,
    fees: FeeList[]
    firm: Firm,
    processing_type_availabilities: ProcessingTypeAvailabilityList[],
}

export interface CompanyInvoiceEmail{
    email: string,
}


