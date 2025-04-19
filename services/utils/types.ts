import type {ErrorObject} from "@vuelidate/core";

interface Params {
    [key: string]: string | number | boolean | Object;
}

export interface QueryParams extends Partial<Params>{
    sort?: string,
    // filter: array<number, string>,
}

export interface VuelidateValidation {
    $errors: ErrorObject[];
    $error: boolean;
    $invalid: boolean;
    $dirty: boolean;
    $touch: () => void;
}
