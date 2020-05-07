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
var moment = require("moment");
var react_1 = require("react");
var BodyView = (function (_super) {
    __extends(BodyView, _super);
    function BodyView(props) {
        return _super.call(this, props) || this;
    }
    BodyView.prototype.render = function () {
        var schedulerData = this.props.schedulerData;
        var renderData = schedulerData.renderData, headers = schedulerData.headers, config = schedulerData.config, behaviors = schedulerData.behaviors, stocks = schedulerData.stocks;
        var cellWidth = schedulerData.getContentCellWidth();
        var displayRenderData = renderData.filter(function (o) { return o.render; });
        var tableRows = displayRenderData.map(function (item) {
            var rowCells = headers.map(function (header, index) {
                var key = item.slotId + '_' + header.time;
                var bodyCss = {
                    width: index === headers.length - 1 ? undefined : cellWidth,
                    backgroundColor: undefined,
                };
                var stockCss = {
                    height: item.rowHeight > config.defaultResourceHeight ? item.rowHeight : config.defaultResourceHeight,
                };
                if (!!header.nonWorkingTime) {
                    bodyCss.backgroundColor = config.nonWorkingTimeBodyBgColor;
                }
                if (item.groupOnly) {
                    bodyCss.backgroundColor = config.groupOnlySlotColor;
                }
                if (stocks[item.slotId] && stocks[item.slotId][moment(header.time).format('Y-MM-DD')]) {
                    stockCss.backgroundColor = config.stockBodyBgColor;
                }
                return (React.createElement("td", { key: key, style: bodyCss },
                    React.createElement("div", { style: stockCss })));
            });
            var cssParent = {
                height: item.rowHeight > config.defaultResourceHeight ? item.rowHeight : config.defaultResourceHeight,
            };
            return (React.createElement("tr", { key: item.slotId, style: cssParent }, rowCells));
        });
        var cssToParent = {};
        return React.createElement("tbody", { style: cssToParent }, tableRows);
    };
    return BodyView;
}(react_1.Component));
exports.default = BodyView;
