import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from 'cors';

import indexRouter from "./routes/index";
import taskRouter from "./routes/tasks";


dotenv.config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors({
  origin: ["http://localhost:3200"],
  methods:["GET","PUT", "POST", "PATCH", "DELETE"],
  credentials: true
}))

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`hello from the middleware`);
  next();
});

console.log(process.env.NODE_ENV);

app.use("/", indexRouter);
app.use("/api/v1/tasks", taskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
