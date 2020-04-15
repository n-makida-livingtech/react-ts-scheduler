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
var ResourceView = (function (_super) {
    __extends(ResourceView, _super);
    function ResourceView(props) {
        return _super.call(this, props) || this;
    }
    ResourceView.prototype.render = function () {
        var _a = this.props, schedulerData = _a.schedulerData, contentScrollbarHeight = _a.contentScrollbarHeight, RowHeaderFC = _a.RowHeaderFC;
        var renderData = schedulerData.renderData;
        var width = schedulerData.getResourceTableWidth() - 2;
        var paddingBottom = contentScrollbarHeight;
        var displayRenderData = renderData.filter(function (o) { return o.render; });
        var resourceList = [React.createElement("div", { className: 'InternalError' }, "Missing RowHeaderFC!")];
        if (RowHeaderFC) {
            resourceList = displayRenderData.map(function (item) { return (React.createElement(RowHeaderFC, { key: item.slotId, schedulerData: schedulerData, item: item, width: width })); });
        }
        return (React.createElement("div", { style: { paddingBottom: paddingBottom } },
            React.createElement("table", { className: 'resource-table' },
                React.createElement("tbody", null, resourceList))));
    };
    return ResourceView;
}(react_1.Component));
exports.default = ResourceView;
