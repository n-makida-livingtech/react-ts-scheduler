import * as React from 'react';
import { Component } from 'react';
import { SchedulerData, RowHeaderProps } from '.';
interface ResourceViewProps {
    schedulerData: SchedulerData;
    contentScrollbarHeight: number;
    RowHeaderFC?: React.FC<RowHeaderProps>;
}
declare class ResourceView extends Component<ResourceViewProps> {
    constructor(props: Readonly<ResourceViewProps>);
    render(): JSX.Element;
}
export default ResourceView;
