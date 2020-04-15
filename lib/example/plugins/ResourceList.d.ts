import { Component } from "react";
import { SchedulerData } from "../../src/Scheduler";
import DnDSource from "../../src/DnDSource";
declare class ResourceList extends Component<{
    schedulerData: SchedulerData;
    newEvent: any;
    resourceDndSource: DnDSource;
}, {}> {
    constructor(props: Readonly<{
        schedulerData: SchedulerData;
        newEvent: any;
        resourceDndSource: DnDSource;
    }>);
    render(): JSX.Element;
}
export default ResourceList;
