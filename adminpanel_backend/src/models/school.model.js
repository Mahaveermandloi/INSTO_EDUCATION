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



// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const School = sequelize.define(
//     "school",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       school_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isEmail: true,
//         },
//       },
//       address: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       city: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       state: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       district: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       pincode: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       STD_code: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       landline: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       mobile_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       principal_name_prefix: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       principal_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },

//       syllabus: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: "pending",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

//   return School;
// };