import * as React from 'react';
import { Component } from 'react';
import { SchedulerData, ColumnHeaderProps } from '.';
interface HeaderViewProps {
    schedulerData: SchedulerData;
    ColumnHeaderFC?: React.FC<ColumnHeaderProps>;
}
declare class HeaderView extends Component<HeaderViewProps> {
    constructor(props: Readonly<HeaderViewProps>);
    render(): JSX.Element;
}
export default HeaderView;
