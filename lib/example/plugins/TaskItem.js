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
var TaskItem = (function (_super) {
    __extends(TaskItem, _super);
    function TaskItem(props) {
        return _super.call(this, props) || this;
    }
    TaskItem.prototype.render = function () {
        var _a = this.props, task = _a.task, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource, connectDragPreview = _a.connectDragPreview;
        var dragContent = React.createElement("li", { style: { color: "red", fontWeight: "bold", fontSize: "20px", listStyle: "none" } }, task.name);
        return (isDragging ? null : (React.createElement("div", null, connectDragPreview(connectDragSource(dragContent)))));
    };
    return TaskItem;
}(react_1.Component));
exports.default = TaskItem;
//# sourceMappingURL=TaskItem.js.map