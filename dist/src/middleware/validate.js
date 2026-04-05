"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        // Check if body/query/params match the schema
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next(); // All good, proceed
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // Return a nice error message
            return res.status(400).json({
                error: "Validation Failed",
                details: error.issues.map((e) => ({
                    field: e.path[1], // e.g., "emailId"
                    message: e.message, // e.g., "Invalid email"
                })),
            });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map