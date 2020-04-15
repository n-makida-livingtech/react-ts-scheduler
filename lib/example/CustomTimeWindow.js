"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var Scheduler_1 = require("../src/Scheduler");
var ExampleFunction = require("./utils/ExampleFunctions");
var moment = require("moment");
var DemoData_1 = require("./utils/DemoData");
var Nav_1 = require("./utils/Nav");
var withDnDContext_1 = require("./utils/withDnDContext");
var CustomTimeWindow = (function (_super) {
    __extends(CustomTimeWindow, _super);
    function CustomTimeWindow(props) {
        var _this = _super.call(this, props) || this;
        _this.getCustomDate = function (schedulerData, num, date) {
            if (date === void 0) { date = undefined; }
            var viewType = schedulerData.viewType;
            var selectDate = schedulerData.startDate;
            if (date != undefined) {
                selectDate = date;
            }
            var startDate = num === 0 ? selectDate : moment(selectDate).add(2 * num, 'days');
            var endDate = moment(startDate).add(1, 'days');
            var cellUnit = Scheduler_1.CellUnits.Hour;
            if (viewType === Scheduler_1.SchedulerViewTypes.Custom1) {
                var monday = moment(selectDate).startOf('week');
                startDate = num === 0 ? monday : moment(monday).add(2 * num, 'weeks');
                endDate = moment(startDate).add(1, 'weeks').endOf('week');
                cellUnit = Scheduler_1.CellUnits.Day;
            }
            else if (viewType === Scheduler_1.SchedulerViewTypes.Custom2) {
                var firstDayOfMonth = moment(selectDate).startOf('month');
                startDate = num === 0 ? firstDayOfMonth : moment(firstDayOfMonth).add(2 * num, 'months');
                endDate = moment(startDate).add(1, 'months').endOf('month');
                cellUnit = Scheduler_1.CellUnits.Day;
            }
            return {
                startDate: startDate,
                endDate: endDate,
                cellUnit: cellUnit,
            };
        };
        _this.isNonWorkingTime = function (schedulerData, time) {
            if (schedulerData.cellUnit === Scheduler_1.CellUnits.Hour) {
                var hour = moment(time).hour();
                if (hour < 1) {
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
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Custom, false, false, {
            customCellWidth: 30,
            views: [
                { viewName: 'Two days', viewType: Scheduler_1.SchedulerViewTypes.Custom, showAgenda: false, isEventPerspective: false },
                { viewName: 'Two weeks', viewType: Scheduler_1.SchedulerViewTypes.Custom1, showAgenda: false, isEventPerspective: false },
                {
                    viewName: 'Two months',
                    viewType: Scheduler_1.SchedulerViewTypes.Custom2,
                    showAgenda: false,
                    isEventPerspective: false,
                },
            ],
        }, {
            getCustomDateFunc: _this.getCustomDate,
            isNonWorkingTimeFunc: _this.isNonWorkingTime,
        });
        schedulerData.setResources(DemoData_1.DemoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.events);
        _this.state = {
            viewModel: schedulerData,
        };
        return _this;
    }
    CustomTimeWindow.prototype.render = function () {
        var viewModel = this.state.viewModel;
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, "Custom time window"),
                React.createElement(Scheduler_1.default, { schedulerData: viewModel, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this) }))));
    };
    return CustomTimeWindow;
}(react_1.Component));
exports.default = withDnDContext_1.default(CustomTimeWindow);
//# sourceMappingURL=CustomTimeWindow.js.map