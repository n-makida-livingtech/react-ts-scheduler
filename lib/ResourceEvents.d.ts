import { Component } from 'react';
import { SchedulerData, NewEventArgs, ConflictOccurredArgs, MoveEventArgs, MovingEventArgs, NewStockArgs } from './Scheduler';
import { Header } from './SchedulerData';
import DnDSource from './DnDSource';
interface ResourceEventsProps {
    schedulerData: SchedulerData;
    dndSource: DnDSource;
    resourceEvents: ResourceEvents;
    onSetAddMoreState?: (newState?: any) => void;
    updateEventStart?: (schedulerData: SchedulerData, event: Event, newStart: string) => any;
    updateEventEnd?: (schedulerData: SchedulerData, event: Event, newEnd: string) => any;
    moveEvent?: (args: MoveEventArgs) => void;
    movingEvent?: (args: MovingEventArgs) => void;
    newEvent?: (args: NewEventArgs) => any;
    newStock?: (args: NewStockArgs) => any;
    eventItemTemplateResolver?: (schedulerData: SchedulerData, eventItem: Event, bgColor: string, isStart: boolean, isEnd: boolean, name: string, eventItemHeight: number, agendaMaxEventWidth: number) => JSX.Element;
    conflictOccurred?: (args: ConflictOccurredArgs) => void;
    connectDropTarget?: any;
}
interface ResourceEventsState {
    isSelecting: boolean;
    left: number;
    width: number;
    leftIndex?: number;
    rightIndex?: number;
    startX?: number;
}
declare class ResourceEvents extends Component<ResourceEventsProps, ResourceEventsState> {
    eventContainer: any;
    groupOnly: boolean;
    headerItems: Header[];
    slotId: string;
    slotName: string;
    hasSummary: boolean;
    rowHeight: number;
    constructor(props: Readonly<ResourceEventsProps>);
    componentDidMount(): void;
    componentWillReceiveProps(np: any): void;
    initDrag: (ev: any) => void;
    doDrag: (ev: any) => void;
    stopDrag: (ev: any) => void;
    cancelDrag: (ev: any) => void;
    render(): JSX.Element;
    onAddMoreClick: (headerItem: Header) => void;
    eventContainerRef: (element: any) => void;
}
export default ResourceEvents;
