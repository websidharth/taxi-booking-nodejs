import { IDateTimeService } from "./interfaces/idatetime.service";
export declare class DateTimeService implements IDateTimeService {
    now(): Date;
    nowISO(): string;
    nowISTString(): string;
    nowISTDbString(withSeconds?: boolean): string;
    addMinutes(minutes: number): Date;
}
//# sourceMappingURL=dateTime.service.d.ts.map