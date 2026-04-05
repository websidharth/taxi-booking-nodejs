"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastRecord = getLastRecord;
/**
 * Get last record ordered by a column
 * @param model Prisma model name (ex: prisma.users)
 * @param column Column name (ex: "id", "createdAt")
 */
async function getLastRecord(model, column) {
    return model.findFirst({
        orderBy: {
            [column]: "desc",
        },
    });
}
//# sourceMappingURL=dbHelpers.service.js.map