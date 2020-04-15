"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var Basic_1 = require("./Basic");
var Readonly_1 = require("./Readonly");
var Locale_1 = require("./Locale");
var Views_1 = require("./Views");
var CustomHeader_1 = require("./CustomHeader");
var CustomTableHeaders_1 = require("./CustomTableHeaders");
var CustomEventStyle_1 = require("./CustomEventStyle");
var DragAndDrop_1 = require("./DragAndDrop");
var Summary_1 = require("./Summary");
var OverlapCheck_1 = require("./OverlapCheck");
var NoCrossSlotMove_1 = require("./NoCrossSlotMove");
var FreezeFirstRow_1 = require("./FreezeFirstRow");
var ResourceClickable_1 = require("./ResourceClickable");
var HideWeekends_1 = require("./HideWeekends");
var CustomTimeWindow_1 = require("./CustomTimeWindow");
var InfiniteScroll_1 = require("./InfiniteScroll");
require("../src/css/style.css");
react_dom_1.render((React.createElement(react_router_dom_1.HashRouter, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Basic_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/readonly", component: Readonly_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/locale", component: Locale_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/views", component: Views_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/customheader", component: CustomHeader_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/customeventstyle", component: CustomEventStyle_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/draganddrop", component: DragAndDrop_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/summary", component: Summary_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/overlapcheck", component: OverlapCheck_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/nocrossslotmove", component: NoCrossSlotMove_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/freezefirstrow", component: FreezeFirstRow_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/resourceclickable", component: ResourceClickable_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/customtableheaders", component: CustomTableHeaders_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/hideweekends", component: HideWeekends_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/customtimewindow", component: CustomTimeWindow_1.default }),
    React.createElement(react_router_dom_1.Route, { path: "/infinitescroll", component: InfiniteScroll_1.default }))), document.getElementById("root"));
//# sourceMappingURL=bundle.js.map