import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.routes.js";


// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files from the specified directory
const staticFilesPath = path.join(__dirname, "../../../adminpanel/public/temp");
app.use("/temp", express.static(staticFilesPath));

app.use("/", userRouter);

export { app };
