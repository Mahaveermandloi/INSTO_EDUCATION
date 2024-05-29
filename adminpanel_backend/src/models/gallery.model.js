// image
// timestamp
import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Gallery = sequelize.define(
  "Gallery",
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
    tableName: "gallery",
  }
);

export default Gallery;
