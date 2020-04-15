import { Component } from "react";
import { SchedulerResource } from "../../src/Scheduler";
declare class ResourceItem extends Component<{
    resource: SchedulerResource;
    isDragging: boolean;
    connectDragSource: (action: any) => any;
    connectDragPreview: (action: any) => any;
}, {}> {
    constructor(props: Readonly<{
        resource: SchedulerResource;
        isDragging: boolean;
        connectDragSource: (action: any) => any;
        connectDragPreview: (action: any) => any;
    }>);
    render(): JSX.Element;
}
export default ResourceItem;
