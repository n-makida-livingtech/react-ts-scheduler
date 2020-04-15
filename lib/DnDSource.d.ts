import { DragSourceMonitor } from 'react-dnd';
import { DnDTypes } from './types/DnDTypes';
import { SchedulerData, MoveEventArgs, NewEventArgs, ConflictOccurredArgs } from './Scheduler';
import ResourceEvents from './ResourceEvents';
export default class DnDSource {
    resolveDragObjFunc: (props: any) => any;
    DecoratedComponent: any;
    dndType: DnDTypes;
    dragSource: any;
    constructor(resolveDragObjFunc: any, DecoratedComponent: any, dndType?: DnDTypes);
    getDragSpec: () => {
        beginDrag: (props: any, monitor: DragSourceMonitor, component: any) => any;
        endDrag: (props: {
            schedulerData: SchedulerData;
            moveEvent: (args: MoveEventArgs) => void;
            newEvent: (args: NewEventArgs) => void;
            conflictOccurred?: (args: ConflictOccurredArgs) => void;
        }, monitor: DragSourceMonitor, component: any) => void;
        canDrag: (props: {
            schedulerData: SchedulerData;
            resourceEvents: ResourceEvents;
        }) => boolean;
    };
    getDragCollect: (connect: any, monitor: DragSourceMonitor) => {
        connectDragSource: any;
        isDragging: boolean;
        connectDragPreview: any;
    };
    getDragSource: () => any;
}
