import { Component } from 'react';
import { SchedulerData, CellUnits } from '../src/Scheduler';
import * as moment from 'moment';
declare class CustomTimeWindow extends Component<{}, {
    viewModel: SchedulerData;
}> {
    constructor(props: Readonly<{}>);
    render(): JSX.Element;
    getCustomDate: (schedulerData: SchedulerData, num: number, date?: moment.Moment) => {
        startDate: moment.Moment;
        endDate: moment.Moment;
        cellUnit: CellUnits;
    };
    isNonWorkingTime: (schedulerData: SchedulerData, time: string) => boolean;
}
declare const _default: typeof CustomTimeWindow & import("react-dnd").ContextComponent<any>;
export default _default;
