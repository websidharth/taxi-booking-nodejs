"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const nodemailer_1 = require("./nodemailer");
const twilio_1 = require("./twilio");
class CommunicationService {
    async sendEmails({ to, subject, html }) {
        const emailResp = await (0, nodemailer_1.sendEmail)(to, subject, html);
        return emailResp;
    }
    async sendAndLogEmail({ usersId, to, subject, html }) {
        const emailResp = await (0, nodemailer_1.sendEmail)(to, subject, html);
        // await prisma.userEmail.create({
        //   data: {
        //     userId: usersId,
        //     recipient: to,
        //     subject,
        //     htmlContent: html,
        //     emailResponse: JSON.parse(JSON.stringify(emailResp)),
        //   },
        // });
        return emailResp;
    }
    async sendAndLogSms({ usersId, to, message }) {
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
    // ✅ Reusable convenience function (example)
    async sendWelcomeEmail(params) {
        const { usersId, to, fullName, admissionNumber } = params;
        return this.sendAndLogEmail({
            usersId,
            to,
            subject: "Welcome to Our Platform 🎉",
            html: `
        <h2>Welcome ${fullName}!</h2>
        <p>Your account has been successfully created.</p>
        <p><b>Admission Number:</b> ${admissionNumber}</p>
      `,
        });
    }
}
exports.CommunicationService = CommunicationService;
//# sourceMappingURL=communication.service.js.map