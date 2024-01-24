interface Params {
    [key: string]: string | number;
}

export interface QueryParams extends Partial<Params>{
    sort?: string,
    // filter: array<number, string>,
}
