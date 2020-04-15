import { Component } from 'react';
import { SchedulerData } from '../src/Scheduler';
declare class Readonly extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: {});
    render(): JSX.Element;
}
declare const _default: typeof Readonly & import("react-dnd").ContextComponent<any>;
export default _default;
