import { IndividualPayload } from "../individual/individual.payload";

export interface UserPayload{
    username: string,
    password: string,
    individual : IndividualPayload
}