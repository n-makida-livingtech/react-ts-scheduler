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
var moment = require("moment");
var React = require("react");
var react_1 = require("react");
var Scheduler_1 = require("../src/Scheduler");
var DemoData_1 = require("./utils/DemoData");
var ExampleFunction = require("./utils/ExampleFunctions");
var Nav_1 = require("./utils/Nav");
var Tips_1 = require("./utils/Tips");
var withDnDContext_1 = require("./utils/withDnDContext");
require("antd/lib/style/index.css");
var PopoverPlugin_1 = require("./plugins/PopoverPlugin");
var RowHeader_1 = require("./plugins/RowHeader");
var EventPlugin_1 = require("./plugins/EventPlugin");
var ColumnHeader_1 = require("./plugins/ColumnHeader");
var Basic = (function (_super) {
    __extends(Basic, _super);
    function Basic(props) {
        var _this = _super.call(this, props) || this;
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Year);
        moment.locale('ja-JP');
        var demoData = DemoData_1.DemoData;
        schedulerData.setResources(demoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.events);
        schedulerData.setStocks(DemoData_1.DemoData.stocks);
        _this.state = {
            viewModel: schedulerData,
            update: ExampleFunction.getNow(),
        };
        return _this;
    }
    Basic.prototype.render = function () {
        var viewModel = this.state.viewModel;
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, "Basic example"),
                React.createElement(Scheduler_1.default, { RowHeaderFC: RowHeader_1.RowHeaderComponent, PopoverFC: PopoverPlugin_1.PopoverComponent, EventFC: EventPlugin_1.EventComponentRound, ColumnHeaderFC: ColumnHeader_1.ColumnHeaderComponent, schedulerData: viewModel, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this), onSetAddMoreState: ExampleFunction.onSetAddMoreState.bind(this) })),
            React.createElement(Tips_1.default, null)));
    };
    return Basic;
}(react_1.Component));
exports.default = withDnDContext_1.default(Basic);
//# sourceMappingURL=Basic.js.map