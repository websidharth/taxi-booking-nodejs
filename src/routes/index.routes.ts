import express from "express";
import accountRouter from "./authRoutes";
import userRouter from "./userRoutes";
import healthRouter from "./health.routes";
import emailRouter from "./emailRoutes";
import newsletterRouter from "./newsletterRoutes";

const routes = express.Router();

routes.use("/auth", accountRouter);
routes.use("/users", userRouter);
routes.use("/email", emailRouter);
routes.use("/health", healthRouter);
routes.use("/newsletter", newsletterRouter); 

export default routes;
