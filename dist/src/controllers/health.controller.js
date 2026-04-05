"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const ioc_types_1 = require("../config/ioc.types");
const ioc_config_1 = require("../config/ioc.config");
class HealthController {
    constructor(unitOfService = ioc_config_1.container.get(ioc_types_1.TYPES.IUnitOfService)) {
        this.unitOfService = unitOfService;
        this.unitOfService = unitOfService;
    }
    /**
     * Handles a health check request.
     *
     * Responds with a JSON object indicating the service status.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A response with HTTP status 200 and a JSON body `{ status: 'UP' }`.
     */
    async check(req, res) {
        return res.status(200).json({ status: "UP" });
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map