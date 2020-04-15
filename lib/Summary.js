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
var SummaryPos_1 = require("./types/SummaryPos");
var Summary = (function (_super) {
    __extends(Summary, _super);
    function Summary(props) {
        return _super.call(this, props) || this;
    }
    Summary.prototype.render = function () {
        var _a = this.props, summary = _a.summary, left = _a.left, width = _a.width, top = _a.top, schedulerData = _a.schedulerData;
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
        if (config.summaryPos === SummaryPos_1.SummaryPos.TopRight || config.summaryPos === SummaryPos_1.SummaryPos.BottomRight) {
            style.textAlign = "right";
        }
        else if (config.summaryPos === SummaryPos_1.SummaryPos.TopLeft || config.summaryPos === SummaryPos_1.SummaryPos.BottomLeft) {
            style.textAlign = "left";
        }
        if (summary.fontSize != undefined) {
            style.fontSize = summary.fontSize;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("a", { className: "timeline-event header2-text", style: { left: left, width: width, top: top, cursor: "default" } },
                React.createElement("div", { style: style }, summary.text)));
    };
    return Summary;
}(react_1.Component));
exports.default = Summary;
