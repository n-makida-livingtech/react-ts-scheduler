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
var Moment = require("moment");
var react_1 = require("react");
var ViewTypes_1 = require("./types/ViewTypes");
var HeaderView = (function (_super) {
    __extends(HeaderView, _super);
    function HeaderView(props) {
        return _super.call(this, props) || this;
    }
    HeaderView.prototype.render = function () {
        var _a = this.props, schedulerData = _a.schedulerData, ColumnHeaderFC = _a.ColumnHeaderFC;
        var headers = schedulerData.headers;
        var headerHeight = schedulerData.getTableHeaderHeight();
        var css = {
            height: headerHeight,
        };
        var startYear = schedulerData.startDate.format('Y');
        var headerList = [React.createElement("div", { className: 'InternalError' }, "Missing ColumnHeaderFC")];
        if (schedulerData.viewType === ViewTypes_1.ViewTypes.Year) {
            var dateList_1 = [];
            var widthList_1 = [];
            for (var index = 0; index < 12; index++) {
                var sumDay = 0;
                if (dateList_1[index - 1]) {
                    sumDay = dateList_1[index - 1];
                }
                var month = ('0' + (1 + index)).slice(-2);
                dateList_1.push(Moment(startYear + '-' + month)
                    .endOf('month')
                    .date() + sumDay);
                widthList_1.push(Moment(startYear + '-' + month)
                    .endOf('month')
                    .date() * 2);
            }
            if (ColumnHeaderFC) {
                var count_1 = 12;
                headerList = headers.map(function (header, index) {
                    var date = new Date(header.time);
                    var month = date.getMonth();
                    if (dateList_1[month] === index + 1) {
                        return (React.createElement(ColumnHeaderFC, { key: index, schedulerData: schedulerData, header: header, headersCount: count_1, index: index, width: widthList_1[month] }));
                    }
                    return;
                });
            }
        }
        else {
            if (ColumnHeaderFC) {
                var count_2 = headers.length;
                headerList = headers.map(function (header, index) {
                    return (React.createElement(ColumnHeaderFC, { key: index, schedulerData: schedulerData, header: header, headersCount: count_2, index: index }));
                });
            }
        }
        return (React.createElement("thead", null,
            React.createElement("tr", { style: css }, headerList)));
    };
    return HeaderView;
}(react_1.Component));
exports.default = HeaderView;
