"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate4DigitOtp = exports.nowISO = exports.createUserName = exports.buildUserName = exports.getAdmissionId = exports.getCustomId = exports.userAge = exports.generateCustomId = exports.generateUserGUIDWithPrefix = exports.generateUserGUID = void 0;
const uuid_1 = require("uuid");
const generateUserGUID = () => {
    return (0, uuid_1.v4)(); // Generates unique UUID v4
};
exports.generateUserGUID = generateUserGUID;
// Optional: Generate GUID with prefix
const generateUserGUIDWithPrefix = () => {
    return `${(0, uuid_1.v4)()}`;
};
exports.generateUserGUIDWithPrefix = generateUserGUIDWithPrefix;
const generateCustomId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return randomNum; // Return just the number
};
exports.generateCustomId = generateCustomId;
const userAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};
exports.userAge = userAge;
const getCustomId = () => {
    return parseInt(new Date().getFullYear().toString() + (0, exports.generateCustomId)().toString());
};
exports.getCustomId = getCustomId;
const getAdmissionId = (lastUser) => {
    return ("User" + new Date().getFullYear() + (parseInt(lastUser) + 1).toString());
};
exports.getAdmissionId = getAdmissionId;
const buildUserName = (firstName, lastName) => {
    return `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "");
};
exports.buildUserName = buildUserName;
const createUserName = (firstName, lastName) => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${firstName}${lastName}${random}`.toLowerCase().replace(/\s+/g, "");
};
exports.createUserName = createUserName;
const nowISO = () => {
    return new Date().toISOString();
};
exports.nowISO = nowISO;
const generate4DigitOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
exports.generate4DigitOtp = generate4DigitOtp;
//# sourceMappingURL=authHelpers.service.js.map