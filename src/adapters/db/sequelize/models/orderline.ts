import { DataTypes, ModelCtor, Sequelize } from 'sequelize';

import { BatchEntityType } from './batch';

export default (sequelize: Sequelize, Batch: ModelCtor<BatchEntityType>) =>
  sequelize.define('OrderLine', {
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
        model: Batch,
        key: 'id',
      },
    },
  });
