import { Component } from 'react';
import { SchedulerData, SchedulerDnDSource, EventActionFuncArgs } from '../src/Scheduler';
interface DragAndDropState {
    viewModel: SchedulerData;
    taskDndSource: SchedulerDnDSource;
    resourceDndSource: SchedulerDnDSource;
}
declare class DragAndDrop extends Component<{}, DragAndDropState> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    subtitleGetter: (args: EventActionFuncArgs) => string;
}
declare const _default: typeof DragAndDrop & import("react-dnd").ContextComponent<any>;
export default _default;
