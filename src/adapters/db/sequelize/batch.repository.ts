import { IRepository } from '@app/interfaces';
import { Batch } from '@domain/models';
import { Model, ModelCtor, Sequelize } from 'sequelize';

import { BatchMap } from './batch.mapper';
import BatchEntity, { BatchEntityType } from './models/batch';
import OrderLineEntity from './models/orderline';

export class SequelizeBatchRepository implements IRepository<Batch> {
  readonly BatchEntity: ModelCtor<BatchEntityType>;
  readonly OrderLineEntity: ModelCtor<Model<Record<string, unknown>, Record<string, unknown>>>;

  constructor(connection: Sequelize) {
    this.BatchEntity = BatchEntity(connection);
    this.OrderLineEntity = OrderLineEntity(connection, this.BatchEntity);
  }

  async add(batch: Batch) {
    await this.BatchEntity.create({
      reference: batch.reference,
      sku: batch.sku,
      eta: batch.eta && batch.eta.toUTCString(),
      qty: batch.purchased_quantity,
    });
  }

  async get(reference: string) {
    const batch = await this.BatchEntity.findOne({ where: { reference } });
    if (batch) return BatchMap.toDomain(batch);
  }

  async remove(reference: string) {
    await this.BatchEntity.destroy({ where: { reference } });
  }

  async list() {
    const batches = await this.BatchEntity.findAll();
    return batches.map((batch) => BatchMap.toDomain(batch));
  }
}
