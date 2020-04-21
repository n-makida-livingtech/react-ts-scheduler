import { ViewTypes } from './types/ViewTypes';
import { SummaryPos } from './types/SummaryPos';
export declare let Config: {
    schedulerWidth: string;
    besidesWidth: number;
    schedulerMaxHeight: number;
    tableHeaderHeight: number;
    agendaResourceTableWidth: number;
    agendaMaxEventWidth: number;
    dayResourceTableWidth: number;
    weekResourceTableWidth: string;
    monthResourceTableWidth: number;
    quarterResourceTableWidth: number;
    yearResourceTableWidth: number;
    customResourceTableWidth: number;
    dayCellWidth: number;
    weekCellWidth: string;
    monthCellWidth: number;
    quarterCellWidth: number;
    yearCellWidth: number;
    customCellWidth: number;
    dayMaxEvents: number;
    weekMaxEvents: number;
    monthMaxEvents: number;
    quarterMaxEvents: number;
    yearMaxEvents: number;
    customMaxEvents: number;
    eventItemHeight: number;
    eventItemLineHeight: number;
    nonAgendaSlotMinHeight: number;
    dayStartFrom: number;
    dayStopTo: number;
    defaultEventBgColor: string;
    selectedAreaColor: string;
    nonWorkingTimeHeadColor: string;
    nonWorkingTimeHeadBgColor: string;
    nonWorkingTimeBodyBgColor: string;
    summaryColor: string;
    summaryPos: SummaryPos;
    groupOnlySlotColor: string;
    stockBodyBgColor: string;
    startResizable: boolean;
    endResizable: boolean;
    movable: boolean;
    creatable: boolean;
    crossResourceMove: boolean;
    checkConflict: boolean;
    scrollToSpecialMomentEnabled: boolean;
    eventItemPopoverEnabled: boolean;
    calendarPopoverEnabled: boolean;
    recurringEventsEnabled: boolean;
    headerEnabled: boolean;
    displayWeekend: boolean;
    relativeMove: boolean;
    defaultExpanded: boolean;
    resourceName: string;
    taskName: string;
    agendaViewHeader: string;
    addMorePopoverHeaderFormat: string;
    eventItemPopoverDateFormat: string;
    nonAgendaDayCellHeaderFormat: string;
    nonAgendaOtherCellHeaderFormat: string;
    minuteStep: number;
    views: {
        viewName: string;
        viewType: ViewTypes;
        showAgenda: boolean;
        isEventPerspective: boolean;
    }[];
};