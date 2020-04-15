"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var col_1 = require("antd/lib/col");
var row_1 = require("antd/lib/row");
var button_1 = require("antd/lib/button");
var popover_1 = require("antd/lib/popover");
var DemoData_1 = require("../utils/DemoData");
exports.PopoverComponent = function (props) {
    var connectDragSource = props.connectDragSource, connectDragPreview = props.connectDragPreview, timelineEvent = props.timelineEvent, startTime = props.startTime, endTime = props.endTime, schedulerData = props.schedulerData, eventItem = props.eventItem;
    var config = schedulerData.config;
    var bgColor = config.defaultEventBgColor;
    if (eventItem.bgColor) {
        bgColor = eventItem.bgColor;
    }
    return (React.createElement(popover_1.default, { placement: "bottomLeft", content: React.createElement("div", { style: { width: "300px" } },
            React.createElement(row_1.default, { type: "flex", align: "middle" },
                React.createElement(col_1.default, { span: 2 },
                    React.createElement("div", { className: "status-dot", style: { backgroundColor: bgColor } })),
                React.createElement(col_1.default, { span: 22, className: "overflow-text" },
                    React.createElement("span", { className: "header2-text", title: props.title }, props.title))),
            React.createElement(row_1.default, { type: "flex", align: "middle" },
                React.createElement(col_1.default, { span: 2 },
                    React.createElement("div", null)),
                React.createElement(col_1.default, { span: 22 },
                    React.createElement("span", { className: "header1-text" },
                        startTime.format(DemoData_1.DEMO_DATE_FORMAT),
                        " - ",
                        endTime.format(DemoData_1.DEMO_DATE_FORMAT)))),
            React.createElement(row_1.default, { type: "flex", align: "middle" },
                React.createElement(col_1.default, { span: 2 },
                    React.createElement("div", null)),
                React.createElement(col_1.default, { span: 22 },
                    React.createElement(button_1.default, { onClick: function () { alert("You just clicked demo button. event title: " + props.eventItem.title); } }, "Demo")))), trigger: "hover" }, props.connectDragPreview && connectDragPreview(connectDragSource(timelineEvent))));
};
//# sourceMappingURL=PopoverPlugin.js.map