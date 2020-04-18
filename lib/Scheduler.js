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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var react_1 = require("react");
var col_1 = require("antd/lib/col");
var row_1 = require("antd/lib/row");
var icon_1 = require("antd/lib/icon");
require("antd/lib/select/style/index.css");
require("antd/lib/grid/style/index.css");
var radio_1 = require("antd/lib/radio");
require("antd/lib/radio/style/index.css");
var popover_1 = require("antd/lib/popover");
require("antd/lib/popover/style/index.css");
var calendar_1 = require("antd/lib/calendar");
require("antd/lib/calendar/style/index.css");
var EventItem_1 = require("./EventItem");
var DnDSource_1 = require("./DnDSource");
exports.SchedulerDnDSource = DnDSource_1.default;
var DnDContext_1 = require("./DnDContext");
var ResourceView_1 = require("./ResourceView");
var HeaderView_1 = require("./HeaderView");
var BodyView_1 = require("./BodyView");
var ResourceEvents_1 = require("./ResourceEvents");
var ViewTypes_1 = require("./types/ViewTypes");
exports.SchedulerViewTypes = ViewTypes_1.ViewTypes;
var CellUnits_1 = require("./types/CellUnits");
exports.CellUnits = CellUnits_1.CellUnits;
var SummaryPos_1 = require("./types/SummaryPos");
exports.SummaryPos = SummaryPos_1.SummaryPos;
var SchedulerData_1 = require("./SchedulerData");
exports.SchedulerData = SchedulerData_1.default;
var RadioButton = radio_1.default.Button;
var RadioGroup = radio_1.default.Group;
var Scheduler = (function (_super) {
    __extends(Scheduler, _super);
    function Scheduler(props) {
        var _this = _super.call(this, props) || this;
        _this.onWindowResize = function (e) {
            var schedulerData = _this.props.schedulerData;
            schedulerData.setDocumentWidth(document.documentElement.clientWidth);
            _this.setState({
                documentWidth: document.documentElement.clientWidth,
                documentHeight: document.documentElement.clientHeight,
            });
        };
        _this.resolveScrollbarSize = function () {
            var schedulerData = _this.props.schedulerData;
            var contentScrollbarHeight = 17;
            var contentScrollbarWidth = 17;
            var resourceScrollbarHeight = 17;
            var resourceScrollbarWidth = 17;
            var contentHeight = schedulerData.getSchedulerContentDesiredHeight();
            if (!!_this.schedulerContent) {
                contentScrollbarHeight = _this.schedulerContent.offsetHeight - _this.schedulerContent.clientHeight;
                contentScrollbarWidth = _this.schedulerContent.offsetWidth - _this.schedulerContent.clientWidth;
            }
            if (!!_this.schedulerResource) {
                resourceScrollbarHeight = _this.schedulerResource.offsetHeight - _this.schedulerResource.clientHeight;
                resourceScrollbarWidth = _this.schedulerResource.offsetWidth - _this.schedulerResource.clientWidth;
            }
            if (!!_this.schedulerContentBgTable && !!_this.schedulerContentBgTable.offsetHeight) {
                contentHeight = _this.schedulerContentBgTable.offsetHeight;
            }
            var tmpState = {};
            var needSet = false;
            if (contentScrollbarHeight != _this.state.contentScrollbarHeight) {
                tmpState = __assign(__assign({}, tmpState), { contentScrollbarHeight: contentScrollbarHeight });
                needSet = true;
            }
            if (contentScrollbarWidth != _this.state.contentScrollbarWidth) {
                tmpState = __assign(__assign({}, tmpState), { contentScrollbarWidth: contentScrollbarWidth });
                needSet = true;
            }
            if (contentHeight != _this.state.contentHeight) {
                tmpState = __assign(__assign({}, tmpState), { contentHeight: contentHeight });
                needSet = true;
            }
            if (resourceScrollbarHeight != _this.state.resourceScrollbarHeight) {
                tmpState = __assign(__assign({}, tmpState), { resourceScrollbarHeight: resourceScrollbarHeight });
                needSet = true;
            }
            if (resourceScrollbarWidth != _this.state.resourceScrollbarWidth) {
                tmpState = __assign(__assign({}, tmpState), { resourceScrollbarWidth: resourceScrollbarWidth });
                needSet = true;
            }
            if (needSet) {
                _this.setState(tmpState);
            }
        };
        _this.schedulerHeadRef = function (element) {
            _this.schedulerHead = element;
        };
        _this.onSchedulerHeadMouseOver = function () {
            _this.currentArea = 2;
        };
        _this.onSchedulerHeadMouseOut = function () {
            _this.currentArea = -1;
        };
        _this.onSchedulerHeadScroll = function (e) {
            if ((_this.currentArea === 2 || _this.currentArea === -1) &&
                _this.schedulerContent.scrollLeft != _this.schedulerHead.scrollLeft) {
                _this.schedulerContent.scrollLeft = _this.schedulerHead.scrollLeft;
            }
        };
        _this.schedulerResourceRef = function (element) {
            _this.schedulerResource = element;
        };
        _this.onSchedulerResourceMouseOver = function () {
            _this.currentArea = 1;
        };
        _this.onSchedulerResourceMouseOut = function () {
            _this.currentArea = -1;
        };
        _this.onSchedulerResourceScroll = function (e) {
            if ((_this.currentArea === 1 || _this.currentArea === -1) &&
                _this.schedulerContent.scrollTop != _this.schedulerResource.scrollTop) {
                _this.schedulerContent.scrollTop = _this.schedulerResource.scrollTop;
            }
        };
        _this.schedulerContentRef = function (element) {
            _this.schedulerContent = element;
        };
        _this.schedulerContentBgTableRef = function (element) {
            _this.schedulerContentBgTable = element;
        };
        _this.onSchedulerContentMouseOver = function () {
            _this.currentArea = 0;
        };
        _this.onSchedulerContentMouseOut = function () {
            _this.currentArea = -1;
        };
        _this.onSchedulerContentScroll = function (e) {
            if (_this.currentArea === 0 || _this.currentArea === -1) {
                if (_this.schedulerHead.scrollLeft != _this.schedulerContent.scrollLeft) {
                    _this.schedulerHead.scrollLeft = _this.schedulerContent.scrollLeft;
                }
                if (_this.schedulerResource.scrollTop != _this.schedulerContent.scrollTop) {
                    _this.schedulerResource.scrollTop = _this.schedulerContent.scrollTop;
                }
            }
            var _a = _this.props, schedulerData = _a.schedulerData, onScrollLeft = _a.onScrollLeft, onScrollRight = _a.onScrollRight, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom;
            var _b = _this.state, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop;
            if (_this.schedulerContent.scrollLeft !== scrollLeft) {
                if (_this.schedulerContent.scrollLeft === 0 && onScrollLeft != undefined) {
                    onScrollLeft(schedulerData, _this.schedulerContent, _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth);
                }
                if (_this.schedulerContent.scrollLeft === _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth &&
                    onScrollRight != undefined) {
                    onScrollRight(schedulerData, _this.schedulerContent, _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth);
                }
            }
            else if (_this.schedulerContent.scrollTop !== scrollTop) {
                if (_this.schedulerContent.scrollTop === 0 && onScrollTop != undefined) {
                    onScrollTop(schedulerData, _this.schedulerContent, _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight);
                }
                if (_this.schedulerContent.scrollTop === _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight &&
                    onScrollBottom != undefined) {
                    onScrollBottom(schedulerData, _this.schedulerContent, _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight);
                }
            }
            _this.setState({
                scrollLeft: _this.schedulerContent.scrollLeft,
                scrollTop: _this.schedulerContent.scrollTop,
            });
        };
        _this.onViewChange = function (e) {
            var _a = _this.props, onViewChange = _a.onViewChange, schedulerData = _a.schedulerData;
            var viewType = parseInt(e.target.value.charAt(0), undefined);
            var showAgenda = e.target.value.charAt(1) === '1';
            var isEventPerspective = e.target.value.charAt(2) === '1';
            onViewChange({ schedulerData: schedulerData, view: { viewType: viewType, showAgenda: showAgenda, isEventPerspective: isEventPerspective } });
        };
        _this.goNext = function () {
            var _a = _this.props, nextClick = _a.nextClick, schedulerData = _a.schedulerData;
            nextClick(schedulerData);
        };
        _this.goBack = function () {
            var _a = _this.props, prevClick = _a.prevClick, schedulerData = _a.schedulerData;
            prevClick(schedulerData);
        };
        _this.handleVisibleChange = function (visible) {
            _this.setState({ visible: visible });
        };
        _this.onSelect = function (date) {
            _this.setState({
                visible: false,
            });
            var _a = _this.props, onSelectDate = _a.onSelectDate, schedulerData = _a.schedulerData;
            onSelectDate({ schedulerData: schedulerData, date: date });
        };
        var schedulerData = props.schedulerData, dndSources = props.dndSources;
        var sources = [];
        sources.push(new DnDSource_1.default(function (e) {
            return e.eventItem;
        }, EventItem_1.default));
        if (dndSources != undefined && dndSources.length > 0) {
            sources = __spreadArrays(sources, dndSources);
        }
        var dndContext = new DnDContext_1.default(sources, ResourceEvents_1.default);
        _this.currentArea = -1;
        schedulerData.setDocumentWidth(document.documentElement.clientWidth);
        _this.state = {
            visible: false,
            dndContext: dndContext,
            contentHeight: schedulerData.getSchedulerContentDesiredHeight(),
            contentScrollbarHeight: 17,
            contentScrollbarWidth: 17,
            resourceScrollbarHeight: 17,
            resourceScrollbarWidth: 17,
            scrollLeft: 0,
            scrollTop: 0,
            documentWidth: document.documentElement.clientWidth,
            documentHeight: document.documentElement.clientHeight,
        };
        if (schedulerData.isSchedulerResponsive()) {
            window.onresize = _this.onWindowResize;
        }
        return _this;
    }
    Scheduler.prototype.componentDidMount = function () {
        this.resolveScrollbarSize();
    };
    Scheduler.prototype.componentDidUpdate = function () {
        this.resolveScrollbarSize();
        var schedulerData = this.props.schedulerData;
        var behaviors = schedulerData.behaviors;
        if (schedulerData.getScrollToSpecialMoment() && !!behaviors.getScrollSpecialMomentFunc) {
            if (!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth) {
                var start = moment(schedulerData.startDate).startOf('day');
                var end = moment(schedulerData.endDate).endOf('day');
                var specialMoment_1 = behaviors.getScrollSpecialMomentFunc(schedulerData, start, end);
                if (specialMoment_1 >= start && specialMoment_1 <= end) {
                    var index_1 = 0;
                    schedulerData.headers.forEach(function (item) {
                        var header = moment(item.time);
                        if (specialMoment_1 >= header) {
                            index_1++;
                        }
                    });
                    this.schedulerContent.scrollLeft = (index_1 - 1) * schedulerData.getContentCellWidth();
                    schedulerData.setScrollToSpecialMoment(false);
                }
            }
        }
    };
    Scheduler.prototype.render = function () {
        var _this = this;
        var _a = this.props, schedulerData = _a.schedulerData, leftCustomHeader = _a.leftCustomHeader, rightCustomHeader = _a.rightCustomHeader;
        var renderData = schedulerData.renderData, viewType = schedulerData.viewType, showAgenda = schedulerData.showAgenda, isEventPerspective = schedulerData.isEventPerspective, config = schedulerData.config;
        var width = schedulerData.getSchedulerWidth();
        var calendarPopoverEnabled = config.calendarPopoverEnabled;
        var dateLabel = schedulerData.getDateLabel();
        var defaultValue = "" + viewType + (showAgenda ? 1 : 0) + (isEventPerspective ? 1 : 0);
        var radioButtonList = config.views.map(function (item) {
            return (React.createElement(RadioButton, { key: "" + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0), value: "" + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0) },
                React.createElement("span", { style: { margin: '0px 8px' } }, item.viewName)));
        });
        var tbodyContent = React.createElement("tr", null);
        if (showAgenda) {
            console.log('Agenda not supported');
            tbodyContent = React.createElement(React.Fragment, null, "Not supported");
        }
        else {
            var resourceTableWidth = schedulerData.getResourceTableWidth();
            var schedulerContainerWidth = parseInt(width, undefined) - resourceTableWidth + 1;
            var schedulerWidth = schedulerData.getContentTableWidth() - 1;
            var DndResourceEvents_1 = this.state.dndContext.getDropTarget();
            var eventDndSource_1 = this.state.dndContext.getDndSource();
            var displayRenderData = renderData.filter(function (o) { return o.render; });
            var resourceEventsList = displayRenderData.map(function (item) {
                return React.createElement(DndResourceEvents_1, __assign({}, _this.props, { key: item.slotId, resourceEvents: item, dndSource: eventDndSource_1 }));
            });
            var contentScrollbarHeight = this.state.contentScrollbarHeight;
            var contentScrollbarWidth = this.state.contentScrollbarWidth;
            var resourceScrollbarHeight = this.state.resourceScrollbarHeight;
            var resourceScrollbarWidth = this.state.resourceScrollbarWidth;
            var contentHeight = this.state.contentHeight;
            var resourcePaddingBottom = resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0;
            var contentPaddingBottom = contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
            var schedulerContentStyle = {
                overflow: 'auto',
                margin: '0px',
                position: 'relative',
                paddingBottom: contentPaddingBottom,
                maxHeight: undefined,
            };
            var resourceContentStyle = {
                overflowX: 'auto',
                overflowY: 'auto',
                width: resourceTableWidth + resourceScrollbarWidth - 2,
                margin: "0px -" + contentScrollbarWidth + "px 0px 0px",
                maxHeight: undefined,
            };
            if (config.schedulerMaxHeight > 0) {
                schedulerContentStyle = __assign(__assign({}, schedulerContentStyle), { maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight });
                resourceContentStyle = __assign(__assign({}, resourceContentStyle), { maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight });
            }
            var resourceName = schedulerData.isEventPerspective ? config.taskName : config.resourceName;
            tbodyContent = (React.createElement("tr", null,
                React.createElement("td", { style: { width: resourceTableWidth, verticalAlign: 'top' } },
                    React.createElement("div", { className: 'resource-view' },
                        React.createElement("div", { style: { overflow: 'hidden', borderBottom: '1px solid #e9e9e9', height: config.tableHeaderHeight } },
                            React.createElement("div", { style: { overflowX: 'scroll', overflowY: 'hidden', margin: "0px 0px -" + contentScrollbarHeight + "px" } },
                                React.createElement("table", { className: 'resource-table' },
                                    React.createElement("thead", null,
                                        React.createElement("tr", { style: { height: config.tableHeaderHeight } },
                                            React.createElement("th", { className: 'header3-text' }, resourceName)))))),
                        React.createElement("div", { style: resourceContentStyle, ref: this.schedulerResourceRef, onMouseOver: this.onSchedulerResourceMouseOver, onMouseOut: this.onSchedulerResourceMouseOut, onScroll: this.onSchedulerResourceScroll },
                            React.createElement(ResourceView_1.default, __assign({}, this.props, { contentScrollbarHeight: resourcePaddingBottom }))))),
                React.createElement("td", null,
                    React.createElement("div", { className: 'scheduler-view', style: { width: schedulerContainerWidth, verticalAlign: 'top' } },
                        React.createElement("div", { style: { overflow: 'hidden', borderBottom: '1px solid #e9e9e9', height: config.tableHeaderHeight } },
                            React.createElement("div", { style: { overflowX: 'scroll', overflowY: 'hidden', margin: "0px 0px -" + contentScrollbarHeight + "px" }, ref: this.schedulerHeadRef, onMouseOver: this.onSchedulerHeadMouseOver, onMouseOut: this.onSchedulerHeadMouseOut, onScroll: this.onSchedulerHeadScroll },
                                React.createElement("div", { style: {
                                        paddingRight: contentScrollbarWidth + "px",
                                        width: schedulerWidth + contentScrollbarWidth,
                                    } },
                                    React.createElement("table", { className: 'scheduler-bg-table' },
                                        React.createElement(HeaderView_1.default, __assign({}, this.props)))))),
                        React.createElement("div", { style: schedulerContentStyle, ref: this.schedulerContentRef, onMouseOver: this.onSchedulerContentMouseOver, onMouseOut: this.onSchedulerContentMouseOut, onScroll: this.onSchedulerContentScroll },
                            React.createElement("div", { style: { width: schedulerWidth, height: contentHeight } },
                                React.createElement("div", { className: 'scheduler-content' },
                                    React.createElement("table", { className: 'scheduler-content-table' },
                                        React.createElement("tbody", null, resourceEventsList))),
                                React.createElement("div", { className: 'scheduler-bg' },
                                    React.createElement("table", { className: 'scheduler-bg-table', style: { width: schedulerWidth }, ref: this.schedulerContentBgTableRef },
                                        React.createElement(BodyView_1.default, __assign({}, this.props))))))))));
        }
        var popover = (React.createElement("div", { className: 'popover-calendar' },
            React.createElement(calendar_1.default, { fullscreen: false, onSelect: this.onSelect })));
        var schedulerHeader = React.createElement("div", null);
        if (config.headerEnabled) {
            schedulerHeader = (React.createElement(row_1.default, { type: 'flex', align: 'middle', justify: 'space-between', style: { marginBottom: '24px' } },
                leftCustomHeader,
                React.createElement(col_1.default, null,
                    React.createElement("div", { className: 'header2-text' },
                        React.createElement(icon_1.default, { type: 'left', style: { marginRight: '8px' }, className: 'icon-nav', onClick: this.goBack }),
                        calendarPopoverEnabled ? (React.createElement(popover_1.default, { content: popover, placement: 'bottom', trigger: 'click', visible: this.state.visible, onVisibleChange: this.handleVisibleChange },
                            React.createElement("span", { className: 'header2-text-label', style: { cursor: 'pointer' } }, dateLabel))) : (React.createElement("span", { className: 'header2-text-label' }, dateLabel)),
                        React.createElement(icon_1.default, { type: 'right', style: { marginLeft: '8px' }, className: 'icon-nav', onClick: this.goNext }))),
                React.createElement(col_1.default, null,
                    React.createElement(RadioGroup, { defaultValue: defaultValue, size: 'default', onChange: this.onViewChange }, radioButtonList)),
                rightCustomHeader));
        }
        return (React.createElement("table", { id: 'RBS-Scheduler-root', className: 'scheduler', style: { width: width + "px" } },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: 2 }, schedulerHeader))),
            React.createElement("tbody", null, tbodyContent)));
    };
    return Scheduler;
}(react_1.Component));
exports.default = Scheduler;
