import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize";

const File = sequelize.define(
  "File",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mask: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference_number: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["income", "sale", "expense"]],
      },
      allowNull: false,
    },
  },
  {
    createdAt: true,
    indexes: [
      {
        unique: true,
        fields: [
          "type",
          "mask",
          "amount",
          "details",
          "balance",
          "currency",
          "description",
          "reference_number",
        ],
      },
    ],
  }
);

export default File;
