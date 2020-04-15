import { Component } from 'react';
import { SchedulerData } from '../src/Scheduler';
declare class Summary extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    getSummary: (schedulerData: SchedulerData, headerEvents: any, slotId: string, slotName: string, headerStart: string, headerEnd: string) => {
        text: any;
        color: string;
        fontSize: string;
    };
    changeSummaryPos: () => void;
}
declare const _default: typeof Summary & import("react-dnd").ContextComponent<any>;
export default _default;
