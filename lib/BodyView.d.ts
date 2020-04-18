import { Component } from 'react';
import { SchedulerData } from './Scheduler';
interface BodyViewProps {
    schedulerData: SchedulerData;
}
declare class BodyView extends Component<BodyViewProps> {
    constructor(props: Readonly<BodyViewProps>);
    render(): JSX.Element;
}
export default BodyView;
