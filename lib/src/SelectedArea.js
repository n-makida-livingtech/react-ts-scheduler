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
var SelectedArea = (function (_super) {
    __extends(SelectedArea, _super);
    function SelectedArea(props) {
        return _super.call(this, props) || this;
    }
    SelectedArea.prototype.render = function () {
        var _a = this.props, left = _a.left, width = _a.width, schedulerData = _a.schedulerData;
        var config = schedulerData.config;
        return React.createElement("div", { className: "selected-area", style: { left: left, width: width, top: 0, bottom: 0, backgroundColor: config.selectedAreaColor } });
    };
    return SelectedArea;
}(react_1.Component));
exports.default = SelectedArea;
//# sourceMappingURL=SelectedArea.js.map