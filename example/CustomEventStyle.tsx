import * as React from "react";
import { Component, useState } from "react";
import Scheduler, {
    SchedulerData,
    SCHEDULER_DATE_FORMAT,
    SchedulerResource,
    SchedulerViewTypes,
    SchedulerEvent,
    EventItemTemplateResolverArgs,
} from "../src/Scheduler";
import * as ExampleFunction from "./utils/ExampleFunctions";

import { DemoData } from "./utils/DemoData";
import Nav from "./utils/Nav";

import withDragDropContext from "./utils/withDnDContext";

interface CustomEventStyleState {
    viewModel: SchedulerData;
}

class CustomEventStyle extends Component<{}, CustomEventStyleState> {
    constructor(props) {
        super(props);

        const schedulerData = new SchedulerData(ExampleFunction.getNow(), SchedulerViewTypes.Week, false, false, {
            views: [
                { viewName: "Day(Agenda)", viewType: SchedulerViewTypes.Day, showAgenda: true, isEventPerspective: false },
                { viewName: "Week", viewType: SchedulerViewTypes.Week, showAgenda: false, isEventPerspective: false },
                { viewName: "Month(TaskView)", viewType: SchedulerViewTypes.Month, showAgenda: false, isEventPerspective: true },
                { viewName: "Year", viewType: SchedulerViewTypes.Year, showAgenda: false, isEventPerspective: false },
            ],
        });
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.eventsForCustomEventStyle);
        this.state = {
            viewModel: schedulerData,
        };
    }

    public render() {
        const { viewModel } = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{ textAlign: "center" }}>Custom event style</h3>
                    <Scheduler schedulerData={viewModel}
                        prevClick={ExampleFunction.prevClick.bind(this)}
                        nextClick={ExampleFunction.nextClick.bind(this)}
                        onSelectDate={ExampleFunction.onSelectDate.bind(this)}
                        onViewChange={ExampleFunction.onViewChange.bind(this)}
                        eventItemClick={ExampleFunction.eventClicked.bind(this)}
                        viewEventClick={ExampleFunction.ops1.bind(this)}
                        viewEventText="Ops 1"
                        viewEvent2Text="Ops 2"
                        viewEvent2Click={ExampleFunction.ops2.bind(this)}
                        updateEventStart={ExampleFunction.updateEventStart.bind(this)}
                        updateEventEnd={ExampleFunction.updateEventEnd.bind(this)}
                        moveEvent={ExampleFunction.moveEvent.bind(this)}
                        newEvent={ExampleFunction.newEvent.bind(this)}
                        onScrollLeft={ExampleFunction.onScrollLeft.bind(this)}
                        onScrollRight={ExampleFunction.onScrollRight.bind(this)}
                        onScrollTop={ExampleFunction.onScrollTop.bind(this)}
                        eventItemTemplateResolver={this.eventItemTemplateResolver}
                        toggleExpandFunc={ExampleFunction.toggleExpandFunc.bind(this)}
                    />
                </div>
            </div>
        );
    }

    public eventItemTemplateResolver = (args: EventItemTemplateResolverArgs) => {
        const borderWidth = args.isStart ? "4" : "0";
        let borderColor = "rgba(0,139,236,1)";
        let backgroundColor = "#80C5F6";
        const titleText = args.schedulerData.behaviors.getEventTextFunc(args.schedulerData, event);
        if (!!event.type) {
            borderColor = args.event.type == 1 ? "rgba(0,139,236,1)" : (args.event.type == 3 ? "rgba(245,60,43,1)" : "#999");
            backgroundColor = args.event.type == 1 ? "#80C5F6" : (args.event.type == 3 ? "#FA9E95" : "#D9D9D9");
        }
        let divStyle = { borderLeft: borderWidth + "px solid " + borderColor, backgroundColor, height: args.mustBeHeight, maxWidth: undefined };
        if (!!args.agendaMaxEventWidth) {
            divStyle = { ...divStyle, maxWidth: args.agendaMaxEventWidth };
        }

        return <div key={args.event.id} className={args.mustAddCssClass} style={divStyle}>
            <span style={{ marginLeft: "4px", lineHeight: `${args.mustBeHeight}px` }}>{titleText}</span>
        </div>;
    }
}

export default withDragDropContext(CustomEventStyle);
