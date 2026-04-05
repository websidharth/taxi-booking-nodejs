"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const twilio_1 = require("./twilio");
class AuthService {
    async sendAndLogSms(params) {
        const { usersId, to, message } = params;
        const smsResp = await (0, twilio_1.sendSMS)(to, message);
        await prisma_1.default.userSms.create({
            data: {
                userId: usersId,
                phoneNumber: to,
                message,
                twilioResponse: JSON.parse(JSON.stringify(smsResp)),
            },
        });
        return smsResp;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map