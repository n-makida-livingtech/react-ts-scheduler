import { Component } from 'react';
import { SchedulerData, SchedulerHeader } from '../src/Scheduler';
declare class Locale extends Component<{}, {
    viewModel: SchedulerData;
    headerItem: SchedulerHeader;
    left: number;
    top: number;
    height: number;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    getDateLabel: (schedulerData: SchedulerData, viewType: number, startDate: string, endDate: string) => string;
    isNonWorkingTime: (schedulerData: SchedulerData, time: string) => boolean;
}
declare const _default: typeof Locale & import("react-dnd").ContextComponent<any>;
export default _default;
