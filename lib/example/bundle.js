"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var Basic_1 = require("./Basic");
require("../src/css/style.css");
react_dom_1.render(React.createElement(react_router_dom_1.HashRouter, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: Basic_1.default })), document.getElementById('root'));
//# sourceMappingURL=bundle.js.map