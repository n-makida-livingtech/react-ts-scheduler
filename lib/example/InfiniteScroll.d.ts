import { Component } from 'react';
import { SchedulerData, SchedulerContentState } from '../src/Scheduler';
declare class InfiniteScroll extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    onScrollRight: (schedulerData: SchedulerData, schedulerContent: SchedulerContentState, maxScrollLeft: number) => void;
    onScrollLeft: (schedulerData: SchedulerData, schedulerContent: SchedulerContentState, maxScrollLeft: number) => void;
}
declare const _default: typeof InfiniteScroll & import("react-dnd").ContextComponent<any>;
export default _default;
