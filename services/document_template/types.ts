export interface DocumentTemplate{
    id: number,
    name: string,
    default: boolean,
    document_type_id: number,
    document_type: DocumentType,
    scoped_id: number,
    scoped_type: string,
}
