import express from "express";
import cors from "cors";
import EmployeeRouter from "./routes/employee.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/employee", EmployeeRouter);

export { app };
