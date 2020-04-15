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
var Summary_1 = require("./Summary");
var SelectedArea_1 = require("./SelectedArea");
var CellUnits_1 = require("./types/CellUnits");
var SummaryPos_1 = require("./types/SummaryPos");
var Util_1 = require("./Util");
var DnDTypes_1 = require("./types/DnDTypes");
var supportTouch = 'ontouchstart' in window;
var ResourceEvents = (function (_super) {
    __extends(ResourceEvents, _super);
    function ResourceEvents(props) {
        var _this = _super.call(this, props) || this;
        _this.initDrag = function (ev) {
            var isSelecting = _this.state.isSelecting;
            if (isSelecting) {
                return;
            }
            if ((ev.srcElement || ev.target) !== _this.eventContainer) {
                return;
            }
            ev.stopPropagation();
            var resourceEvents = _this.props.resourceEvents;
            if (resourceEvents.groupOnly) {
                return;
            }
            var clientX = 0;
            if (supportTouch) {
                if (ev.changedTouches.length == 0) {
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
            var schedulerData = _this.props.schedulerData;
            var cellWidth = schedulerData.getContentCellWidth();
            var pos = Util_1.getPos(_this.eventContainer);
            var startX = clientX - pos.x;
            var leftIndex = Math.floor(startX / cellWidth);
            var left = leftIndex * cellWidth;
            var rightIndex = Math.ceil(startX / cellWidth);
            var width = (rightIndex - leftIndex) * cellWidth;
            _this.setState({
                startX: startX,
                left: left,
                leftIndex: leftIndex,
                width: width,
                rightIndex: rightIndex,
                isSelecting: true,
            });
            if (supportTouch) {
                document.documentElement.addEventListener('touchmove', _this.doDrag, false);
                document.documentElement.addEventListener('touchend', _this.stopDrag, false);
                document.documentElement.addEventListener('touchcancel', _this.cancelDrag, false);
            }
            else {
                document.documentElement.addEventListener('mousemove', _this.doDrag, false);
                document.documentElement.addEventListener('mouseup', _this.stopDrag, false);
            }
            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };
        };
        _this.doDrag = function (ev) {
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
            var startX = _this.state.startX;
            var schedulerData = _this.props.schedulerData;
            var headers = schedulerData.headers;
            var cellWidth = schedulerData.getContentCellWidth();
            var pos = Util_1.getPos(_this.eventContainer);
            var currentX = clientX - pos.x;
            var leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth);
            leftIndex = leftIndex < 0 ? 0 : leftIndex;
            var left = leftIndex * cellWidth;
            var rightIndex = Math.ceil(Math.max(startX, currentX) / cellWidth);
            rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
            var width = (rightIndex - leftIndex) * cellWidth;
            _this.setState({
                leftIndex: leftIndex,
                left: left,
                rightIndex: rightIndex,
                width: width,
                isSelecting: true,
            });
        };
        _this.stopDrag = function (ev) {
            ev.stopPropagation();
            var _a = _this.props, schedulerData = _a.schedulerData, newEvent = _a.newEvent, newStock = _a.newStock, resourceEvents = _a.resourceEvents;
            var headers = schedulerData.headers, events = schedulerData.events, config = schedulerData.config, cellUnit = schedulerData.cellUnit;
            var _b = _this.state, leftIndex = _b.leftIndex, rightIndex = _b.rightIndex;
            if (supportTouch) {
                document.documentElement.removeEventListener('touchmove', _this.doDrag, false);
                document.documentElement.removeEventListener('touchend', _this.stopDrag, false);
                document.documentElement.removeEventListener('touchcancel', _this.cancelDrag, false);
            }
            else {
                document.documentElement.removeEventListener('mousemove', _this.doDrag, false);
                document.documentElement.removeEventListener('mouseup', _this.stopDrag, false);
            }
            document.onselectstart = null;
            document.ondragstart = null;
            var startTime = headers[leftIndex].time;
            var endTime = resourceEvents.headerItems[rightIndex - 1].end;
            if (cellUnit !== CellUnits_1.CellUnits.Hour) {
                endTime = moment(resourceEvents.headerItems[rightIndex - 1].start)
                    .hour(23)
                    .minute(59)
                    .second(59);
            }
            var slotId = resourceEvents.slotId;
            var slotName = resourceEvents.slotName;
            _this.setState({
                startX: 0,
                leftIndex: 0,
                left: 0,
                rightIndex: 0,
                width: 0,
                isSelecting: false,
            });
            var start = moment(startTime);
            var end = moment(endTime);
            var hasConflict = false;
            if (config.checkConflict) {
                events.forEach(function (e) {
                    if (schedulerData.getEventSlotId(e) === slotId) {
                        var eStart = moment(e.start);
                        var eEnd = moment(e.end);
                        if ((start >= eStart && start < eEnd) ||
                            (end > eStart && end <= eEnd) ||
                            (eStart >= start && eStart < end) ||
                            (eEnd > start && eEnd <= end)) {
                            hasConflict = true;
                        }
                    }
                });
            }
            if (hasConflict) {
                var conflictOccurred = _this.props.conflictOccurred;
                if (conflictOccurred != undefined) {
                    conflictOccurred({
                        schedulerData: schedulerData,
                        action: 'New',
                        event: {
                            id: undefined,
                            start: start,
                            end: end,
                            resourceId: slotId,
                            groupName: slotName,
                            title: undefined,
                        },
                        type: DnDTypes_1.DnDTypes.EVENT,
                        slotId: slotId,
                        slotName: slotName,
                        start: start,
                        end: endTime,
                    });
                }
                else {
                    console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                }
            }
            else {
                if (newEvent != undefined) {
                    newStock({ schedulerData: schedulerData, slotId: slotId, slotName: slotName, start: start, end: endTime });
                }
            }
        };
        _this.cancelDrag = function (ev) {
            ev.stopPropagation();
            var isSelecting = _this.state.isSelecting;
            if (isSelecting) {
                document.documentElement.removeEventListener('touchmove', _this.doDrag, false);
                document.documentElement.removeEventListener('touchend', _this.stopDrag, false);
                document.documentElement.removeEventListener('touchcancel', _this.cancelDrag, false);
                document.onselectstart = null;
                document.ondragstart = null;
                _this.setState({
                    startX: 0,
                    leftIndex: 0,
                    left: 0,
                    rightIndex: 0,
                    width: 0,
                    isSelecting: false,
                });
            }
        };
        _this.onAddMoreClick = function (headerItem) {
            var _a = _this.props, onSetAddMoreState = _a.onSetAddMoreState, resourceEvents = _a.resourceEvents, schedulerData = _a.schedulerData;
            if (!!onSetAddMoreState) {
                var config = schedulerData.config;
                var cellWidth = schedulerData.getContentCellWidth();
                var index = resourceEvents.headerItems.indexOf(headerItem);
                if (index !== -1) {
                    var left = index * (cellWidth - 1);
                    var pos = Util_1.getPos(_this.eventContainer);
                    left = left + pos.x;
                    var top_1 = pos.y;
                    var height = (headerItem.count + 1) * config.eventItemLineHeight + 20;
                    onSetAddMoreState({
                        headerItem: headerItem,
                        left: left,
                        top: top_1,
                        height: height,
                    });
                }
            }
        };
        _this.eventContainerRef = function (element) {
            _this.eventContainer = element;
        };
        _this.state = {
            isSelecting: false,
            left: 0,
            width: 0,
        };
        return _this;
    }
    ResourceEvents.prototype.componentDidMount = function () {
        var schedulerData = this.props.schedulerData;
        var config = schedulerData.config;
        if (config.creatable === true) {
            if (supportTouch) {
                this.eventContainer.addEventListener('touchstart', this.initDrag, false);
            }
            else {
                this.eventContainer.addEventListener('mousedown', this.initDrag, false);
            }
        }
    };
    ResourceEvents.prototype.componentWillReceiveProps = function (np) {
        if (supportTouch) {
            this.eventContainer.removeEventListener('touchstart', this.initDrag, false);
        }
        else {
            this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
        }
        if (np.schedulerData.config.creatable) {
            if (supportTouch) {
                this.eventContainer.addEventListener('touchstart', this.initDrag, false);
            }
            else {
                this.eventContainer.addEventListener('mousedown', this.initDrag, false);
            }
        }
    };
    ResourceEvents.prototype.render = function () {
        var _this = this;
        var _a = this.props, resourceEvents = _a.resourceEvents, schedulerData = _a.schedulerData, connectDropTarget = _a.connectDropTarget, dndSource = _a.dndSource;
        var cellUnit = schedulerData.cellUnit, startDate = schedulerData.startDate, endDate = schedulerData.endDate, config = schedulerData.config;
        var _b = this.state, isSelecting = _b.isSelecting, left = _b.left, width = _b.width;
        var cellWidth = schedulerData.getContentCellWidth();
        var cellMaxEvents = schedulerData.getCellMaxEvents();
        var rowWidth = schedulerData.getContentTableWidth();
        var DnDEventItem = dndSource.getDragSource();
        var selectedArea = isSelecting ? React.createElement(SelectedArea_1.default, __assign({}, this.props, { left: left, width: width })) : React.createElement("div", null);
        var eventList = [];
        resourceEvents.headerItems.forEach(function (headerItem, index) {
            if (headerItem.count > 0 || headerItem.summary != undefined) {
                var isTop = config.summaryPos === SummaryPos_1.SummaryPos.TopRight ||
                    config.summaryPos === SummaryPos_1.SummaryPos.Top ||
                    config.summaryPos === SummaryPos_1.SummaryPos.TopLeft;
                var marginTop_1 = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
                var renderEventsMaxIndex_1 = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;
                headerItem.events.forEach(function (evt, idx) {
                    if (idx < renderEventsMaxIndex_1 && evt !== undefined && evt.render) {
                        var durationStart = moment(startDate);
                        var durationEnd = moment(endDate).add(1, 'days');
                        if (cellUnit === CellUnits_1.CellUnits.Hour) {
                            durationStart = moment(startDate).add(config.dayStartFrom, 'hours');
                            durationEnd = moment(endDate).add(config.dayStopTo + 1, 'hours');
                        }
                        var eventStart = moment(evt.eventItem.start);
                        var eventEnd = moment(evt.eventItem.end);
                        var isStart = eventStart >= durationStart;
                        var isEnd = eventEnd <= durationEnd;
                        var l = index * cellWidth + (index > 0 ? 2 : 3);
                        var w = evt.span * cellWidth - (index > 0 ? 5 : 6) > 0 ? evt.span * cellWidth - (index > 0 ? 5 : 6) : 0;
                        var top_2 = marginTop_1 + idx * config.eventItemLineHeight;
                        var eventItem = (React.createElement(DnDEventItem, __assign({}, _this.props, { key: evt.eventItem.id, eventItem: evt.eventItem, isStart: isStart, isEnd: isEnd, isInPopover: false, left: l, width: w, top: top_2, leftIndex: index, rightIndex: index + evt.span })));
                        eventList.push(eventItem);
                    }
                });
                if (headerItem.summary != undefined) {
                    var top_3 = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;
                    var l = index * cellWidth + (index > 0 ? 2 : 3);
                    var w = cellWidth - (index > 0 ? 5 : 6);
                    var key = resourceEvents.slotId + "_" + headerItem.time;
                    var summary = (React.createElement(Summary_1.default, { key: key, schedulerData: schedulerData, summary: headerItem.summary, left: l, width: w, top: top_3 }));
                    eventList.push(summary);
                }
            }
        });
        return (React.createElement("tr", null,
            React.createElement("td", { style: { width: rowWidth } }, connectDropTarget(React.createElement("div", { ref: this.eventContainerRef, className: 'event-container', style: { height: resourceEvents.rowHeight } },
                selectedArea,
                eventList)))));
    };
    return ResourceEvents;
}(react_1.Component));
exports.default = ResourceEvents;
//# sourceMappingURL=ResourceEvents.js.map