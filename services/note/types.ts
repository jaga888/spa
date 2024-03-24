import type {ProcessingType} from "~/services/processing_type/types";

export interface ActiveNote{
    id: number,
}

export interface NoteList{
    id?: number,
    color: string,
    content: string,
    is_published: boolean,
    processing_type?: ProcessingType,
    processing_type_id: number,
    title: number,
}

export interface Note{
    id?: number,
    color: string,
    content: string,
    is_published: boolean,
    processing_type_id: number,
    title: string,
}
