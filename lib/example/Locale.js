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
var Locale = (function (_super) {
    __extends(Locale, _super);
    function Locale(props) {
        var _this = _super.call(this, props) || this;
        _this.getDateLabel = function (schedulerData, viewType, startDate, endDate) {
            var start = moment(startDate);
            var end = moment(endDate);
            var dateLabel = start.format('YYYY年M月D日');
            if (viewType === Scheduler_1.SchedulerViewTypes.Week) {
                dateLabel = start.format('YYYY年M月D日') + "-" + end.format('D日');
                if (start.month() !== end.month()) {
                    dateLabel = start.format('YYYY年M月D日') + "-" + end.format('M月D日');
                }
                if (start.year() !== end.year()) {
                    dateLabel = start.format('YYYY年M月D日') + "-" + end.format('YYYY年M月D日');
                }
            }
            else if (viewType === Scheduler_1.SchedulerViewTypes.Month) {
                dateLabel = start.format('YYYY年M月');
            }
            else if (viewType === Scheduler_1.SchedulerViewTypes.Quarter) {
                dateLabel = start.format('YYYY年M月D日') + "-" + end.format('M月D日');
            }
            else if (viewType === Scheduler_1.SchedulerViewTypes.Year) {
                dateLabel = start.format('YYYY年');
            }
            return dateLabel;
        };
        _this.isNonWorkingTime = function (schedulerData, time) {
            if (schedulerData.viewType === Scheduler_1.SchedulerViewTypes.Day) {
                var hour = moment(time).hour();
                if (hour < 9 || hour > 18) {
                    return true;
                }
            }
            else {
                var dayOfWeek = moment(time).weekday();
                if (dayOfWeek === 5 || dayOfWeek === 6) {
                    return true;
                }
            }
            return false;
        };
        moment.locale('zh-cn');
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Week, false, false, {
            dayMaxEvents: 2,
            weekMaxEvents: 4,
            monthMaxEvents: 4,
            yearMaxEvents: 4,
            resourceName: '资源名称',
            taskName: '任务名称',
            agendaViewHeader: '工作事项',
            addMorePopoverHeaderFormat: 'YYYY年M月D日 dddd',
            eventItemPopoverDateFormat: 'M月D日',
            nonAgendaDayCellHeaderFormat: 'HH:mm',
            nonAgendaOtherCellHeaderFormat: 'ddd|M/D',
            views: [
                { viewName: '天', viewType: Scheduler_1.SchedulerViewTypes.Day, showAgenda: false, isEventPerspective: false },
                { viewName: '周', viewType: Scheduler_1.SchedulerViewTypes.Week, showAgenda: false, isEventPerspective: false },
                { viewName: '月', viewType: Scheduler_1.SchedulerViewTypes.Month, showAgenda: false, isEventPerspective: false },
                { viewName: '季', viewType: Scheduler_1.SchedulerViewTypes.Quarter, showAgenda: false, isEventPerspective: false },
                { viewName: '年', viewType: Scheduler_1.SchedulerViewTypes.Year, showAgenda: false, isEventPerspective: false },
            ],
        }, {
            getDateLabelFunc: _this.getDateLabel,
            isNonWorkingTimeFunc: _this.isNonWorkingTime,
        });
        schedulerData.setResources(DemoData_1.DemoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.events);
        _this.state = {
            viewModel: schedulerData,
            headerItem: undefined,
            left: 0,
            top: 0,
            height: 0,
        };
        return _this;
    }
    Locale.prototype.render = function () {
        var viewModel = this.state.viewModel;
        var popover = React.createElement("div", null);
        if (this.state.headerItem !== undefined) {
            {
            }
        }
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, "Locale"),
                React.createElement(Scheduler_1.default, { schedulerData: viewModel, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this), onSetAddMoreState: ExampleFunction.onSetAddMoreState.bind(this) }),
                popover)));
    };
    return Locale;
}(react_1.Component));
exports.default = withDnDContext_1.default(Locale);
//# sourceMappingURL=Locale.js.map