import { OutOfStockError } from './errors';
import { Batch, OrderLine } from './models';

export const allocate = (line: OrderLine, batches: Batch[]) => {
  const sortedBatches = [...batches].sort((lBatch, rBatch) => {
    if (lBatch.lt(rBatch)) return -1;
    if (lBatch.gt(rBatch)) return 1;
    return 0;
  });

  for (const batch of sortedBatches) {
    if (batch.can_allocate(line)) {
      batch.allocate(line);
      return batch.reference;
    }
  }

  throw new OutOfStockError(`Out of stock for sku ${line.sku}`);
};
