// require('dotenv).config({path:'./env'})

import dotenv from "dotenv";
// import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// console.log(`CORS Origin: ${process.env.CORS_ORIGIN}`);
// console.log(`Server Port: ${process.env.PORT}`);

// -------------------------------------------------------------------------------

import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen( 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT} `);
    });

   
  })
  .catch((error) => {
    console.log("MySQL connection failed !!!", error);
  });


 