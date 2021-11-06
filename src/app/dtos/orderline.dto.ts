export interface OrderLineInputDTO {
  orderId: string;
  sku: string;
  qty: number;
}

export interface OrderLineOutputDTO {
  orderId: string;
  sku: string;
  qty: number;
}
