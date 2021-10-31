import { OrderLine } from './orderline';

export class Allocations {
  private readonly _allocations: Set<OrderLine>;

  constructor(iterable?: Iterable<OrderLine>) {
    this._allocations = new Set<OrderLine>(iterable);
  }

  add(line: OrderLine) {
    let shouldAdd = true;
    this._allocations.forEach((orderLine: OrderLine) => {
      if (line.equals(orderLine)) shouldAdd = false;
    });
    if (shouldAdd) this._allocations.add(line);
  }

  delete(line: OrderLine) {
    return this._allocations.delete(line);
  }

  forEach(callbackFn: (value: OrderLine, value2: OrderLine, set: Set<OrderLine>) => void) {
    this._allocations.forEach(callbackFn);
  }
}
