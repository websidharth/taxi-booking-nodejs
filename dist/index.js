"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = require("./src/config/swagger");
const index_routes_1 = __importDefault(require("./src/routes/index.routes"));
const errorHandler_middleware_1 = __importDefault(require("./src/middleware/errorHandler.middleware"));
// Routes
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)()); // <--- Add this line BEFORE your routes
// If you want to be more specific (Optional but recommended for production):
/*
app.use(cors({
  origin: "*", // Allow all origins (good for development)
  // origin: ["http://192.168.1.67:4000", "http://localhost:3000","http://localhost:4000"], // Allow specific IPs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
*/
app.use(express_1.default.json());
// // --- VIEW ENGINE (HTML Serve karna) ---
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });
//app.use(asyncHandler(clientidMiddleware.verify));
//route setup --- SWAGGER ---
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use("/", ...swagger_ui_express_1.default.serveFiles(swaggerDocs, {
    swaggerOptions: {
        deepLinking: false,
    },
}));
app.get("/", swagger_ui_express_1.default.setup(swaggerDocs, {
    swaggerOptions: {
        deepLinking: false,
    },
}));
app.use("/", index_routes_1.default);
// Error-handling middleware
app.use(errorHandler_middleware_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger Docs at http://localhost:${port}/api`);
});
//# sourceMappingURL=index.js.map