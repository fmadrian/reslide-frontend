import { PaymentPayload } from '../payment/payment.payload';

export interface TransactionPayload {
  id?: number;
  date: string;
  notes: string;
  username: string;
  payments: PaymentPayload[];
}
