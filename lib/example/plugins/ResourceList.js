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
var ResourceList = (function (_super) {
    __extends(ResourceList, _super);
    function ResourceList(props) {
        return _super.call(this, props) || this;
    }
    ResourceList.prototype.render = function () {
        var _a = this.props, schedulerData = _a.schedulerData, newEvent = _a.newEvent, resourceDndSource = _a.resourceDndSource;
        var DnDResourceItem = resourceDndSource.getDragSource();
        var resources = schedulerData.resources;
        var resourceList = resources.map(function (item) {
            return React.createElement(DnDResourceItem, { key: item.id, resource: item, newEvent: newEvent, schedulerData: schedulerData });
        });
        return (React.createElement("ul", null, resourceList));
    };
    return ResourceList;
}(react_1.Component));
exports.default = ResourceList;
//# sourceMappingURL=ResourceList.js.map