import { DataTypes, Model, Sequelize } from 'sequelize';

type TBatch = {
  reference: string;
  sku: string;
  qty: number;
  eta?: string;
};

export type BatchEntityType = Model<TBatch, TBatch>;

export default (sequelize: Sequelize) =>
  sequelize.define('Batch', {
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
