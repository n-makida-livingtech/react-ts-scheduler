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
var Summary = (function (_super) {
    __extends(Summary, _super);
    function Summary(props) {
        var _this = _super.call(this, props) || this;
        _this.getSummary = function (schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) {
            var text = headerEvents.length.toString();
            var color = '#d9d9d9';
            if (headerEvents.length > 0) {
                color = headerEvents.length <= 1 ? 'green' : 'red';
            }
            return { text: text, color: color, fontSize: '12px' };
        };
        _this.changeSummaryPos = function () {
            var schedulerData = _this.state.viewModel;
            schedulerData.config.summaryPos =
                schedulerData.config.summaryPos === Scheduler_1.SummaryPos.TopRight ? Scheduler_1.SummaryPos.BottomRight : Scheduler_1.SummaryPos.TopRight;
            _this.setState({
                viewModel: schedulerData,
            });
        };
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Week, false, false, undefined, {
            getSummaryFunc: _this.getSummary,
        });
        schedulerData.setResources(DemoData_1.DemoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.events);
        _this.state = {
            viewModel: schedulerData,
        };
        return _this;
    }
    Summary.prototype.render = function () {
        var viewModel = this.state.viewModel;
        var leftCustomHeader = (React.createElement("div", null,
            React.createElement("span", { style: { fontWeight: 'bold' } },
                React.createElement("a", { onClick: this.changeSummaryPos }, "Change summary position"))));
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, "Summary"),
                React.createElement(Scheduler_1.default, { schedulerData: viewModel, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this), onSetAddMoreState: ExampleFunction.onSetAddMoreState.bind(this), leftCustomHeader: leftCustomHeader }))));
    };
    return Summary;
}(react_1.Component));
exports.default = withDnDContext_1.default(Summary);
//# sourceMappingURL=Summary.js.map