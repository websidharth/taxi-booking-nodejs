import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";
import routes from "./routes/index.routes";
import errorHandler from "./middleware/errorHandler.middleware";

dotenv.config();

const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use(
  "/",
  ...swaggerUi.serveFiles(swaggerDocs, {
    swaggerOptions: {
      deepLinking: false,
    },
  })
);

app.get(
  "/",
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      deepLinking: false,
    },
  })
);

app.use("/", routes);
app.use(errorHandler);

export default app;
