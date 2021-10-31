import { OrderLine } from '@domain/models';
import { Allocations } from '@domain/models/allocations';

describe('Domain - Allocations', () => {
  let allocations: Allocations;
  let smallLine: OrderLine;
  let medLine: OrderLine;
  let largeLine: OrderLine;

  beforeEach(() => {
    allocations = new Allocations();

    smallLine = OrderLine.create({ orderId: 'o-ref', sku: 'CHAIR', qty: 5 });
    medLine = OrderLine.create({ orderId: 'o-ref', sku: 'CHAIR', qty: 10 });
    largeLine = OrderLine.create({ orderId: 'o-ref', sku: 'CHAIR', qty: 15 });
  });

  test('orderlines can be added', () => {
    allocations.add(smallLine);
    allocations.add(medLine);
    allocations.add(largeLine);

    let length = 0;
    allocations.forEach(() => (length += 1));

    expect(length).toBe(3);
  });
  test('orderlines can be removed', () => {
    allocations.add(smallLine);
    allocations.add(medLine);
    allocations.delete(medLine);

    let length = 0;
    allocations.forEach(() => (length += 1));

    expect(length).toBe(1);
  });
  test('orderlines must be unique ', () => {
    allocations.add(smallLine);
    allocations.add(smallLine);
    allocations.add(smallLine);

    let length = 0;
    allocations.forEach(() => (length += 1));

    expect(length).toBe(1);
  });
});
