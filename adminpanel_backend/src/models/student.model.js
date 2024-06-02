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





// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const Student = sequelize.define(
//     "student",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       school_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
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
//       pincode: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       mobile_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       syllabus: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       forgetToken: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       timestamps: true,
//       underscored: true,
//     }
//   );

//   return Student;
// };