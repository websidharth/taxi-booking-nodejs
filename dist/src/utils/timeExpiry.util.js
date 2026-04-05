"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = void 0;
/**
 * Checks if a given time has expired based on expiry minutes
 * @param createdAt Date when OTP/token was created
 * @param expiryMinutes Number of minutes the OTP is valid
 * @returns true if expired, false otherwise
 */
const isExpired = (createdAt, expiryMinutes) => {
    const expiresAt = new Date(createdAt.getTime() + expiryMinutes * 60 * 1000);
    return Date.now() > expiresAt.getTime();
};
exports.isExpired = isExpired;
//# sourceMappingURL=timeExpiry.util.js.map