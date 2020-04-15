"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_dnd_1 = require("react-dnd");
var Util_1 = require("./Util");
var DnDTypes_1 = require("./types/DnDTypes");
var CellUnits_1 = require("./types/CellUnits");
var ViewTypes_1 = require("./types/ViewTypes");
var moment = require("moment");
var DnDContext = (function () {
    function DnDContext(sources, DecoratedComponent) {
        var _this = this;
        this.getDropType = function () {
            return {
                drop: function (props, monitor, component) {
                    var schedulerData = props.schedulerData, resourceEvents = props.resourceEvents;
                    var cellUnit = schedulerData.cellUnit;
                    var type = monitor.getItemType();
                    var pos = Util_1.getPos(component.eventContainer);
                    var cellWidth = schedulerData.getContentCellWidth();
                    var initialStartTime = null;
                    var initialEndTime = null;
                    if (type === DnDTypes_1.DnDTypes.EVENT) {
                        var initialPoint = monitor.getInitialClientOffset();
                        var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
                        initialStartTime = resourceEvents.headerItems[initialLeftIndex].start;
                        initialEndTime = resourceEvents.headerItems[initialLeftIndex].end;
                        if (cellUnit !== CellUnits_1.CellUnits.Hour) {
                            initialEndTime = moment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59);
                        }
                    }
                    var point = monitor.getClientOffset();
                    var leftIndex = Math.floor((point.x - pos.x) / cellWidth);
                    var startTime = resourceEvents.headerItems[leftIndex].start;
                    var endTime = resourceEvents.headerItems[leftIndex].end;
                    if (cellUnit !== CellUnits_1.CellUnits.Hour) {
                        endTime = moment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59);
                    }
                    return {
                        slotId: resourceEvents.slotId,
                        slotName: resourceEvents.slotName,
                        start: startTime,
                        end: endTime,
                        initialStart: initialStartTime,
                        initialEnd: initialEndTime,
                    };
                },
                hover: function (props, monitor, component) {
                    var schedulerData = props.schedulerData, resourceEvents = props.resourceEvents, movingEvent = props.movingEvent;
                    var cellUnit = schedulerData.cellUnit, config = schedulerData.config, viewType = schedulerData.viewType;
                    var item = monitor.getItem();
                    var type = monitor.getItemType();
                    var pos = Util_1.getPos(component.eventContainer);
                    var cellWidth = schedulerData.getContentCellWidth();
                    var initialStart = null;
                    var initialEnd = null;
                    if (type === DnDTypes_1.DnDTypes.EVENT) {
                        var initialPoint = monitor.getInitialClientOffset();
                        var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
                        initialStart = resourceEvents.headerItems[initialLeftIndex].start;
                        initialEnd = resourceEvents.headerItems[initialLeftIndex].end;
                        if (cellUnit !== CellUnits_1.CellUnits.Hour) {
                            initialEnd = moment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59);
                        }
                    }
                    var point = monitor.getClientOffset();
                    var leftIndex = Math.floor((point.x - pos.x) / cellWidth);
                    var newStartH = resourceEvents.headerItems[leftIndex];
                    var newStart = newStartH ? newStartH.start : schedulerData.startDate;
                    var newEndH = resourceEvents.headerItems[leftIndex];
                    var newEnd = newEndH ? newEndH.end : schedulerData.endDate;
                    if (cellUnit !== CellUnits_1.CellUnits.Hour) {
                        newEnd = moment(newStart).hour(23).minute(59).second(59);
                    }
                    var slotId = resourceEvents.slotId;
                    var slotName = resourceEvents.slotName;
                    var action = 'New';
                    var isEvent = type === DnDTypes_1.DnDTypes.EVENT;
                    if (isEvent) {
                        var event_1 = item;
                        if (config.relativeMove) {
                            newStart = moment(event_1.start).add(moment(newStart).diff(moment(initialStart)), 'ms');
                        }
                        else {
                            if (viewType !== ViewTypes_1.ViewTypes.Day) {
                                var tmpMoment = moment(newStart);
                                newStart = moment(event_1.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date());
                            }
                        }
                        newEnd = moment(newStart).add(moment(event_1.end).diff(moment(event_1.start)), 'ms');
                        if (config.crossResourceMove === false) {
                            slotId = schedulerData.getEventSlotId(item);
                            slotName = undefined;
                            var slot = schedulerData.getSlotById(slotId);
                            if (!!slot) {
                                slotName = slot.name;
                            }
                        }
                        action = 'Move';
                    }
                    if (!!movingEvent) {
                        movingEvent(schedulerData, slotId, slotName, newStart, newEnd, action, type, item);
                    }
                },
                canDrop: function (props, monitor) {
                    var schedulerData = props.schedulerData, resourceEvents = props.resourceEvents;
                    var item = monitor.getItem();
                    if (schedulerData.isResizing()) {
                        return false;
                    }
                    var config = schedulerData.config;
                    return config.movable && !resourceEvents.groupOnly && (item.movable === undefined || item.movable !== false);
                },
            };
        };
        this.getDropCollect = function (connect, monitor) {
            return {
                connectDropTarget: connect.dropTarget(),
                isOver: monitor.isOver(),
            };
        };
        this.getDropTarget = function () {
            return react_dnd_1.DropTarget(Array.from(_this.sourceMap.keys()), _this.getDropType(), _this.getDropCollect)(_this.DecoratedComponent);
        };
        this.getDndSource = function (dndType) {
            if (dndType === void 0) { dndType = DnDTypes_1.DnDTypes.EVENT; }
            return _this.sourceMap.get(dndType);
        };
        this.sourceMap = new Map();
        sources.forEach(function (item) {
            _this.sourceMap.set(item.dndType, item);
        });
        this.DecoratedComponent = DecoratedComponent;
    }
    return DnDContext;
}());
exports.default = DnDContext;
//# sourceMappingURL=DnDContext.js.map