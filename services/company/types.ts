import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";
import type {Firm} from "~/services/firm/types";

export interface CompanyList{
    id: number,
    name: string,
    legal_name: string,
    active: boolean,
}

export interface Company{
    id?: number,
    name: string,
    legal_name: string,
    active: boolean,
    address: string,
    city: string,
    contact_email: string,
    contact_name: string,
    contact_phone: string,
    invoice_address: string,
    invoice_address2: string,
    invoice_city: string,
    invoice_email: string,
    invoice_state: string,
    invoice_zip: string,
    pm_software_id: 0,
    policy_ids: number[],
    short_name: string,
    state: string,
    ud_filing_threshold: number,
    url: string,
    firm: Firm|null,
    zip: string,
    processing_type_availabilities: ProcessingTypeAvailabilityList[],
    files: []
}
