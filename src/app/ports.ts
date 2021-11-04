import { Batch } from '@domain/models';

export interface IRepository {
  add(batch: Batch): Promise<void>;
  get(reference: string): Promise<Batch | undefined>;
  remove(reference: string): Promise<void>;
  list(): Promise<Batch[]>;
}
