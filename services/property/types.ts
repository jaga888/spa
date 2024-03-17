import type {CompanyList} from "~/services/company/types";
import type {Firm} from "~/services/firm/types";
import type {PolicyList} from "~/services/policy/types";
import type {FeeList} from "~/services/fee/types";
import type {ProcessingTypeAvailabilityList} from "~/services/processing_type_availability/types";

export interface PropertyList{
    id: number,
    short_name: string,
    legal_name: string,
    active: boolean,
    court_id: number,
    data_availability: number,
    document_email: string,
    manager_name: string
}

export interface Property{
    id?: number,
    name: string,
    legal_name: string,
    active: boolean,
    address: string,
    city: string,
    client_property_id: string,
    company: CompanyList,
    company_id: number,
    court_id: number,
    default_unit_city: string,
    default_unit_state: string,
    default_unit_zip: string,
    document_email: string,
    email: string,
    fax: string,
    firm: Firm,
    late_after_dom: number,
    invoice_address: string,
    invoice_address2: string,
    invoice_city: string,
    invoice_email: string,
    invoice_state: string,
    invoice_zip: string,
    manager_cell: string,
    manager_email: string,
    manager_name: string,
    notice_rent_trigger: number,
    notification_email: string,
    payment_address: string,
    payment_city: string,
    payment_state: string,
    payment_zip: string,
    phone: string,
    pm_software_id: 0,
    policy_ids: number[],
    short_name: string,
    state: string,
    use_company_filing_threshold: boolean,
    ud_filing_threshold: number,
    zip: string,
    policies: Array<PolicyList>,
    unit_count: number,
}

export interface PropertyFee{
    id: number,
    court_id: number,
    data_availability: number,
    document_email: string,
    name: string,
    legal_name: string,
    manager_name: string,
    active: boolean,
    fees: FeeList[]
    firm: Firm,
    processing_type_availabilities: ProcessingTypeAvailabilityList[],
    short_name: string,
    sort_name: string,
    company: CompanyList,
}

export interface PropertyDoc{
    id: number,
    court_id: number,
    data_availability: number,
    document_email: string,
    name: string,
    legal_name: string,
    manager_name: string,
    active: boolean,
    processing_type_availabilities: ProcessingTypeAvailabilityList[],
    short_name: string,
    sort_name: string,
}
