"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const port = process.env.PORT || 4000;
app_1.default.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger Docs at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map