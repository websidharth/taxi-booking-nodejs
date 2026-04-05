"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchEmailAsync = void 0;
const nodemailer_1 = require("../nodemailer");
const templateRenderer_1 = require("../templateRenderer");
const dispatchEmailAsync = async ({ userId, to, subject, html, templateName, templateData }) => {
    try {
        let finalHtml = html;
        if (!finalHtml && templateName) {
            finalHtml = await (0, templateRenderer_1.renderTemplate)(templateName, templateData || {});
        }
        if (!finalHtml) {
            throw new Error("Email HTML content is missing");
        }
        const emailResponse = await (0, nodemailer_1.sendEmail)(to, subject, finalHtml);
        return emailResponse;
    }
    catch (error) {
        console.error("EMAIL DISPATCH FAILED:", error);
        return null;
    }
};
exports.dispatchEmailAsync = dispatchEmailAsync;
//# sourceMappingURL=emailDispatcher.util.js.map