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
declare const _default: typeof Basic & import("react-dnd").ContextComponent<any>;
export default _default;
