"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Scheduler_1 = require("../../src/Scheduler");
exports.SummaryComponent = function (props) {
    var _a = _this.props, summary = _a.summary, left = _a.left, width = _a.width, top = _a.top, schedulerData = _a.schedulerData;
    var config = schedulerData.config;
    var style = {
        height: config.eventItemHeight,
        color: config.summaryColor,
        textAlign: "center",
        marginLeft: "6px",
        marginRight: "6px",
        fontSize: undefined,
    };
    if (summary.color != undefined) {
        style.color = summary.color;
    }
    if (config.summaryPos === Scheduler_1.SummaryPos.TopRight || config.summaryPos === Scheduler_1.SummaryPos.BottomRight) {
        style.textAlign = "right";
    }
    else if (config.summaryPos === Scheduler_1.SummaryPos.TopLeft || config.summaryPos === Scheduler_1.SummaryPos.BottomLeft) {
        style.textAlign = "left";
    }
    if (summary.fontSize != undefined) {
        style.fontSize = summary.fontSize;
    }
    return React.createElement(React.Fragment, null,
        React.createElement("a", { className: "timeline-event header2-text", style: { left: left, width: width, top: top, cursor: "default" } },
            React.createElement("div", { style: style }, summary.text)));
};
//# sourceMappingURL=Summary.js.map