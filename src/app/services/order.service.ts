import { InvalidSku } from '@app/errors';
import { IRepository } from '@app/interfaces';
import { Batch, OrderLine } from '@domain/models';
import { allocate } from '@domain/services';

export const allocateOrderLine = async (line: OrderLine, repo: IRepository<Batch>) => {
  const batches = await repo.list();
  if (!isValidSku(line.sku, batches)) throw new InvalidSku(`Invalid sku ${line.sku}`);
  const batchRef = allocate(line, batches);
  return batchRef;
};

const isValidSku = (sku: string, batches: Batch[]) => {
  return batches.some((batch) => batch.sku === sku);
};
