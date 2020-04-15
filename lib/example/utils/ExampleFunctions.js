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
var moment = require("moment");
var Scheduler_1 = require("../../src/Scheduler");
var DemoData_1 = require("./DemoData");
function updateSchedulerDataState(sd) {
    this.setState({
        viewModel: sd ? sd : this.viewModel,
        update: moment.now(),
    });
}
exports.updateSchedulerDataState = updateSchedulerDataState;
exports.getNow = function () {
    return moment();
};
function prevClick(schedulerData) {
    schedulerData.prev();
    schedulerData.setEvents(DemoData_1.DemoData.events);
    this.setState({
        viewModel: schedulerData,
    });
}
exports.prevClick = prevClick;
function nextClick(schedulerData) {
    schedulerData.next();
    schedulerData.setEvents(DemoData_1.DemoData.events);
    this.setState({
        viewModel: schedulerData,
    });
}
exports.nextClick = nextClick;
function onViewChange(args) {
    args.schedulerData.setViewType(args.view.viewType, args.view.showAgenda, args.view.isEventPerspective);
    args.schedulerData.setEvents(DemoData_1.DemoData.events);
    this.setState({
        viewModel: args.schedulerData,
    });
}
exports.onViewChange = onViewChange;
function onSelectDate(args) {
    args.schedulerData.setDate(args.date);
    args.schedulerData.setEvents(DemoData_1.DemoData.events);
    this.setState({
        viewModel: args.schedulerData,
    });
}
exports.onSelectDate = onSelectDate;
function eventClicked(args) {
    alert("You just clicked an event: {id: " + args.event.id + ", title: " + args.event.title + "}");
}
exports.eventClicked = eventClicked;
function ops1(args) {
    alert("You just executed ops1 to event: {id: " + args.event.id + ", title: " + args.event.title + "}");
}
exports.ops1 = ops1;
function ops2(args) {
    alert("You just executed ops2 to event: {id: " + args.event.id + ", title: " + args.event.title + "}");
}
exports.ops2 = ops2;
function newEvent(args) {
    if (confirm("Do you want to create a new event? {slotId: " + args.slotId + ", slotName: " + args.slotName + ", start: " + args.start + ", end: " + args.end + ", type: " + args.type + ", item: " + args.item + "}")) {
        var newFreshId_1 = '0';
        args.schedulerData.events.forEach(function (i) {
            if (i.id >= newFreshId_1) {
                newFreshId_1 = i.id + 1;
            }
        });
        var newE = {
            id: newFreshId_1,
            title: 'New event you just created',
            start: args.start,
            end: args.end,
            resourceId: args.slotId,
            bgColor: 'purple',
        };
        args.schedulerData.addEvent(newE);
        this.setState({
            viewModel: args.schedulerData,
        });
    }
}
exports.newEvent = newEvent;
function updateEventStart(args) {
    if (confirm("Do you want to adjust the start of the event? {eventId: " + args.event.id + ", eventTitle: " + args.event.title + ", newStart: " + args.newStart.format() + "}")) {
        args.schedulerData.updateEventStart(args.event, args.newStart);
    }
    this.setState({
        viewModel: args.schedulerData,
    });
}
exports.updateEventStart = updateEventStart;
function updateEventEnd(args) {
    if (confirm("Do you want to adjust the end of the event? {eventId: " + args.event.id + ", eventTitle: " + args.event.title + ", newEnd: " + args.newEnd.format() + "}")) {
        args.schedulerData.updateEventEnd(args.event, args.newEnd);
    }
    this.setState({
        viewModel: args.schedulerData,
    });
}
exports.updateEventEnd = updateEventEnd;
function moveEvent(args) {
    if (confirm("Do you want to move the event? {eventId: " + args.event.id + ", eventTitle: " + args.event.title + ", newSlotId: " + args.slotId + ", newSlotName: " + args.slotName + ", newStart: " + args.start.format() + ", newEnd: " + args.end.format())) {
        args.schedulerData.moveEvent(args.event, args.slotId, args.slotName, args.start, args.end);
        this.setState({
            viewModel: args.schedulerData,
        });
    }
}
exports.moveEvent = moveEvent;
function newStock(args) {
    if (confirm("Do you want to create a new event? {slotId: " + args.slotId + ", slotName: " + args.slotName + ", start: " + args.start + ", end: " + args.end + ", type: " + args.type + ", item: " + args.item + "}")) {
        console.log(args.slotId, args.start, args.end);
    }
}
exports.newStock = newStock;
function onSetAddMoreState(newState) {
    if (newState === undefined) {
        this.setState({
            headerItem: undefined,
            left: 0,
            top: 0,
            height: 0,
        });
    }
    else {
        this.setState(__assign({}, newState));
    }
}
exports.onSetAddMoreState = onSetAddMoreState;
function onScrollRight(schedulerData, schedulerContent, maxScrollLeft) {
    if (schedulerData.viewType === Scheduler_1.SchedulerViewTypes.Day) {
        schedulerData.next();
        schedulerData.setEvents(DemoData_1.DemoData.events);
        this.setState({
            viewModel: schedulerData,
        });
        schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
}
exports.onScrollRight = onScrollRight;
function onScrollLeft(schedulerData, schedulerContent, maxScrollLeft) {
    if (schedulerData.viewType === Scheduler_1.SchedulerViewTypes.Day) {
        schedulerData.prev();
        schedulerData.setEvents(DemoData_1.DemoData.events);
        this.setState({
            viewModel: schedulerData,
        });
        schedulerContent.scrollLeft = 10;
    }
}
exports.onScrollLeft = onScrollLeft;
function onScrollTop(schedulerData, schedulerContent, maxScrollLeft) {
    console.log('onScrollTop');
}
exports.onScrollTop = onScrollTop;
function onScrollBottom(schedulerData, schedulerContent, maxScrollLeft) {
    console.log('onScrollBottom');
}
exports.onScrollBottom = onScrollBottom;
function conflictOccurred(args) {
    alert("Conflict occurred. {action: " + args.action + ", event: " + args.event);
}
exports.conflictOccurred = conflictOccurred;
//# sourceMappingURL=ExampleFunctions.js.map