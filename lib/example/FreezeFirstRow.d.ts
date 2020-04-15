import { Component } from "react";
import { SchedulerData } from "../src/Scheduler";
declare class FreezeFirstRow extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
}
declare const _default: typeof FreezeFirstRow & import("react-dnd").ContextComponent<any>;
export default _default;
