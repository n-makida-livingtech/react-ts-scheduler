import { Component } from 'react';
import { SchedulerData } from '../src/Scheduler';
declare class CustomHeaders extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
}
declare const _default: typeof CustomHeaders & import("react-dnd").ContextComponent<any>;
export default _default;
