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
var DemoData_1 = require("./utils/DemoData");
var Nav_1 = require("./utils/Nav");
var withDnDContext_1 = require("./utils/withDnDContext");
var EventPlugin_1 = require("./plugins/EventPlugin");
var PopoverPlugin_1 = require("./plugins/PopoverPlugin");
var RowHeader_1 = require("./plugins/RowHeader");
var CustomHeaders = (function (_super) {
    __extends(CustomHeaders, _super);
    function CustomHeaders(props) {
        var _this = _super.call(this, props) || this;
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Week, false, false, {
            calendarPopoverEnabled: false,
        });
        schedulerData.setResources(DemoData_1.DemoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.events);
        _this.state = {
            viewModel: schedulerData,
        };
        return _this;
    }
    CustomHeaders.prototype.render = function () {
        var viewModel = this.state.viewModel;
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, "Custom table headers (with disabled calendar popup)"),
                React.createElement(Scheduler_1.default, { schedulerData: viewModel, EventFC: EventPlugin_1.EventComponentRound, PopoverFC: PopoverPlugin_1.PopoverComponent, RowHeaderFC: RowHeader_1.RowHeaderComponent, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this) }))));
    };
    return CustomHeaders;
}(react_1.Component));
exports.default = withDnDContext_1.default(CustomHeaders);
//# sourceMappingURL=CustomTableHeaders.js.map