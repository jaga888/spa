import type {ProcessingType} from "~/services/processing_type/types";
import type {PacketTemplateList} from "~/services/packet_template/types";

export interface ProcessingTypeAvailabilityList{
    id: number,
    fees: number,
    available: boolean,
    note: string,
    processing_type: ProcessingType
    processing_type_id: number,
    packet_templates: Array<PacketTemplateList>
}
