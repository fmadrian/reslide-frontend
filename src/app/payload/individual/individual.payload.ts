import { AddressPayload } from "../address/address.payload";
import { ContactPayload } from "../contact/contact.payload";

export interface IndividualPayload{
    id?: number
    type? : string,
    name: string,
    code: string,
    notes: string,
    contacts : ContactPayload[],
    addresses: AddressPayload[]
}