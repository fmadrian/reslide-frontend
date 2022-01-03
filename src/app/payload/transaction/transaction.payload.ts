import { PaymentPayload } from '../payment/payment.payload';

export interface TransactionPayload {
  id?: number;
  date: string;
  notes: string;
  username: string;
  fullname?: string; // Full name of the user who made the transaction.
  payments: PaymentPayload[];
}
