import { Data } from 'dataclass';

export class OrderLine extends Data {
  orderId = '';
  sku = '';
  qty = 0;
}
