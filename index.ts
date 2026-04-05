import "reflect-metadata";
import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./src/config/swagger";
import routes from "./src/routes/index.routes";
import asyncHandler from "./src/middleware/asyncHandler.middleware";
import clientidMiddleware from "./src/middleware/clientid.middleware";
import errorHandler from "./src/middleware/errorHandler.middleware";
// Routes

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // <--- Add this line BEFORE your routes

// If you want to be more specific (Optional but recommended for production):
/*
app.use(cors({
  origin: "*", // Allow all origins (good for development)
  // origin: ["http://192.168.1.67:4000", "http://localhost:3000","http://localhost:4000"], // Allow specific IPs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
*/

app.use(express.json());

// // --- VIEW ENGINE (HTML Serve karna) ---
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

 //app.use(asyncHandler(clientidMiddleware.verify));



//route setup --- SWAGGER ---
const swaggerDocs = swaggerJsdoc(swaggerOptions);
 
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs, 
  {swaggerOptions: {
      deepLinking: false,
    },
  })
);

app.use("/", routes);

 


// Error-handling middleware
  app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger Docs at http://localhost:${port}/api`);
});
