import { Allocations } from './allocations';
import { OrderLine } from './orderline';

export class Batch {
  private _purchased_quantity: number;
  private _allocations: Allocations = new Allocations();
  reference: string;
  sku: string;
  eta?: Date;

  constructor(ref: string, sku: string, qty: number, eta?: Date) {
    this.reference = ref;
    this.sku = sku;
    this.eta = eta;
    this._purchased_quantity = qty;
  }

  get purchased_quantity() {
    return this._purchased_quantity;
  }

  get allocated_quantity() {
    let sum = 0;
    this._allocations.forEach((orderLine: OrderLine) => (sum += orderLine.qty));
    return sum;
  }

  get available_quantity() {
    return this._purchased_quantity - this.allocated_quantity;
  }

  can_allocate(line: OrderLine) {
    return this.sku == line.sku && this.available_quantity >= line.qty;
  }

  allocate(line: OrderLine) {
    if (this.can_allocate(line)) {
      this._allocations.add(line);
    }
  }

  deallocate(line: OrderLine) {
    return this._allocations.delete(line);
  }

  // helper methods

  static isBatch(other: unknown): other is Batch {
    return other instanceof Batch;
  }

  equals(other: unknown) {
    if (!Batch.isBatch(other)) return false;
    return this.reference == other.reference;
  }

  gt(other: unknown) {
    if (!Batch.isBatch(other)) return undefined;
    if (this.eta === undefined) return false;
    if (other.eta === undefined) return true;
    return this.eta > other.eta;
  }

  lt(other: unknown) {
    if (!Batch.isBatch(other)) return undefined;
    if (this.eta === undefined) return true;
    if (other.eta === undefined) return false;
    return this.eta < other.eta;
  }
}
