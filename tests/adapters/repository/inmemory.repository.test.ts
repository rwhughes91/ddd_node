import { InMemoryRepository } from '@adapters/repository';
import { Batch } from '@domain/models';

describe('Adapters - Repository - InMemoryRepository', () => {
  let repository: InMemoryRepository;
  const batch = new Batch('my-batch', 'CHAIR', 10);

  beforeEach(() => {
    repository = new InMemoryRepository([batch]);
  });

  test('can get all batches', () => {
    expect(repository.list()).toEqual([batch]);
  });
  test('can get a single batch by reference', () => {
    expect(repository.get('my-batch')).toBe(batch);
  });
  test('can add a single batch', () => {
    const batch = new Batch('my-new-batch', 'CHAIR', 10);
    repository.add(batch);

    expect(repository.list().length).toBe(2);
    expect(repository.get('my-new-batch')).toBe(batch);
  });
});
