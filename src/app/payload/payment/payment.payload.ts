export interface PaymentPayload {
  id?: number;
  date: string;
  notes: string;
  owedAfter?: number;
  owedBefore?: number;
  paid: number;
  paymentMethod: string;
  status?: string;
  transactionId?: number;
  username?: string;
  orderId?: number;
  invoiceId?: number;
}
