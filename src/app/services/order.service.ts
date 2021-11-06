import { OrderLineInputDTO } from '@app/dtos';
import { InvalidSku } from '@app/errors';
import { IRepository } from '@app/interfaces';
import { OrderLineMap } from '@app/mappers';
import { Batch } from '@domain/models';
import { allocate } from '@domain/services';

const orderLineMap = new OrderLineMap();

export const allocateOrderLine = async (line: OrderLineInputDTO, repo: IRepository<Batch>) => {
  const orderLine = orderLineMap.toDomain(line);
  const batches = await repo.list();
  if (!isValidSku(orderLine.sku, batches)) throw new InvalidSku(`Invalid sku ${line.sku}`);
  const batchRef = allocate(orderLine, batches);
  return batchRef;
};

const isValidSku = (sku: string, batches: Batch[]) => {
  return batches.some((batch) => batch.sku === sku);
};
