"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewTypes_1 = require("./types/ViewTypes");
var SummaryPos_1 = require("./types/SummaryPos");
exports.Config = {
    schedulerWidth: '100%',
    besidesWidth: 200,
    schedulerMaxHeight: 0,
    tableHeaderHeight: 80,
    defaultResourceHeight: 100,
    agendaResourceTableWidth: 160,
    agendaMaxEventWidth: 100,
    dayResourceTableWidth: 160,
    weekResourceTableWidth: '16%',
    monthResourceTableWidth: 160,
    quarterResourceTableWidth: 160,
    yearResourceTableWidth: 160,
    customResourceTableWidth: 160,
    dayCellWidth: 30,
    weekCellWidth: '12%',
    monthCellWidth: 80,
    quarterCellWidth: 80,
    yearCellWidth: 4,
    customCellWidth: 80,
    dayMaxEvents: 99,
    weekMaxEvents: 99,
    monthMaxEvents: 99,
    quarterMaxEvents: 99,
    yearMaxEvents: 99,
    customMaxEvents: 99,
    eventItemHeight: 22,
    eventItemLineHeight: 24,
    nonAgendaSlotMinHeight: 0,
    dayStartFrom: 0,
    dayStopTo: 23,
    baseColor: 'white',
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3',
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: SummaryPos_1.SummaryPos.TopRight,
    groupOnlySlotColor: '#F8F8F8',
    stockBodyBgColor: '#e9e9e9',
    startResizable: true,
    endResizable: true,
    movable: true,
    creatable: true,
    crossResourceMove: true,
    checkConflict: false,
    scrollToSpecialMomentEnabled: true,
    eventItemPopoverEnabled: true,
    calendarPopoverEnabled: true,
    recurringEventsEnabled: true,
    headerEnabled: true,
    displayWeekend: true,
    relativeMove: true,
    defaultExpanded: true,
    resourceName: 'Resource Name',
    taskName: 'Task Name',
    agendaViewHeader: 'Agenda',
    addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
    eventItemPopoverDateFormat: 'MMM D',
    nonAgendaDayCellHeaderFormat: 'ha',
    nonAgendaOtherCellHeaderFormat: 'ddd M/D',
    minuteStep: 30,
    views: [
        { viewName: 'Day', viewType: ViewTypes_1.ViewTypes.Day, showAgenda: false, isEventPerspective: false },
        { viewName: 'Week', viewType: ViewTypes_1.ViewTypes.Week, showAgenda: false, isEventPerspective: false },
        { viewName: 'Month', viewType: ViewTypes_1.ViewTypes.Month, showAgenda: false, isEventPerspective: false },
        { viewName: 'Quarter', viewType: ViewTypes_1.ViewTypes.Quarter, showAgenda: false, isEventPerspective: false },
        { viewName: 'Year', viewType: ViewTypes_1.ViewTypes.Year, showAgenda: false, isEventPerspective: false },
    ],
};
