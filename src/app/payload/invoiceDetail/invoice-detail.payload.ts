import { DiscountPayload } from '../discount/discount.payload';

export interface InvoiceDetailPayload {
  id?: number;
  invoiceId?: number;
  productCode: string;
  productName?: string;
  priceByUnit: number;
  quantity: number;
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  taxPercentage?: number; // Product exempt from taxes at the moment of the transaction will have 0.
  discountApplied?: DiscountPayload;
  status: string;
  notes: string;
}
