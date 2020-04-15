import * as moment from "moment";
import { CellUnits } from "./types/CellUnits";
import { SchedulerData } from "./Scheduler";
import { Event } from "./SchedulerData";
export declare const getSummary: (schedulerData: SchedulerData, headerEvents: Event[], slotId: string, slotName: string, headerStart: any, headerEnd: any) => {
    text: string;
    color: string;
    fontSize: string;
};
export declare const getCustomDate: (schedulerData: SchedulerData, num: number, date?: moment.Moment) => {
    startDate: moment.Moment;
    endDate: moment.Moment;
    cellUnit: CellUnits;
};
export declare const getDateLabel: (schedulerData: SchedulerData, viewType: number, startDate: moment.Moment, endDate: moment.Moment) => string;
export declare const getEventText: (schedulerData: SchedulerData, event: Event) => string;
export declare const getScrollSpecialMoment: (schedulerData: SchedulerData, startMoment: moment.Moment, endMoment: moment.Moment) => moment.Moment;
export declare const isNonWorkingTime: (schedulerData: SchedulerData, time: moment.Moment) => boolean;
declare const _default: {
    getSummaryFunc: any;
    getCustomDateFunc: any;
    getNonAgendaViewBodyCellBgColorFunc: any;
    getScrollSpecialMomentFunc: (schedulerData: SchedulerData, startMoment: moment.Moment, endMoment: moment.Moment) => moment.Moment;
    getDateLabelFunc: (schedulerData: SchedulerData, viewType: number, startDate: moment.Moment, endDate: moment.Moment) => string;
    getEventTextFunc: (schedulerData: SchedulerData, event: Event) => string;
    isNonWorkingTimeFunc: (schedulerData: SchedulerData, time: moment.Moment) => boolean;
};
export default _default;
