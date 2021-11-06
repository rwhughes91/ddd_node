import { Batch } from '@domain/models';

import { BatchEntityType } from './models/batch';

export class BatchMap {
  static toDomain(batch: BatchEntityType): Batch {
    let eta;
    const etaBatch = batch.get('eta') as string;
    if (etaBatch) {
      eta = new Date(etaBatch);
    }
    const reference = batch.get('reference') as string;
    const sku = batch.get('sku') as string;
    const qty = batch.get('qty') as number;

    return new Batch(reference, sku, qty, eta);
  }
}
