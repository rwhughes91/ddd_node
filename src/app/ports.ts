export interface IRepository<T> {
  add(batch: T): Promise<void>;
  get(ref: string | number): Promise<T | undefined>;
  remove(ref: string | number): Promise<void>;
  list(): Promise<T[]>;
}
