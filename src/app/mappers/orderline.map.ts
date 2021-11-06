import { OrderLine } from '@domain/models';

import { IMap } from '../interfaces';

interface OrderLineInputDTO {
  orderId: string;
  sku: string;
  qty: number;
}

interface OrderLineOutputDTO {
  orderId: string;
  sku: string;
  qty: number;
}

export class OrderLineMap implements IMap<OrderLineInputDTO, OrderLine, OrderLineOutputDTO> {
  toDomain(orderLineDTO: OrderLineInputDTO): OrderLine {
    return OrderLine.create({ orderId: orderLineDTO.orderId, sku: orderLineDTO.sku, qty: orderLineDTO.qty });
  }

  toDTO(orderLine: OrderLine): OrderLineOutputDTO {
    return { orderId: orderLine.orderId, sku: orderLine.sku, qty: orderLine.qty };
  }
}
