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
var TaskList = (function (_super) {
    __extends(TaskList, _super);
    function TaskList(props) {
        return _super.call(this, props) || this;
    }
    TaskList.prototype.render = function () {
        var _a = this.props, schedulerData = _a.schedulerData, newEvent = _a.newEvent, taskDndSource = _a.taskDndSource;
        var DnDTaskItem = taskDndSource.getDragSource();
        var tasks = schedulerData.eventGroups;
        var taskList = tasks.map(function (item) {
            return React.createElement(DnDTaskItem, { key: item.id, task: item, newEvent: newEvent, schedulerData: schedulerData });
        });
        return (React.createElement("ul", null, taskList));
    };
    return TaskList;
}(react_1.Component));
exports.default = TaskList;
//# sourceMappingURL=TaskList.js.map