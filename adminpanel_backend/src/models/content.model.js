import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const ImageContent = sequelize.define(
  "ImageContent",
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
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disabling sequelize default timestamps
    tableName: "imagecontent",
  }
);

const VideoContent = sequelize.define(
  "VideoContent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disabling sequelize default timestamps
    tableName: "videocontent",
  }
);

const PdfContent = sequelize.define(
  "PdfContent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disabling sequelize default timestamps
    tableName: "pdfcontent",
  }
);

export { ImageContent, VideoContent, PdfContent };




// import { DataTypes } from "sequelize";

// export default (sequelize) => {
//   const Resources = sequelize.define(
//     "resource",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },

//       resource_type: {
//         type: DataTypes.ENUM("image", "pdf", "video"),
//         allowNull: false,
//       },
//       is_paid: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },

//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       upload_by: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "",
//       },
//       resource_url: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       thumbnail: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

//   return Resources;
// };