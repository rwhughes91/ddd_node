import { IRepository } from '@app/interfaces';
import { Batch } from '@domain/models';

export class InMemoryRepository implements IRepository {
  private readonly _batches: Batch[];

  constructor(batches?: Batch[]) {
    this._batches = batches ?? [];
  }
  add(batch: Batch) {
    this._batches.push(batch);
  }
  get(reference: string) {
    return this._batches.find((batch) => batch.reference === reference);
  }

  list() {
    return this._batches;
  }
}
