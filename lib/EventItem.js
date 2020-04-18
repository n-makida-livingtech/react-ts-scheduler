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
var moment = require("moment");
var react_1 = require("react");
var EventItemPopover_1 = require("./EventItemPopover");
var CellUnits_1 = require("./types/CellUnits");
var DnDTypes_1 = require("./types/DnDTypes");
var supportTouch = "ontouchstart" in window;
var EventItem = (function (_super) {
    __extends(EventItem, _super);
    function EventItem(props) {
        var _this = _super.call(this, props) || this;
        _this.initStartDrag = function (ev) {
            var _a = _this.props, schedulerData = _a.schedulerData, eventItem = _a.eventItem;
            var slotId = schedulerData.getEventSlotId(eventItem);
            var slot = schedulerData.getSlotById(slotId);
            if (!!slot && !!slot.groupOnly) {
                return;
            }
            if (schedulerData.isResizing()) {
                return;
            }
            ev.stopPropagation();
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length === 0) {
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                if (ev.buttons !== undefined && ev.buttons !== 1) {
                    return;
                }
                clientX = ev.clientX;
            }
            _this.setState({
                startX: clientX,
            });
            schedulerData.startResizing();
            if (supportTouch) {
                _this.startResizer.addEventListener("touchmove", _this.doStartDrag, false);
                _this.startResizer.addEventListener("touchend", _this.stopStartDrag, false);
                _this.startResizer.addEventListener("touchcancel", _this.cancelStartDrag, false);
            }
            else {
                document.documentElement.addEventListener("mousemove", _this.doStartDrag, false);
                document.documentElement.addEventListener("mouseup", _this.stopStartDrag, false);
            }
            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };
        };
        _this.doStartDrag = function (ev) {
            ev.stopPropagation();
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length === 0) {
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                clientX = ev.clientX;
            }
            var _a = _this.props, left = _a.left, width = _a.width, leftIndex = _a.leftIndex, rightIndex = _a.rightIndex, schedulerData = _a.schedulerData;
            var cellWidth = schedulerData.getContentCellWidth();
            var offset = leftIndex > 0 ? 5 : 6;
            var minWidth = cellWidth - offset;
            var maxWidth = rightIndex * cellWidth - offset;
            var startX = _this.state.startX;
            var newLeft = left + clientX - startX;
            var newWidth = width + startX - clientX;
            if (newWidth < minWidth) {
                newWidth = minWidth;
                newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3);
            }
            else if (newWidth > maxWidth) {
                newWidth = maxWidth;
                newLeft = 3;
            }
            _this.setState({ left: newLeft, width: newWidth });
        };
        _this.stopStartDrag = function (ev) {
            ev.stopPropagation();
            if (supportTouch) {
                _this.startResizer.removeEventListener("touchmove", _this.doStartDrag, false);
                _this.startResizer.removeEventListener("touchend", _this.stopStartDrag, false);
                _this.startResizer.removeEventListener("touchcancel", _this.cancelStartDrag, false);
            }
            else {
                document.documentElement.removeEventListener("mousemove", _this.doStartDrag, false);
                document.documentElement.removeEventListener("mouseup", _this.stopStartDrag, false);
            }
            document.onselectstart = null;
            document.ondragstart = null;
            var _a = _this.props, width = _a.width, left = _a.left, top = _a.top, leftIndex = _a.leftIndex, rightIndex = _a.rightIndex, schedulerData = _a.schedulerData, eventItem = _a.eventItem, updateEventStart = _a.updateEventStart, conflictOccurred = _a.conflictOccurred;
            schedulerData.stopResizing();
            if (_this.state.width === width) {
                return;
            }
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length === 0) {
                    _this.setState({
                        left: left,
                        top: top,
                        width: width,
                    });
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                clientX = ev.clientX;
            }
            var cellUnit = schedulerData.cellUnit, events = schedulerData.events, config = schedulerData.config;
            var cellWidth = schedulerData.getContentCellWidth();
            var offset = leftIndex > 0 ? 5 : 6;
            var minWidth = cellWidth - offset;
            var maxWidth = rightIndex * cellWidth - offset;
            var startX = _this.state.startX;
            var newWidth = width + startX - clientX;
            var deltaX = clientX - startX;
            var sign = deltaX < 0 ? -1 : (deltaX === 0 ? 0 : 1);
            var count = (sign > 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
            if (newWidth < minWidth) {
                count = rightIndex - leftIndex - 1;
            }
            else if (newWidth > maxWidth) {
                count = -leftIndex;
            }
            var newStart = moment(eventItem.start).add(cellUnit === CellUnits_1.CellUnits.Hour ? count * config.minuteStep : count, cellUnit === CellUnits_1.CellUnits.Hour ? "minutes" : "days");
            if (count !== 0 && cellUnit !== CellUnits_1.CellUnits.Hour && config.displayWeekend === false) {
                if (count > 0) {
                    var tempCount = 0;
                    var i = 0;
                    while (true) {
                        i++;
                        var tempStart = moment(eventItem.start).add(i, "days");
                        var dayOfWeek = tempStart.weekday();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            tempCount++;
                            if (tempCount === count) {
                                newStart = tempStart;
                                break;
                            }
                        }
                    }
                }
                else {
                    var tempCount = 0;
                    var i = 0;
                    while (true) {
                        i--;
                        var tempStart = moment(eventItem.start).add(i, "days");
                        var dayOfWeek = tempStart.weekday();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            tempCount--;
                            if (tempCount === count) {
                                newStart = tempStart;
                                break;
                            }
                        }
                    }
                }
            }
            var hasConflict = false;
            var slotId = schedulerData.getEventSlotId(eventItem);
            var slotName;
            var slot = schedulerData.getSlotById(slotId);
            if (!!slot) {
                slotName = slot.name;
            }
            if (config.checkConflict) {
                var start_1 = moment(newStart);
                var end_1 = moment(eventItem.end);
                events.forEach(function (e) {
                    if (schedulerData.getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                        var eStart = moment(e.start);
                        var eEnd = moment(e.end);
                        if ((start_1 >= eStart && start_1 < eEnd) || (end_1 > eStart && end_1 <= eEnd) || (eStart >= start_1 && eStart < end_1) || (eEnd > start_1 && eEnd <= end_1)) {
                            hasConflict = true;
                        }
                    }
                });
            }
            if (hasConflict) {
                _this.setState({
                    left: left,
                    top: top,
                    width: width,
                });
                if (conflictOccurred != undefined) {
                    conflictOccurred({
                        schedulerData: schedulerData,
                        action: "StartResize",
                        event: eventItem,
                        type: DnDTypes_1.DnDTypes.EVENT,
                        slotId: slotId,
                        slotName: slotName,
                        start: newStart,
                        end: eventItem.end,
                    });
                }
                else {
                    console.log("Conflict occurred, set conflictOccurred func in Scheduler to handle it");
                }
                _this.subscribeResizeEvent(_this.props);
            }
            else {
                if (updateEventStart != undefined) {
                    updateEventStart({ schedulerData: schedulerData, event: eventItem, newStart: newStart });
                }
            }
        };
        _this.cancelStartDrag = function (ev) {
            ev.stopPropagation();
            _this.startResizer.removeEventListener("touchmove", _this.doStartDrag, false);
            _this.startResizer.removeEventListener("touchend", _this.stopStartDrag, false);
            _this.startResizer.removeEventListener("touchcancel", _this.cancelStartDrag, false);
            document.onselectstart = null;
            document.ondragstart = null;
            var _a = _this.props, schedulerData = _a.schedulerData, left = _a.left, top = _a.top, width = _a.width;
            schedulerData.stopResizing();
            _this.setState({
                left: left,
                top: top,
                width: width,
            });
        };
        _this.initEndDrag = function (ev) {
            var _a = _this.props, schedulerData = _a.schedulerData, eventItem = _a.eventItem;
            var slotId = schedulerData.getEventSlotId(eventItem);
            var slot = schedulerData.getSlotById(slotId);
            if (!!slot && !!slot.groupOnly) {
                return;
            }
            if (schedulerData.isResizing()) {
                return;
            }
            ev.stopPropagation();
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length === 0) {
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                if (ev.buttons !== undefined && ev.buttons !== 1) {
                    return;
                }
                clientX = ev.clientX;
            }
            _this.setState({
                endX: clientX,
            });
            schedulerData.startResizing();
            if (supportTouch) {
                _this.endResizer.addEventListener("touchmove", _this.doEndDrag, false);
                _this.endResizer.addEventListener("touchend", _this.stopEndDrag, false);
                _this.endResizer.addEventListener("touchcancel", _this.cancelEndDrag, false);
            }
            else {
                document.documentElement.addEventListener("mousemove", _this.doEndDrag, false);
                document.documentElement.addEventListener("mouseup", _this.stopEndDrag, false);
            }
            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };
        };
        _this.doEndDrag = function (ev) {
            ev.stopPropagation();
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length == 0) {
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                clientX = ev.clientX;
            }
            var _a = _this.props, width = _a.width, leftIndex = _a.leftIndex, schedulerData = _a.schedulerData;
            var headers = schedulerData.headers;
            var cellWidth = schedulerData.getContentCellWidth();
            var offset = leftIndex > 0 ? 5 : 6;
            var minWidth = cellWidth - offset;
            var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
            var endX = _this.state.endX;
            var newWidth = (width + clientX - endX);
            if (newWidth < minWidth) {
                newWidth = minWidth;
            }
            else if (newWidth > maxWidth) {
                newWidth = maxWidth;
            }
            _this.setState({ width: newWidth });
        };
        _this.stopEndDrag = function (ev) {
            ev.stopPropagation();
            if (supportTouch) {
                _this.endResizer.removeEventListener("touchmove", _this.doEndDrag, false);
                _this.endResizer.removeEventListener("touchend", _this.stopEndDrag, false);
                _this.endResizer.removeEventListener("touchcancel", _this.cancelEndDrag, false);
            }
            else {
                document.documentElement.removeEventListener("mousemove", _this.doEndDrag, false);
                document.documentElement.removeEventListener("mouseup", _this.stopEndDrag, false);
            }
            document.onselectstart = null;
            document.ondragstart = null;
            var _a = _this.props, width = _a.width, left = _a.left, top = _a.top, leftIndex = _a.leftIndex, rightIndex = _a.rightIndex, schedulerData = _a.schedulerData, eventItem = _a.eventItem, updateEventEnd = _a.updateEventEnd, conflictOccurred = _a.conflictOccurred;
            schedulerData.stopResizing();
            if (_this.state.width === width) {
                return;
            }
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length == 0) {
                    _this.setState({
                        left: left,
                        top: top,
                        width: width,
                    });
                    return;
                }
                var touch = ev.changedTouches[0];
                clientX = touch.pageX;
            }
            else {
                clientX = ev.clientX;
            }
            var headers = schedulerData.headers, cellUnit = schedulerData.cellUnit, events = schedulerData.events, config = schedulerData.config;
            var cellWidth = schedulerData.getContentCellWidth();
            var offset = leftIndex > 0 ? 5 : 6;
            var minWidth = cellWidth - offset;
            var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
            var endX = _this.state.endX;
            var newWidth = (width + clientX - endX);
            var deltaX = newWidth - width;
            var sign = deltaX < 0 ? -1 : (deltaX === 0 ? 0 : 1);
            var count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
            if (newWidth < minWidth) {
                count = leftIndex - rightIndex + 1;
            }
            else if (newWidth > maxWidth) {
                count = headers.length - rightIndex;
            }
            var newEnd = moment(eventItem.end).add(cellUnit === CellUnits_1.CellUnits.Hour ? count * config.minuteStep : count, cellUnit === CellUnits_1.CellUnits.Hour ? "minutes" : "days");
            if (count !== 0 && cellUnit !== CellUnits_1.CellUnits.Hour && config.displayWeekend === false) {
                var tempCount = 0;
                var i = 0;
                if (count > 0) {
                    while (true) {
                        i++;
                        var tempEnd = moment(eventItem.end).add(i, "days");
                        var dayOfWeek = tempEnd.weekday();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            tempCount++;
                            if (tempCount === count) {
                                newEnd = tempEnd;
                                break;
                            }
                        }
                    }
                }
                else {
                    while (true) {
                        i--;
                        var tempEnd = moment(eventItem.end).add(i, "days");
                        var dayOfWeek = tempEnd.weekday();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            tempCount--;
                            if (tempCount === count) {
                                newEnd = tempEnd;
                                break;
                            }
                        }
                    }
                }
            }
            var hasConflict = false;
            var slotId = schedulerData.getEventSlotId(eventItem);
            var slotName;
            var slot = schedulerData.getSlotById(slotId);
            if (!!slot) {
                slotName = slot.name;
            }
            if (config.checkConflict) {
                var start_2 = moment(eventItem.start);
                var end_2 = moment(newEnd);
                events.forEach(function (e) {
                    if (schedulerData.getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                        var eStart = moment(e.start);
                        var eEnd = moment(e.end);
                        if ((start_2 >= eStart && start_2 < eEnd) || (end_2 > eStart && end_2 <= eEnd) || (eStart >= start_2 && eStart < end_2) || (eEnd > start_2 && eEnd <= end_2)) {
                            hasConflict = true;
                        }
                    }
                });
            }
            if (hasConflict) {
                _this.setState({
                    left: left,
                    top: top,
                    width: width,
                });
                if (conflictOccurred != undefined) {
                    conflictOccurred({
                        schedulerData: schedulerData,
                        action: "EndResize",
                        event: eventItem,
                        type: DnDTypes_1.DnDTypes.EVENT,
                        slotId: slotId,
                        slotName: slotName,
                        start: newEnd,
                        end: eventItem.end,
                    });
                }
                else {
                    console.log("Conflict occurred, set conflictOccurred func in Scheduler to handle it");
                }
                _this.subscribeResizeEvent(_this.props);
            }
            else {
                if (updateEventEnd != undefined) {
                    updateEventEnd({ schedulerData: schedulerData, event: eventItem, newEnd: newEnd });
                }
            }
        };
        _this.cancelEndDrag = function (ev) {
            ev.stopPropagation();
            _this.endResizer.removeEventListener("touchmove", _this.doEndDrag, false);
            _this.endResizer.removeEventListener("touchend", _this.stopEndDrag, false);
            _this.endResizer.removeEventListener("touchcancel", _this.cancelEndDrag, false);
            document.onselectstart = null;
            document.ondragstart = null;
            var _a = _this.props, schedulerData = _a.schedulerData, left = _a.left, top = _a.top, width = _a.width;
            schedulerData.stopResizing();
            _this.setState({
                left: left,
                top: top,
                width: width,
            });
        };
        _this.startResizable = function (props) {
            var eventItem = props.eventItem, isInPopover = props.isInPopover, schedulerData = props.schedulerData;
            var config = schedulerData.config;
            return config.startResizable === true && isInPopover === false
                && (eventItem.resizable == undefined || eventItem.resizable !== false)
                && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
        };
        _this.endResizable = function (props) {
            var eventItem = props.eventItem, isInPopover = props.isInPopover, schedulerData = props.schedulerData;
            var config = schedulerData.config;
            return config.endResizable === true && isInPopover === false
                && (eventItem.resizable == undefined || eventItem.resizable !== false)
                && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
        };
        _this.subscribeResizeEvent = function (props) {
            if (_this.startResizer != undefined) {
                if (supportTouch) {
                    _this.startResizer.removeEventListener("touchstart", _this.initStartDrag, false);
                    if (_this.startResizable(props)) {
                        _this.startResizer.addEventListener("touchstart", _this.initStartDrag, false);
                    }
                }
                else {
                    _this.startResizer.removeEventListener("mousedown", _this.initStartDrag, false);
                    if (_this.startResizable(props)) {
                        _this.startResizer.addEventListener("mousedown", _this.initStartDrag, false);
                    }
                }
            }
            if (_this.endResizer != undefined) {
                if (supportTouch) {
                    _this.endResizer.removeEventListener("touchstart", _this.initEndDrag, false);
                    if (_this.endResizable(props)) {
                        _this.endResizer.addEventListener("touchstart", _this.initEndDrag, false);
                    }
                }
                else {
                    _this.endResizer.removeEventListener("mousedown", _this.initEndDrag, false);
                    if (_this.endResizable(props)) {
                        _this.endResizer.addEventListener("mousedown", _this.initEndDrag, false);
                    }
                }
            }
        };
        var left = props.left, top = props.top, width = props.width;
        _this.state = {
            left: left,
            top: top,
            width: width,
        };
        _this.startResizer = null;
        _this.endResizer = null;
        return _this;
    }
    EventItem.prototype.componentWillReceiveProps = function (np) {
        var left = np.left, top = np.top, width = np.width;
        this.setState({
            left: left,
            top: top,
            width: width,
        });
        this.subscribeResizeEvent(np);
    };
    EventItem.prototype.componentDidMount = function () {
        this.subscribeResizeEvent(this.props);
    };
    EventItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, eventItem = _a.eventItem, schedulerData = _a.schedulerData, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource, connectDragPreview = _a.connectDragPreview, EventFC = _a.EventFC;
        var config = schedulerData.config;
        var _b = this.state, left = _b.left, width = _b.width, top = _b.top;
        var startResizeDiv = React.createElement("div", null);
        if (this.startResizable(this.props)) {
            startResizeDiv = React.createElement("div", { className: "event-resizer event-start-resizer", ref: function (ref) { return _this.startResizer = ref; } });
        }
        var endResizeDiv = React.createElement("div", null);
        if (this.endResizable(this.props)) {
            endResizeDiv = React.createElement("div", { className: "event-resizer event-end-resizer", ref: function (ref) { return _this.endResizer = ref; } });
        }
        var timelineEvent = React.createElement("div", null);
        if (EventFC) {
            timelineEvent = React.createElement(EventFC, __assign({}, this.props, { endResizeDiv: endResizeDiv, startResizeDiv: startResizeDiv, mustAddCssClass: "event-item", mustBeHeight: config.eventItemHeight }));
        }
        var tt = React.createElement("div", { className: "timeline-event", style: { left: left, width: width, top: top } }, timelineEvent);
        return (isDragging ?
            null :
            (schedulerData.isResizing() || config.eventItemPopoverEnabled === false || eventItem.showPopover === false ?
                (React.createElement("div", null, connectDragPreview(connectDragSource(tt)))) : (React.createElement(EventItemPopover_1.default, __assign({}, this.props, { eventItem: eventItem, title: eventItem.title, startTime: eventItem.start, endTime: eventItem.end, connectDragSource: connectDragSource, connectDragPreview: connectDragPreview, timelineEvent: tt })))));
    };
    return EventItem;
}(react_1.Component));
exports.default = EventItem;
