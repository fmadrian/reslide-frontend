import { OrderDetailPayload } from '../orderDetail/order-detail.payload';
import { TransactionPayload } from '../transaction/transaction.payload';

export interface OrderPayload {
  id?: number;
  transaction: TransactionPayload;
  providerName: string;
  providerCode: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  total?: number;
  paid?: number;
  owed?: number;
  status?: string;
  details: OrderDetailPayload[];
}
