import { Batch, OrderLine } from '@domain/models';

describe('Domain - Batch', () => {
  let batch: Batch;
  let orderLine: OrderLine;

  beforeEach(() => {
    batch = new Batch('batch-001', 'SMALL-TABLE', 20, new Date());
    orderLine = OrderLine.create({ orderId: 'order-ref', sku: 'SMALL-TABLE', qty: 2 });
  });

  test('allocating to a batch reduces the available quantity', () => {
    batch.allocate(orderLine);
    expect(batch.available_quantity).toBe(18);
  });
  test('can allocate if available quantity is greater than required', () => {
    expect(batch.can_allocate(orderLine)).toBe(true);
  });
  test('cannot allocate if available quantity is smaller than required', () => {
    const largeOrderLine = OrderLine.create({ orderId: 'order-ref', sku: 'SMALL-TABLE', qty: 30 });
    expect(batch.can_allocate(largeOrderLine)).toBe(false);
  });
  test('can allocate if available quantity is equal to required', () => {
    const mediumOrderLine = OrderLine.create({ orderId: 'order-ref', sku: 'SMALL-TABLE', qty: 20 });
    expect(batch.can_allocate(mediumOrderLine)).toBe(true);
  });
  test('cannot allocate if SKUs do not match', () => {
    batch = new Batch('batch-001', 'MED-CHAIR', 20);
    expect(batch.can_allocate(orderLine)).toBe(false);
  });
  test('can only deallocate allocated lines', () => {
    batch.deallocate(orderLine);
    expect(batch.available_quantity).toBe(20);
  });
  test('allocation is idempotent', () => {
    batch.allocate(orderLine);
    batch.allocate(orderLine);
    expect(batch.available_quantity).toBe(18);
  });
});
