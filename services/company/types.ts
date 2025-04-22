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
}

export interface ActiveCompany{
    id: number,
    active: boolean,
    name: string,
    policies?: Array<PolicyList>
    ud_filing_threshold?: number,
}

export interface Company{
    id?: number,
    legal_name: string,
    name: string,
    short_name: string,
    address: Address,
    contact_email: string,
    contact_name: string,
    contact_phone: string,
    invoice_address?: Address,
    invoice_address2: string,
    invoice_email: string,
    pm_software_id: number,
    policy_ids: number[],
    ud_filing_threshold: number,
    url: string,
    active: boolean,
    policies?: Array<PolicyList>
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


