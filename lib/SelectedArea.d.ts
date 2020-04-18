import { Component } from 'react';
import { SchedulerData } from '.';
interface SelectedAreaProps {
    schedulerData: SchedulerData;
    left: number;
    width: number;
}
declare class SelectedArea extends Component<SelectedAreaProps> {
    constructor(props: Readonly<SelectedAreaProps>);
    render(): JSX.Element;
}
export default SelectedArea;
