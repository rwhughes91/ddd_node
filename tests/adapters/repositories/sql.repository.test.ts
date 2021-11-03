import { SqlRepository } from '@adapters/repositories';
import { Batch } from '@domain/models';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

describe('Adapters - Repository - SqlRepository', () => {
  let repository: SqlRepository;
  const batch = new Batch('my-batch', 'CHAIR', 10);

  beforeAll(async () => {
    repository = new SqlRepository(sequelize);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await repository.add(batch);
  });

  afterEach(async () => {
    await repository.entities.BatchEntity.truncate();
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
    expect(newBatch).toEqual(batch);
  });
});
