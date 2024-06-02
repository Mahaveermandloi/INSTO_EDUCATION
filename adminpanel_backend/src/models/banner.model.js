// // image
// // timestamp
// import { DataTypes } from "sequelize";
// import { sequelize } from "../db/index.js";

// const Banner = sequelize.define(
//   "Banner",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     timestamp: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     timestamps: false, // Disabling sequelize default timestamps
//     tableName: "Banner",
//   }
// );

// export default Banner;





import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Banner = sequelize.define(
    "banner",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Banner;
};