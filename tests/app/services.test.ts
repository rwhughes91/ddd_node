import { InMemoryBatchRepository } from '@adapters/db/inmemory';
import { InvalidSku } from '@app/errors';
import { allocateOrderLine } from '@app/services';
import { Batch, OrderLine } from '@domain/models';

describe('App - services - order', () => {
  let orderLine: OrderLine;
  let repo: InMemoryBatchRepository;

  beforeEach(() => {
    orderLine = OrderLine.create({ orderId: 'orderLine-1', sku: 'CHAIR', qty: 10 });
    repo = new InMemoryBatchRepository([new Batch('my-batch', 'CHAIR', 10)]);
  });

  test('can allocate orderLine to batch', async () => {
    const batchRef = await allocateOrderLine(orderLine, repo);

    expect(batchRef).toBe('my-batch');

    const batch = await repo.get(batchRef);

    expect(batch?.allocated_quantity).toBe(10);
  });

  test('raises InvalidSku error if invalid sku is passed from order line', async () => {
    await expect(
      allocateOrderLine(OrderLine.create({ orderId: 'orderLine-1', sku: 'SMALL-CHAIR', qty: 10 }), repo),
    ).rejects.toThrow(InvalidSku);
  });
});
