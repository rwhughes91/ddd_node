import { Batch } from '@domain/models';

export interface IRepository {
  add(batch: Batch): void;
  get(reference: string): Batch | undefined;
  list(): Batch[];
}
