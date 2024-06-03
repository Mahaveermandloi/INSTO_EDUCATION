// --------------------------------------connecting using sequelize --------------------------
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("adminpanel", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
   
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDB , sequelize };

// module.exports= sequelize;
