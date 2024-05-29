import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const School = sequelize.define(
  "School",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null if the logo is optional
    },
  },
  {
    timestamps: false,
    tableName: "schools",
  }
);

export default School;

// CREATE TABLE schools (
//     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
//     name VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     logo BLOB NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );
