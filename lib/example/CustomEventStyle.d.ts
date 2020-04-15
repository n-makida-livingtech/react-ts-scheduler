import { Component } from 'react';
import { SchedulerData } from '../src/Scheduler';
interface CustomEventStyleState {
    viewModel: SchedulerData;
}
declare class CustomEventStyle extends Component<{}, CustomEventStyleState> {
    constructor(props: any);
    render(): JSX.Element;
}
declare const _default: typeof CustomEventStyle & import("react-dnd").ContextComponent<any>;
export default _default;
