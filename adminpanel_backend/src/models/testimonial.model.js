import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Testimonial = sequelize.define(
  "Testimonial",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Enable timestamps if you want createdAt and updatedAt fields
    tableName: "testimonials",
  }
);

export default Testimonial;



// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const Testimonial = sequelize.define(
//     "testimonial",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },

//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING(1000),
//         allowNull: false,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

//   return Testimonial;
// };