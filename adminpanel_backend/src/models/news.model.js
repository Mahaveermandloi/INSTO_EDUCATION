import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "news",
  }
);

export default News;



// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const newsAndUpdates = sequelize.define(
//     "news_update",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       image: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       post_By: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       timestamps: true,
//       underscored: true,
//     }
//   );

//   return newsAndUpdates;
// };