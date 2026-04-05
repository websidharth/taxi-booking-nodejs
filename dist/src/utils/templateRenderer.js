"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = renderTemplate;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
async function renderTemplate(templateName, variables) {
    const baseDir = path_1.default.join(__dirname, "..", "templetes");
    const filePath = path_1.default.join(baseDir, `${templateName}.html`);
    let html = await fs_1.promises.readFile(filePath, "utf-8");
    // Replace {{key}} with value for all variables provided
    for (const [key, value] of Object.entries(variables)) {
        const re = new RegExp(`{{\\s*${escapeRegex(key)}\\s*}}`, "g");
        html = html.replace(re, value ?? "");
    }
    // Clean up any unreplaced placeholders
    html = html.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, "");
    return html;
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//# sourceMappingURL=templateRenderer.js.map