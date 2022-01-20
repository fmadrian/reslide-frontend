import { IndividualPayload } from '../individual/individual.payload';

export interface UserPayload {
  id?: number;
  username: string;
  password: string;
  individual: IndividualPayload;
  currentPassword?: string;
  role?: string;
  enabled?: boolean;
}
