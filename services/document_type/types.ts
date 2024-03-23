export interface DocumentType{
    id: number,
    name: string,
    document_template: DocumentType,
    document_templates: Array<DocumentType>,

}
