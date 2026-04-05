"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeService = void 0;
const inversify_1 = require("inversify");
let DateTimeService = class DateTimeService {
    now() {
        return new Date();
    }
    nowISO() {
        return new Date().toISOString();
    }
    nowISTString() {
        return new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(new Date());
    }
    nowISTDbString(withSeconds = true) {
        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).formatToParts(new Date());
        const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
        const yyyy = get("year");
        const mm = get("month");
        const dd = get("day");
        const hh = get("hour");
        const min = get("minute");
        const sec = get("second");
        return withSeconds
            ? `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`
            : `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }
    addMinutes(minutes) {
        return new Date(Date.now() + minutes * 60 * 1000);
    }
};
exports.DateTimeService = DateTimeService;
exports.DateTimeService = DateTimeService = __decorate([
    (0, inversify_1.injectable)()
], DateTimeService);
//# sourceMappingURL=dateTime.service.js.map