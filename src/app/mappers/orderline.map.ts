import { OrderLineInputDTO, OrderLineOutputDTO } from '@app/dtos';
import { IMap } from '@app/interfaces';
import { OrderLine } from '@domain/models';

export class OrderLineMap implements IMap<OrderLineInputDTO, OrderLine, OrderLineOutputDTO> {
  toDomain(orderLineDTO: OrderLineInputDTO): OrderLine {
    return OrderLine.create({ orderId: orderLineDTO.orderId, sku: orderLineDTO.sku, qty: orderLineDTO.qty });
  }

  toDTO(orderLine: OrderLine): OrderLineOutputDTO {
    return { orderId: orderLine.orderId, sku: orderLine.sku, qty: orderLine.qty };
  }
}
