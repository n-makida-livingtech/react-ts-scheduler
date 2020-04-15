import * as React from "react";
import { Component } from "react";
import { SchedulerData, EventItemProps, EventProps } from "./Scheduler";
import { Event } from "./SchedulerData";
interface EventItemState {
    left: number;
    top: number;
    width: number;
    startX?: number;
    endX?: number;
}
declare class EventItem extends Component<EventItemProps & {
    EventFC: React.FC<EventProps>;
}, EventItemState> {
    private startResizer;
    private endResizer;
    constructor(props: Readonly<EventItemProps & {
        EventFC: React.FunctionComponent<EventProps>;
    }>);
    componentWillReceiveProps(np: any): void;
    componentDidMount(): void;
    initStartDrag: (ev: any) => void;
    doStartDrag: (ev: any) => void;
    stopStartDrag: (ev: any) => void;
    cancelStartDrag: (ev: any) => void;
    initEndDrag: (ev: any) => void;
    doEndDrag: (ev: any) => void;
    stopEndDrag: (ev: any) => void;
    cancelEndDrag: (ev: any) => void;
    render(): JSX.Element;
    startResizable: (props: {
        eventItem: Event;
        isInPopover: boolean;
        schedulerData: SchedulerData;
    }) => boolean;
    endResizable: (props: {
        eventItem: Event;
        isInPopover: boolean;
        schedulerData: SchedulerData;
    }) => boolean;
    subscribeResizeEvent: (props: {
        eventItem: Event;
        isInPopover: boolean;
        schedulerData: SchedulerData;
    }) => void;
}
export default EventItem;
