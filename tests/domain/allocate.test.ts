import { OutOfStockError } from '@domain/errors';
import { Batch, OrderLine } from '@domain/models';
import { allocate } from '@domain/services';

describe('Domain - allocate', () => {
  test('prefers current stock batches to shipments', () => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const inStockBatch = new Batch('in-stock-batch', 'RETRO-CLOCK', 100);
    const shipmentBatch = new Batch('shipment-batch', 'RETRO-CLOCK', 100, tomorrow);
    const line = OrderLine.create({ orderId: 'oref', sku: 'RETRO-CLOCK', qty: 10 });

    allocate(line, [inStockBatch, shipmentBatch]);

    expect(inStockBatch.available_quantity).toBe(90);
    expect(shipmentBatch.available_quantity).toBe(100);
  });

  test('prefers earlier batches', () => {
    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const datAfterNext = new Date();
    datAfterNext.setDate(new Date().getDate() + 2);

    const earliest = new Batch('speedy-batch', 'MINIMALIST-SPOON', 100, today);
    const medium = new Batch('normal-batch', 'MINIMALIST-SPOON', 100, tomorrow);
    const latest = new Batch('slow-batch', 'MINIMALIST-SPOON', 100, datAfterNext);
    const line = OrderLine.create({ orderId: 'order1', sku: 'MINIMALIST-SPOON', qty: 10 });

    allocate(line, [medium, earliest, latest]);

    expect(earliest.available_quantity).toBe(90);
    expect(medium.available_quantity).toBe(100);
    expect(latest.available_quantity).toBe(100);
  });

  test('returns allocated batch ref', () => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const inStockBatch = new Batch('in-stock-batch-ref', 'HIGHBROW-POSTER', 100);
    const shipmentBatch = new Batch('shipment-batch-ref', 'HIGHBROW-POSTER', 100, tomorrow);
    const line = OrderLine.create({ orderId: 'oref', sku: 'HIGHBROW-POSTER', qty: 10 });
    const allocation = allocate(line, [inStockBatch, shipmentBatch]);

    expect(allocation).toBe(inStockBatch.reference);
  });

  test('raises out of stock error if cannot allocate', () => {
    const batch = new Batch('batch1', 'SMALL-FORK', 10, new Date());
    allocate(OrderLine.create({ orderId: 'order1', sku: 'SMALL-FORK', qty: 10 }), [batch]);

    expect(() => allocate(OrderLine.create({ orderId: 'order1', sku: 'SMALL-FORK', qty: 10 }), [batch])).toThrow(
      OutOfStockError,
    );
  });
});
