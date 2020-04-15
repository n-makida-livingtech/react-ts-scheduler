"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_dnd_1 = require("react-dnd");
var moment = require("moment");
var DnDTypes_1 = require("./types/DnDTypes");
var ViewTypes_1 = require("./types/ViewTypes");
var DnDSource = (function () {
    function DnDSource(resolveDragObjFunc, DecoratedComponent, dndType) {
        var _this = this;
        if (dndType === void 0) { dndType = DnDTypes_1.DnDTypes.EVENT; }
        this.getDragSpec = function () {
            return {
                beginDrag: function (props, monitor, component) {
                    return _this.resolveDragObjFunc(props);
                },
                endDrag: function (props, monitor, component) {
                    if (!monitor.didDrop()) {
                        return;
                    }
                    var moveEvent = props.moveEvent, newEvent = props.newEvent, schedulerData = props.schedulerData;
                    var events = schedulerData.events, config = schedulerData.config, viewType = schedulerData.viewType;
                    var item = monitor.getItem();
                    var type = monitor.getItemType().toString();
                    var dropResult = monitor.getDropResult();
                    var slotId = dropResult.slotId;
                    var slotName = dropResult.slotName;
                    var newStart = moment(dropResult.start);
                    var newEnd = moment(dropResult.end);
                    var initialStart = moment(dropResult.initialStart);
                    var action = 'New';
                    var isEvent = type === DnDTypes_1.DnDTypes.EVENT;
                    if (isEvent) {
                        var event_1 = item;
                        if (config.relativeMove) {
                            newStart = moment(event_1.start).add(moment(newStart).diff(moment(initialStart)), 'ms');
                        }
                        else {
                            if (viewType !== ViewTypes_1.ViewTypes.Day) {
                                var tmpMoment = newStart;
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
                    var hasConflict = false;
                    if (config.checkConflict) {
                        var start_1 = newStart;
                        var end_1 = newEnd;
                        events.forEach(function (e) {
                            if (schedulerData.getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
                                var eStart = moment(e.start);
                                var eEnd = moment(e.end);
                                if ((start_1 >= eStart && start_1 < eEnd) ||
                                    (end_1 > eStart && end_1 <= eEnd) ||
                                    (eStart >= start_1 && eStart < end_1) ||
                                    (eEnd > start_1 && eEnd <= end_1)) {
                                    hasConflict = true;
                                }
                            }
                        });
                    }
                    if (hasConflict) {
                        var conflictOccurred = props.conflictOccurred;
                        if (conflictOccurred != undefined) {
                            conflictOccurred({
                                schedulerData: schedulerData,
                                action: action,
                                event: item,
                                type: DnDTypes_1.DnDTypes[type],
                                slotId: slotId,
                                slotName: slotName,
                                start: newStart,
                                end: newEnd,
                            });
                        }
                        else {
                            console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                        }
                    }
                    else {
                        if (isEvent) {
                            if (moveEvent !== undefined) {
                                moveEvent({
                                    schedulerData: schedulerData,
                                    event: item,
                                    slotId: slotId,
                                    slotName: slotName,
                                    start: newStart,
                                    end: newEnd,
                                });
                            }
                        }
                        else {
                            if (newEvent !== undefined) {
                                newEvent({
                                    schedulerData: schedulerData,
                                    slotId: slotId,
                                    slotName: slotName,
                                    start: newStart,
                                    end: newEnd,
                                    type: DnDTypes_1.DnDTypes[type],
                                    item: item,
                                });
                            }
                        }
                    }
                },
                canDrag: function (props) {
                    var schedulerData = props.schedulerData, resourceEvents = props.resourceEvents;
                    var item = _this.resolveDragObjFunc(props);
                    if (schedulerData.isResizing()) {
                        return false;
                    }
                    var config = schedulerData.config;
                    return (config.movable &&
                        (resourceEvents == undefined || !resourceEvents.groupOnly) &&
                        (item.movable == undefined || item.movable !== false));
                },
            };
        };
        this.getDragCollect = function (connect, monitor) {
            return {
                connectDragSource: connect.dragSource(),
                isDragging: monitor.isDragging(),
                connectDragPreview: connect.dragPreview(),
            };
        };
        this.getDragSource = function () {
            return _this.dragSource;
        };
        this.resolveDragObjFunc = resolveDragObjFunc;
        this.DecoratedComponent = DecoratedComponent;
        this.dndType = dndType;
        this.dragSource = react_dnd_1.DragSource(this.dndType, this.getDragSpec(), this.getDragCollect)(this.DecoratedComponent);
    }
    return DnDSource;
}());
exports.default = DnDSource;
//# sourceMappingURL=DnDSource.js.map