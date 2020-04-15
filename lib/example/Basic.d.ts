import * as moment from 'moment';
import { Component } from 'react';
import { SchedulerData } from '../src/Scheduler';
import 'antd/lib/style/index.css';
interface IBasicState {
    viewModel: SchedulerData;
    update: moment.Moment;
}
declare class Basic extends Component<{}, IBasicState> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
}
export default Basic;
