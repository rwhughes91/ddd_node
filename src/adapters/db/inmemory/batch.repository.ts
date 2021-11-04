import { IRepository } from '@app/ports';
import { Batch } from '@domain/models';

export class InMemoryBatchRepository implements IRepository {
  private readonly _batches: Batch[];

  constructor(batches?: Batch[]) {
    this._batches = batches ?? [];
  }

  async add(batch: Batch) {
    this._batches.push(batch);
  }

  async get(reference: string) {
    return this._batches.find((batch) => batch.reference === reference);
  }

  async remove(reference: string) {
    this._batches.filter((batch) => batch.reference !== reference);
  }

  async list() {
    return this._batches;
  }
}
