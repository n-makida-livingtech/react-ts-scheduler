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
var col_1 = require("antd/lib/col");
var row_1 = require("antd/lib/row");
var Scheduler_1 = require("../src/Scheduler");
var DemoData_1 = require("./utils/DemoData");
var DnDTypes_1 = require("../src/types/DnDTypes");
var TaskItem_1 = require("./plugins/TaskItem");
var TaskList_1 = require("./plugins/TaskList");
var ResourceItem_1 = require("./plugins/ResourceItem");
var ResourceList_1 = require("./plugins/ResourceList");
var Nav_1 = require("./utils/Nav");
var withDnDContext_1 = require("./utils/withDnDContext");
var ExampleFunction = require("./utils/ExampleFunctions");
var DragAndDrop = (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop(props) {
        var _this = _super.call(this, props) || this;
        _this.subtitleGetter = function (args) {
            return args.schedulerData.isEventPerspective
                ? args.schedulerData.getResourceById(args.event.resourceId).name
                : args.event.groupName;
        };
        var views = [
            { viewName: 'Resource View', viewType: Scheduler_1.SchedulerViewTypes.Month, showAgenda: false, isEventPerspective: false },
        ];
        var schedulerData = new Scheduler_1.SchedulerData(ExampleFunction.updateSchedulerDataState.bind(_this), ExampleFunction.getNow(), Scheduler_1.SchedulerViewTypes.Month, false, false, {
            schedulerWidth: '80%',
            schedulerMaxHeight: 500,
            views: views,
        });
        schedulerData.setResources(DemoData_1.DemoData.resources);
        schedulerData.setEvents(DemoData_1.DemoData.eventsForTaskView);
        _this.state = {
            viewModel: schedulerData,
            taskDndSource: new Scheduler_1.SchedulerDnDSource(function (p) { return p.task; }, TaskItem_1.default, DnDTypes_1.DnDTypes.TASK),
            resourceDndSource: new Scheduler_1.SchedulerDnDSource(function (p) { return p.resource; }, ResourceItem_1.default, DnDTypes_1.DnDTypes.RESOURCE),
        };
        return _this;
    }
    DragAndDrop.prototype.render = function () {
        var _a = this.state, viewModel = _a.viewModel, taskDndSource = _a.taskDndSource, resourceDndSource = _a.resourceDndSource;
        var h3 = viewModel.isEventPerspective
            ? 'Drag and drop from outside: Drag a resource and drop to the task view'
            : 'Drag and drop from outside: Drag a task and drop to the resource view';
        var dndList = viewModel.isEventPerspective ? (React.createElement(ResourceList_1.default, { schedulerData: viewModel, newEvent: ExampleFunction.newEvent.bind(this), resourceDndSource: resourceDndSource })) : (React.createElement(TaskList_1.default, { schedulerData: viewModel, newEvent: ExampleFunction.newEvent.bind(this), taskDndSource: taskDndSource }));
        var dndSources = [taskDndSource, resourceDndSource];
        return (React.createElement("div", null,
            React.createElement(Nav_1.default, null),
            React.createElement("div", null,
                React.createElement("h3", { style: { textAlign: 'center' } }, h3),
                React.createElement(row_1.default, null,
                    React.createElement(col_1.default, { span: 20 },
                        React.createElement(Scheduler_1.default, { schedulerData: viewModel, prevClick: ExampleFunction.prevClick.bind(this), nextClick: ExampleFunction.nextClick.bind(this), onSelectDate: ExampleFunction.onSelectDate.bind(this), onViewChange: ExampleFunction.onViewChange.bind(this), updateEventStart: ExampleFunction.updateEventStart.bind(this), updateEventEnd: ExampleFunction.updateEventEnd.bind(this), moveEvent: ExampleFunction.moveEvent.bind(this), newEvent: ExampleFunction.newEvent.bind(this), newStock: ExampleFunction.newStock.bind(this), onSetAddMoreState: ExampleFunction.onSetAddMoreState.bind(this), dndSources: dndSources })),
                    React.createElement(col_1.default, { span: 4 }, dndList)))));
    };
    return DragAndDrop;
}(react_1.Component));
exports.default = withDnDContext_1.default(DragAndDrop);
//# sourceMappingURL=DragAndDrop.js.map