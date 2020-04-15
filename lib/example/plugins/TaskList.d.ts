import { Component } from "react";
import { SchedulerData, SchedulerDnDSource } from "../../src/Scheduler";
declare class TaskList extends Component<{
    schedulerData: SchedulerData;
    newEvent: Event;
    taskDndSource: SchedulerDnDSource;
}, {}> {
    constructor(props: Readonly<{
        schedulerData: SchedulerData;
        newEvent: Event;
        taskDndSource: SchedulerDnDSource;
    }>);
    render(): JSX.Element;
}
export default TaskList;
