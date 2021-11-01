import { IRepository } from '@app/interfaces';
import { Batch } from '@domain/models';
import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

type TBatch = {
  reference: string;
  sku: string;
  qty: number;
  eta?: string;
};

type BatchEntity = Model<TBatch, TBatch>;

type Entities = {
  BatchEntity: ModelCtor<BatchEntity>;
  OrderLineEntity: ModelCtor<Model<Record<string, unknown>, Record<string, unknown>>>;
};

export class SqlRepository implements IRepository {
  private readonly _connection: Sequelize;
  readonly entities: Entities;

  constructor(connection: Sequelize) {
    this._connection = connection;
    this.entities = this._register_models();
  }

  async add(batch: Batch) {
    await this.entities.BatchEntity.create({
      reference: batch.reference,
      sku: batch.sku,
      eta: batch.eta && batch.eta.toUTCString(),
      qty: batch.purchased_quantity,
    });
  }

  async get(reference: string) {
    const batch = await this.entities.BatchEntity.findOne({ where: { reference } });
    if (batch) return this._instantiate_batch(batch);
  }

  async list() {
    const batches = await this.entities.BatchEntity.findAll();
    return batches.map((batch) => this._instantiate_batch(batch));
  }

  private _instantiate_batch(batch: BatchEntity) {
    let eta;
    if (batch._attributes.eta) {
      eta = new Date(batch._attributes.eta);
    }
    return new Batch(batch._attributes.reference, batch._attributes.sku, batch._attributes.qty, eta);
  }

  private _register_models() {
    const BatchEntity = this._connection.define('Batch', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eta: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    });

    const OrderLineEntity = this._connection.define('OrderLine', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.STRING,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        references: {
          model: BatchEntity,
          key: 'id',
        },
      },
    });

    return { BatchEntity, OrderLineEntity };
  }
}
