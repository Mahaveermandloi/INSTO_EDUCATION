// image
// timestamp
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Banner = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disabling sequelize default timestamps
    tableName: "Banner",
  }
);

export default Banner;
