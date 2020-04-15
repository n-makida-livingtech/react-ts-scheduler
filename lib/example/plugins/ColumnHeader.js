"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var Scheduler_1 = require("../../src/Scheduler");
exports.ColumnHeaderComponent = function (props) {
    var schedulerData = props.schedulerData, header = props.header, index = props.index, headersCount = props.headersCount;
    var config = schedulerData.config, cellUnit = schedulerData.cellUnit;
    var cellWidth = schedulerData.getContentCellWidth();
    var style = {};
    var currentDateStyle = {
        backgroundColor: "#118dea",
        color: "white",
    };
    if (cellUnit === Scheduler_1.CellUnits.Hour) {
        var minuteStepsInHour = schedulerData.getMinuteStepsInHour();
        if (index % minuteStepsInHour === 0) {
            style = !!header.nonWorkingTime ? { width: cellWidth * minuteStepsInHour, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: cellWidth * minuteStepsInHour };
            if (index === headersCount - minuteStepsInHour) {
                style = !!header.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};
            }
            var pFormattedList = config.nonAgendaDayCellHeaderFormat.split("|").map(function (i) { return moment(header.time).format(i); });
            if (moment(header.time).isSame(new Date(), "hour")) {
                style = currentDateStyle;
            }
            return React.createElement("th", { key: moment(header.time).format(), style: style, className: "header3-text" }, pFormattedList.map(function (i, ind) { return (React.createElement("div", { key: ind }, i)); }));
        }
    }
    else {
        style = !!header.nonWorkingTime ? { width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: cellWidth };
        if (index === headersCount - 1) {
            style = !!header.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};
        }
        if (moment(header.time).isSame(new Date(), "day")) {
            style = currentDateStyle;
        }
        var pFormattedList = config.nonAgendaOtherCellHeaderFormat.split("|").map(function (i) { return moment(header.time).format(i); });
        return React.createElement("th", { key: moment(header.time).format(), style: style, className: "header3-text" }, pFormattedList.map(function (i, ind) { return (React.createElement("div", { key: ind }, i)); }));
    }
};
//# sourceMappingURL=ColumnHeader.js.map