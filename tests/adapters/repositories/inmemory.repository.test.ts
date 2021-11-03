import { InMemoryRepository } from '@adapters/repositories';
import { Batch } from '@domain/models';

describe('Adapters - Repository - InMemoryRepository', () => {
  let repository: InMemoryRepository;
  const batch = new Batch('my-batch', 'CHAIR', 10);

  beforeEach(() => {
    repository = new InMemoryRepository([batch]);
  });

  test('can get all batches', async () => {
    const batches = await repository.list();
    expect(batches).toEqual([batch]);
  });
  test('can get a single batch by reference', async () => {
    const batch = await repository.get('my-batch');
    expect(batch).toBe(batch);
  });
  test('can add a single batch', async () => {
    const batch = new Batch('my-new-batch', 'CHAIR', 10);
    await repository.add(batch);

    const batches = await repository.list();

    expect(batches.length).toBe(2);

    const newBatch = await repository.get('my-new-batch');
    expect(newBatch).toBe(batch);
  });
});
