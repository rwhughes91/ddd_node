import { Batch, OrderLine } from '@domain/models';
import { allocate } from '@domain/services';

import { InvalidSku } from './errors';
import { IRepository } from './ports';

export const allocateOrderLine = async (line: OrderLine, repo: IRepository<Batch>) => {
  const batches = await repo.list();
  if (!isValidSku(line.sku, batches)) throw new InvalidSku(`Invalid sku ${line.sku}`);
  const batchRef = allocate(line, batches);
  return batchRef;
};

const isValidSku = (sku: string, batches: Batch[]) => {
  return batches.some((batch) => batch.sku === sku);
};
