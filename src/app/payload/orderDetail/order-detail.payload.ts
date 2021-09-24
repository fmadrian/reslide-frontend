export interface OrderDetailPayload {
  id?: number;
  orderId?: number;
  productCode: string;
  productName?: string;
  priceByUnit: number;
  quantity: number;
  total?: number;
  status?: string;
  notes: string;
}
