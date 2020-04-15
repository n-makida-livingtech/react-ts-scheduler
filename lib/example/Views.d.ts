import { Component } from 'react';
import { SchedulerData, SchedulerEvent } from '../src/Scheduler';
declare class Basic extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    subtitleGetter: (schedulerData: SchedulerData, event: SchedulerEvent) => string;
}
declare const _default: typeof Basic & import("react-dnd").ContextComponent<any>;
export default _default;
