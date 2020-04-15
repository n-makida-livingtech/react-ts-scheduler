import { Component } from "react";
declare class TaskItem extends Component<{
    task: any;
    isDragging: boolean;
    connectDragSource: (a?: any) => any;
    connectDragPreview: (a?: any) => any;
}, {}> {
    constructor(props: Readonly<{
        task: any;
        isDragging: boolean;
        connectDragSource: (a?: any) => any;
        connectDragPreview: (a?: any) => any;
    }>);
    render(): JSX.Element;
}
export default TaskItem;
