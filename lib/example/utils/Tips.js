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
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips(props) {
        return _super.call(this, props) || this;
    }
    Tips.prototype.render = function () {
        var divStyle = {
            margin: "24px auto",
            padding: "0px",
            width: "1000px",
        };
        var liStyle = {
            margin: "10 0 10 20",
            listStyle: "none",
        };
        if (true) {
            return React.createElement(React.Fragment, null);
        }
        else {
            return (React.createElement("div", { style: divStyle },
                React.createElement("h3", null, "Thank you for trying React Big Scheduler. Here are some tips:"),
                React.createElement("ul", null,
                    React.createElement("li", { style: liStyle },
                        React.createElement("span", { style: { fontWeight: "bold" } }, "1. SchedulerData is the view model of Scheduler. For simplicity, I put it in react state object, you'd better put it in react props object when using.")),
                    React.createElement("li", { style: liStyle },
                        React.createElement("span", { style: { fontWeight: "bold" } }, "2. Default configs are in the SchedulerData.config object, we can modify them when needed.")),
                    React.createElement("li", { style: liStyle },
                        React.createElement("span", { style: { fontWeight: "bold" } }, "3. Default behaviors are in the SchedulerData.behaviors object, we can modify them when needed.")),
                    React.createElement("li", { style: liStyle },
                        React.createElement("span", { style: { fontWeight: "bold" } }, "4. The event array set to the SchedulerData should be sorted in ascending order by event.start property, otherwise there will be many rendering errors in the Scheduler component.")),
                    React.createElement("li", { style: liStyle },
                        React.createElement("span", { style: { fontWeight: "bold", color: "red" } }, "5. From the npm version 0.2.6, Scheduler will use responsive layout by default(set SchedulerData.config.schedulerWidth to a percentage instead of a number)."))),
                React.createElement("div", { style: { clear: "both" } })));
        }
    };
    return Tips;
}(react_1.Component));
exports.default = Tips;
//# sourceMappingURL=Tips.js.map