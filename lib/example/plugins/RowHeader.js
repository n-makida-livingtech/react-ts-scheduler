"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var icon_1 = require("antd/lib/icon");
exports.RowHeaderComponent = function (props) {
    var item = props.item, schedulerData = props.schedulerData;
    var indents = [];
    for (var i = 0; i < item.indent; i++) {
        indents.push(React.createElement("span", { key: "es" + i, className: 'expander-space' }));
    }
    console.log(item);
    var indent = React.createElement("span", { key: "es" + item.indent, className: 'expander-space' });
    if (item.hasChildren) {
        indent = item.expanded ? (React.createElement(icon_1.default, { type: 'minus-square', key: "es" + item.indent, style: {}, className: '', onClick: function () {
                schedulerData.toggleExpandStatus(item.slotId);
                schedulerData.stateUpdateHandler(schedulerData);
            } })) : (React.createElement(icon_1.default, { type: 'plus-square', key: "es" + item.indent, style: {}, className: '', onClick: function () {
                schedulerData.toggleExpandStatus(item.slotId);
                schedulerData.stateUpdateHandler(schedulerData);
            } }));
    }
    indents.push(indent);
    var tdStyle = { height: item.rowHeight };
    if (item.groupOnly) {
        tdStyle.backgroundColor = schedulerData.config.groupOnlySlotColor;
    }
    return (React.createElement("tr", { key: item.slotId },
        React.createElement("td", { "data-resource-id": item.slotId, style: tdStyle },
            React.createElement("div", { title: item.slotName, className: 'overflow-text header2-text', style: { textAlign: 'left' } },
                React.createElement("span", { className: 'slot-cell' },
                    indents,
                    React.createElement("a", { className: 'slot-text', onClick: function () {
                            alert("You just clicked a " + (schedulerData.isEventPerspective ? 'task' : 'resource') + ".{id: " + item.slotId + ", name: " + item.slotName + "}");
                        } }, item.slotName))))));
};
//# sourceMappingURL=RowHeader.js.map