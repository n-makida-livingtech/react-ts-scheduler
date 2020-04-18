import { DnDTypes } from './types/DnDTypes';
import * as moment from 'moment';
import { SchedulerData } from './Scheduler';
import ResourceEvents from './ResourceEvents';
import { Identifier } from 'dnd-core';
import { Event } from './SchedulerData';
import DnDSource from './DnDSource';
export default class DnDContext {
    sourceMap: Map<any, any>;
    DecoratedComponent: any;
    constructor(sources: DnDSource[], DecoratedComponent: any);
    getDropType: () => {
        drop: (props: {
            schedulerData: SchedulerData;
            resourceEvents: ResourceEvents;
        }, monitor: any, component: any) => {
            slotId: string;
            slotName: string;
            start: moment.Moment;
            end: moment.Moment;
            initialStart: any;
            initialEnd: any;
        };
        hover: (props: {
            schedulerData: SchedulerData;
            resourceEvents: ResourceEvents;
            movingEvent: (schedulerData: SchedulerData, slotId: string, slotName: string, newStart: moment.Moment, newEnd: moment.Moment, action: string, type: Identifier, item: Event) => void;
        }, monitor: any, component: any) => void;
        canDrop: (props: {
            schedulerData: SchedulerData;
            resourceEvents: ResourceEvents;
        }, monitor: any) => boolean;
    };
    getDropCollect: (connect: any, monitor: any) => {
        connectDropTarget: any;
        isOver: any;
    };
    getDropTarget: () => import("react-dnd").DndComponentClass<any, Pick<unknown, never>>;
    getDndSource: (dndType?: DnDTypes) => any;
}
