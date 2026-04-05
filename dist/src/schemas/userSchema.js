"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
// Rule for Signup
exports.signupSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        lastName: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        phone: zod_1.z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .optional(),
    }),
});
// Rule for Login
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
// // Rule for Update
exports.updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        lastName: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().min(10).optional(),
    }),
});
//# sourceMappingURL=userSchema.js.map