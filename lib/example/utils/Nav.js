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
var react_router_dom_1 = require("react-router-dom");
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(props) {
        return _super.call(this, props) || this;
    }
    Nav.prototype.render = function () {
        var ulStyle = {
            listStyle: "none",
            margin: "0px",
            padding: "0px",
            width: "auto",
        };
        var liStyle = {
            float: "left",
            marginLeft: "20px",
        };
        return (React.createElement("div", null,
            React.createElement("ul", { style: ulStyle },
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/" },
                        React.createElement("span", null, "Basic"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/readonly" },
                        React.createElement("span", null, "Read only"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/locale" },
                        React.createElement("span", null, "Locale"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/views" },
                        React.createElement("span", null, "Views"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/customheader" },
                        React.createElement("span", null, "Custom header"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/customeventstyle" },
                        React.createElement("span", null, "Custom event style"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/draganddrop" },
                        React.createElement("span", null, "Drag&Drop"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/summary" },
                        React.createElement("span", null, "Summary"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/overlapcheck" },
                        React.createElement("span", null, "Overlap check"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/nocrossslotmove" },
                        React.createElement("span", null, "No cross-slot move"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/freezefirstrow" },
                        React.createElement("span", null, "Freeze first row"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/resourceclickable" },
                        React.createElement("span", null, "Resource clickable"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/customtableheaders" },
                        React.createElement("span", null, "Custom table headers"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/hideweekends" },
                        React.createElement("span", null, "Hide weekends"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/customtimewindow" },
                        React.createElement("span", null, "Custom time window"))),
                React.createElement("li", { style: liStyle },
                    React.createElement(react_router_dom_1.Link, { target: "_self", to: "/infinitescroll" },
                        React.createElement("span", null, "Infinite scroll")))),
            React.createElement("div", { style: { clear: "both", marginBottom: "24px" } })));
    };
    return Nav;
}(react_1.Component));
exports.default = Nav;
//# sourceMappingURL=Nav.js.map