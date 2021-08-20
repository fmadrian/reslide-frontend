export interface ProductPayload{
    id?: number;
    brand: string;
    type: string;
    code: string;
    name: string;
    measurementType: string;
    quantityAvailable: number;
    price: number;
    notes:string;
    productStatus?:string;
    taxExempt:boolean
}