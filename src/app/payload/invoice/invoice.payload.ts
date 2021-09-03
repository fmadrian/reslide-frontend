import { InvoiceDetailPayload } from '../invoiceDetail/invoice-detail.payload';
import { TransactionPayload } from '../transaction/transaction.payload';

export interface InvoicePayload {
  id?: number;
  status: string;
  clientCode: string;
  clientName: string;
  transaction: TransactionPayload;
  details: InvoiceDetailPayload[];

  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  paid?: number;
  owed?: number;
}
