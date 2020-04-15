import * as moment from 'moment';
import { ViewTypes } from './types/ViewTypes';
import { CellUnits } from './types/CellUnits';
import { Config } from './Config';
import { Stock, GQLStock, DateStock } from './StockData';
export interface RowRenderData {
    slotId: string;
    slotName: string;
    thumbnailImagePath: string;
    parentId: string | undefined;
    groupOnly: boolean;
    hasSummary: boolean;
    rowMaxCount: number;
    rowHeight: number;
    headerItems: Header[];
    indent: number;
    hasChildren: boolean;
    expanded: boolean;
    render: true;
}
export interface Header {
    nonWorkingTime?: boolean;
    time?: string;
    length?: number;
    start?: moment.Moment;
    end?: moment.Moment;
    count?: number;
    addMore?: number;
    addMoreIndex?: number;
    summary?: any;
    events?: any[];
}
export interface EventGroup {
    groupOnly?: boolean;
    id: string;
    name: string;
    parentId?: string;
    state: any;
}
export interface Event {
    end: moment.Moment;
    start: moment.Moment;
    id: string;
    resourceId: string;
    title: string;
    bgColor?: string;
    groupId?: string;
    groupName?: string;
    exdates?: any;
    exrule?: any;
    rrule?: any;
    clickable1?: any;
    clickable2?: any;
    type?: number;
    resizable?: boolean;
    startResizable?: boolean;
    endResizable?: boolean;
    showPopover?: boolean;
    movable?: boolean;
}
export interface EventRecurring {
    recurringEventId: string;
    recurringEventStart: moment.Moment;
    recurringEventEnd: moment.Moment;
    id: string;
    start: moment.Moment;
    end: moment.Moment;
}
export interface Resource {
    groupOnly?: boolean;
    id: string;
    name: string;
    thumbnailImagePath: string;
    parentId?: string;
}
export default class SchedulerData {
    stateUpdateHandler: (sd?: SchedulerData) => void;
    resources: Resource[];
    stocks: DateStock;
    events: Event[];
    eventGroups: EventGroup[];
    eventGroupsAutoGenerated: boolean;
    viewType: ViewTypes;
    cellUnit: CellUnits;
    showAgenda: boolean;
    isEventPerspective: boolean;
    resizing: boolean;
    scrollToSpecialMoment: boolean;
    documentWidth: number;
    config: typeof Config;
    behaviors: any;
    startDate: moment.Moment;
    endDate: moment.Moment;
    selectDate: moment.Moment;
    renderData: RowRenderData[];
    headers: Header[];
    constructor(stateUpdateHandler: (sd: SchedulerData) => void, date?: moment.Moment, viewType?: ViewTypes, showAgenda?: boolean, isEventPerspective?: boolean, newConfig?: any, newBehaviors?: any);
    setResources(resources: Resource[]): void;
    setEventGroupsAutoGenerated(autoGenerated: boolean): void;
    setEventGroups(eventGroups: EventGroup[]): void;
    setStocks(stocks: GQLStock[]): void;
    setMinuteStep(minuteStep: number): void;
    setBesidesWidth(besidesWidth: number): void;
    getMinuteStepsInHour(): number;
    addResource(resource: Resource): void;
    addEventGroup(eventGroup: EventGroup): void;
    removeEventGroupById(eventGroupId: EventGroup['id']): void;
    containsEventGroupId(eventGroupId: EventGroup['id']): boolean;
    setEvents(events: Event[]): void;
    setScrollToSpecialMoment(scrollToSpecialMoment: boolean): void;
    prev(): void;
    next(): void;
    setDate(date?: moment.Moment): void;
    setViewType(viewType?: ViewTypes, showAgenda?: boolean, isEventPerspective?: boolean): void;
    setSchedulerMaxHeight(newSchedulerMaxHeight: number): void;
    isSchedulerResponsive(): boolean;
    toggleExpandStatus(slotId: any): void;
    isResourceViewResponsive(): boolean;
    isContentViewResponsive(): boolean;
    getSchedulerWidth(): string;
    getResourceTableWidth(): number;
    getContentCellWidth(): number;
    getContentTableWidth(): number;
    getScrollToSpecialMoment(): boolean;
    getSlots(): EventGroup[] | Resource[];
    getSlotById(slotId: any): EventGroup | Resource;
    getResourceById(resourceId: string): Resource;
    getTableHeaderHeight(): number;
    getSchedulerContentDesiredHeight(): number;
    getCellMaxEvents(): number;
    getDateLabel(): string;
    addEvent(newEvent: Event): void;
    updateEventStart(event: Event, newStart: moment.Moment): void;
    updateEventEnd(event: Event, newEnd: moment.Moment): void;
    moveEvent(event: Event, newSlotId: any, newSlotName: string, newStart: moment.Moment, newEnd: moment.Moment): void;
    isEventInTimeWindow(eventStart: moment.Moment, eventEnd: moment.Moment, windowStart: moment.Moment, windowEnd: moment.Moment): boolean;
    removeEvent(event: Event): void;
    removeEventById(eventId: string): void;
    addStock(newStock: Stock): void;
    getResourceTableConfigWidth(): string;
    getContentCellConfigWidth(): string;
    setDocumentWidth(documentWidth: number): void;
    startResizing(): void;
    stopResizing(): void;
    isResizing(): boolean;
    getEventSlotId(event: Event): string;
    private _detachEvent;
    private _attachEvent;
    private _handleRecurringEvents;
    private _resolveDate;
    private _createHeaders;
    private _createInitHeaderEvents;
    private _createHeaderEvent;
    private _createStockData;
    private _getEventGroupId;
    private _getEventGroupName;
    private _generateEventGroups;
    private _createInitRenderData;
    private _getSpan;
    private _validateResource;
    private _validateEventGroups;
    private _validateEvents;
    private _validateMinuteStep;
    private _compare;
    private _createRenderData;
}
