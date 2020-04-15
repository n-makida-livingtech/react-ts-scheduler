"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.EventComponent = function (props) {
    var borderWidth = props.isStart ? "4" : "0";
    var borderColor = "rgba(0,139,236,1)";
    var backgroundColor = "#80C5F6";
    var titleText = props.schedulerData.behaviors.getEventTextFunc(props.schedulerData, props.eventItem);
    if (!!props.eventItem.type) {
        borderColor = props.eventItem.type == 1 ? "rgba(0,139,236,1)" : (props.eventItem.type == 3 ? "rgba(245,60,43,1)" : "#999");
        backgroundColor = props.eventItem.type == 1 ? "#80C5F6" : (props.eventItem.type == 3 ? "#FA9E95" : "#D9D9D9");
    }
    var divStyle = { borderLeft: borderWidth + "px solid " + borderColor, backgroundColor: backgroundColor, height: props.mustBeHeight, maxWidth: undefined };
    if (!!props.agendaMaxEventWidth) {
        divStyle = __assign(__assign({}, divStyle), { maxWidth: props.agendaMaxEventWidth });
    }
    return React.createElement("div", { key: props.eventItem.id, className: props.mustAddCssClass, style: divStyle },
        React.createElement("span", { style: { marginLeft: "4px", lineHeight: props.mustBeHeight + "px" } }, titleText));
};
exports.EventComponentRound = function (props) {
    var schedulerData = props.schedulerData, eventItem = props.eventItem, isStart = props.isStart, isEnd = props.isEnd, isInPopover = props.isInPopover, startResizeDiv = props.startResizeDiv, endResizeDiv = props.endResizeDiv;
    var config = schedulerData.config;
    var titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
    var bgColor = config.defaultEventBgColor;
    if (eventItem.bgColor) {
        bgColor = eventItem.bgColor;
    }
    var roundCls = isStart ? (isEnd ? "round-all" : "round-head") : (isEnd ? "round-tail" : "round-none");
    var eventItemTemplate = (React.createElement("div", { className: roundCls + " event-item", key: eventItem.id, style: { height: config.eventItemHeight, backgroundColor: bgColor } },
        React.createElement("span", { style: { marginLeft: "10px", lineHeight: config.eventItemHeight + "px" } }, isInPopover ? eventItem.start.format("HH:mm") + " " + titleText : titleText)));
    return React.createElement("a", { onClick: function () {
            alert("You just clicked an event: {id: " + eventItem.id + ", title: " + eventItem.title + "}");
        } },
        eventItemTemplate,
        startResizeDiv,
        endResizeDiv);
};
//# sourceMappingURL=EventPlugin.js.map