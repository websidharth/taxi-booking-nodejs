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
const swagger_1 = require("./config/swagger");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.use(errorHandler_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map