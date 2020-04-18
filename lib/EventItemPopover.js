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
var react_1 = require("react");
var EventItemPopover = (function (_super) {
    __extends(EventItemPopover, _super);
    function EventItemPopover(props) {
        return _super.call(this, props) || this;
    }
    EventItemPopover.prototype.render = function () {
        var PopoverFC = this.props.PopoverFC;
        if (PopoverFC) {
            return React.createElement(PopoverFC, __assign({}, this.props));
        }
        else {
            return React.createElement("div", { className: 'InternalError' }, "Missing popover plugin");
        }
    };
    return EventItemPopover;
}(react_1.Component));
exports.default = EventItemPopover;
