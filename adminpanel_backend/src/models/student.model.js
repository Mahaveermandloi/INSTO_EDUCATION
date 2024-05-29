import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    excel_file: {
      type: DataTypes.STRING, // Use BLOB('long') for LONGBLOB
      allowNull: false, // Allow null if the Excel file is optional
    },
    schoolname: {
      type: DataTypes.STRING,
      allowNull: false, // Adjust allowNull as necessary based on your requirements
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "students",
  }
);

export default Student;
