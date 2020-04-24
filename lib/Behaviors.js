"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var ViewTypes_1 = require("./types/ViewTypes");
var CellUnits_1 = require("./types/CellUnits");
exports.getSummary = function (schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) {
    return { text: 'Summary', color: 'red', fontSize: '1.2rem' };
};
exports.getCustomDate = function (schedulerData, num, date) {
    if (date === void 0) { date = undefined; }
    var viewType = schedulerData.viewType;
    var selectDate = schedulerData.startDate;
    if (date != undefined) {
        selectDate = date;
    }
    var startDate = num === 0 ? selectDate : moment(selectDate).add(2 * num, 'days');
    var endDate = moment(startDate).add(1, 'days');
    var cellUnit = CellUnits_1.CellUnits.Hour;
    if (viewType === ViewTypes_1.ViewTypes.Custom1) {
        var monday = moment(selectDate).startOf('week');
        startDate = num === 0 ? monday : moment(monday).add(2 * num, 'weeks');
        endDate = moment(startDate).add(1, 'weeks').endOf('week');
        cellUnit = CellUnits_1.CellUnits.Day;
    }
    else if (viewType === ViewTypes_1.ViewTypes.Custom2) {
        var firstDayOfMonth = moment(selectDate).startOf('month');
        startDate = num === 0 ? firstDayOfMonth : moment(firstDayOfMonth).add(2 * num, 'months');
        endDate = moment(startDate).add(1, 'months').endOf('month');
        cellUnit = CellUnits_1.CellUnits.Day;
    }
    return {
        startDate: startDate,
        endDate: endDate,
        cellUnit: cellUnit,
    };
};
exports.getDateLabel = function (schedulerData, viewType, startDate, endDate) {
    var start = moment(startDate);
    var end = moment(endDate);
    var dateLabel = start.format('MMM D, YYYY');
    console.log(start);
    if (viewType === ViewTypes_1.ViewTypes.Week ||
        (start != end &&
            (viewType === ViewTypes_1.ViewTypes.Custom || viewType === ViewTypes_1.ViewTypes.Custom1 || viewType === ViewTypes_1.ViewTypes.Custom2))) {
        dateLabel = start.format('MMM D') + "-" + end.format('D, YYYY');
        if (start.month() !== end.month()) {
            dateLabel = start.format('MMM D') + "-" + end.format('MMM D, YYYY');
        }
        if (start.year() !== end.year()) {
            dateLabel = start.format('MMM D, YYYY') + "-" + end.format('MMM D, YYYY');
        }
    }
    else if (viewType === ViewTypes_1.ViewTypes.Month) {
        dateLabel = start.format('MMMM YYYY');
    }
    else if (viewType === ViewTypes_1.ViewTypes.Quarter) {
        dateLabel = start.format('MMM D') + "-" + end.format('MMM D, YYYY');
    }
    else if (viewType === ViewTypes_1.ViewTypes.Year) {
        dateLabel = start.format('YYYY');
    }
    return dateLabel;
};
exports.getEventText = function (schedulerData, event) {
    if (!schedulerData.isEventPerspective) {
        return event.title;
    }
    var eventText = event.title;
    schedulerData.resources.forEach(function (item) {
        if (item.id === event.resourceId) {
            eventText = item.name;
        }
    });
    return eventText;
};
exports.getScrollSpecialMoment = function (schedulerData, startMoment, endMoment) {
    return endMoment;
};
exports.isNonWorkingTime = function (schedulerData, time) {
    if (schedulerData.cellUnit === CellUnits_1.CellUnits.Hour) {
        var hour = moment(time).hour();
        if (hour < 9 || hour > 18) {
            return true;
        }
    }
    else {
        var dayOfWeek = moment(time).weekday();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return true;
        }
    }
    return false;
};
exports.default = {
    getSummaryFunc: undefined,
    getCustomDateFunc: undefined,
    getNonAgendaViewBodyCellBgColorFunc: undefined,
    getScrollSpecialMomentFunc: exports.getScrollSpecialMoment,
    getDateLabelFunc: exports.getDateLabel,
    getEventTextFunc: exports.getEventText,
    isNonWorkingTimeFunc: exports.isNonWorkingTime,
};
