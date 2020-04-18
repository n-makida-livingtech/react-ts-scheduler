import { Component, ReactNode } from "react";
import { SchedulerData } from "./Scheduler";
interface SummaryProps {
    schedulerData: SchedulerData;
    summary: Summary;
    left: number;
    width: number;
    top: number;
    key: string;
}
declare class Summary extends Component<SummaryProps> {
    color: string;
    fontSize: number;
    text: ReactNode;
    constructor(props: Readonly<SummaryProps>);
    render(): JSX.Element;
}
export default Summary;
