"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const health_routes_1 = __importDefault(require("./health.routes"));
const emailRoutes_1 = __importDefault(require("./emailRoutes"));
const newsletterRoutes_1 = __importDefault(require("./newsletterRoutes"));
const routes = express_1.default.Router();
routes.use("/auth", authRoutes_1.default);
routes.use("/users", userRoutes_1.default);
routes.use("/email", emailRoutes_1.default);
routes.use("/health", health_routes_1.default);
routes.use("/newsletter", newsletterRoutes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map