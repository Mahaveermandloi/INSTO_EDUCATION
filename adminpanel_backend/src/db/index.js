// import mysql from "mysql2";
// import { DB_NAME } from "../constant.js";

// const connectDB = async () => {
//   try {
//     const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

//     // const connection = mysql.createConnection({
//     //   host: "localhost",
//     //   user: "root",
//     //   port: 3306,
//     //   password: "admin",
//     //   database: "adminpanel",
//     // });

//     const connection = mysql.createConnection({
//       host: DB_HOST,
//       user: DB_USER,
//       port: DB_PORT,
//       password: DB_PASSWORD,
//       database: DB_NAME,
//     });

//     // Connect to the database
//     connection.connect();

//     // // Execute the query and await the result
//     // const [rows] = await connection.promise().query(`SELECT * FROM users`);

//     // // Output the result
//     // console.log("Users:", rows);

//     // Close the connection
//     // connection.end();

//   } catch (error) {
//     console.error("Error connecting to database or querying:", error);
//   }
// };

// export { connectDB };

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
