import * as React from 'react';
import * as moment from 'moment';
import { Component } from 'react';
import 'antd/lib/select/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/popover/style/index.css';
import 'antd/lib/calendar/style/index.css';
import DnDSource from './DnDSource';
import DnDContext from './DnDContext';
import { ViewTypes } from './types/ViewTypes';
import { DnDTypes } from './types/DnDTypes';
import { CellUnits } from './types/CellUnits';
import { SummaryPos } from './types/SummaryPos';
import SchedulerData from './SchedulerData';
import { RowRenderData, Event, EventGroup, Header, Resource, EventRecurring } from './SchedulerData';
interface SchedulerProps {
  schedulerData: SchedulerData;
  RowHeaderFC?: React.FC<RowHeaderProps>;
  PopoverFC?: React.FC<EventItemPopoverProps>;
  EventFC?: React.FC<EventProps>;
  ColumnHeaderFC?: React.FC<ColumnHeaderProps>;
  prevClick: (action?: any) => any;
  nextClick: (action?: any) => any;
  onViewChange: (args: OnViewChangeArgs) => any;
  onSelectDate: (args: OnSelectDateArgs) => any;
  onSetAddMoreState?: (action?: any) => void;
  updateEventStart?: (args: UpdateEventStartArgs) => any;
  updateEventEnd?: (args: UpdateEventEndArgs) => any;
  moveEvent?: (args: MoveEventArgs) => void;
  movingEvent?: (args: MovingEventArgs) => void;
  leftCustomHeader?: any;
  rightCustomHeader?: any;
  newEvent?: (args: NewEventArgs) => void;
  newStock?: (args: NewStockArgs) => void;
  conflictOccurred?: (args: ConflictOccurredArgs) => void;
  dndSources?: DnDSource[];
  onScrollLeft?: (schedulerData: SchedulerData, schedulerContent: any, maxScrollLeft: any) => any;
  onScrollRight?: (schedulerData: SchedulerData, schedulerContent: any, maxScrollLeft: any) => any;
  onScrollTop?: (schedulerData: SchedulerData, schedulerContent: any, maxScrollTop: any) => any;
  onScrollBottom?: (schedulerData: SchedulerData, schedulerContent: any, maxScrollTop: any) => any;
  eventItemPopoverTemplateResolver?: (plugin: EventItemPopoverResolverArgs) => JSX.Element;
  eventItemPlugin?: (plugin: EventItemProps) => JSX.Element;
}
export interface ColumnHeaderProps {
  header: Header;
  headersCount: number;
  schedulerData: SchedulerData;
  width?: number;
  index: number;
}
export interface RowHeaderProps {
  schedulerData: SchedulerData;
  item: RowRenderData;
  width: number;
}
export interface EventItemPopoverProps {
  schedulerData: SchedulerData;
  eventItem: Event;
  title: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  timelineEvent?: JSX.Element;
  connectDragSource?: (action: any) => any;
  connectDragPreview?: (action: any) => any;
}
export interface ToggleExpandFuncArgs {
  schedulerData: SchedulerData;
  slotId: string;
}
export interface NonAgendaCellHeaderTemplateResolverArgs {
  schedulerData: SchedulerData;
  item: any;
}
export interface EventActionFuncArgs {
  schedulerData: SchedulerData;
  event: Event;
}
export interface OnViewChangeArgs {
  schedulerData: SchedulerData;
  view: {
    viewType: ViewTypes;
    showAgenda: boolean;
    isEventPerspective: boolean;
  };
}
export interface OnSelectDateArgs {
  schedulerData: SchedulerData;
  date: moment.Moment;
}
export interface UpdateEventStartArgs {
  schedulerData: SchedulerData;
  event: Event;
  newStart: moment.Moment;
}
export interface UpdateEventEndArgs {
  schedulerData: SchedulerData;
  event: Event;
  newEnd: moment.Moment;
}
export interface EventItemProps {
  schedulerData: SchedulerData;
  eventItem: Event;
  bgColor: string;
  isStart: boolean;
  isEnd: boolean;
  left: number;
  width: number;
  top: number;
  isInPopover: boolean;
  leftIndex: number;
  rightIndex: number;
  isDragging: boolean;
  connectDragSource: (action: any) => any;
  connectDragPreview: (action: any) => any;
  updateEventStart?: (args: UpdateEventStartArgs) => any;
  updateEventEnd?: (args: UpdateEventEndArgs) => any;
  moveEvent?: (args: MoveEventArgs) => void;
  conflictOccurred?: (args: ConflictOccurredArgs) => any;
  mustAddCssClass?: string;
  mustBeHeight?: number;
  agendaMaxEventWidth?: number;
}
export interface EventProps extends EventItemProps {
  startResizeDiv: JSX.Element;
  endResizeDiv: JSX.Element;
}
export interface ConflictOccurredArgs {
  schedulerData: SchedulerData;
  action: string;
  event: Event;
  type: DnDTypes;
  slotId: string;
  slotName: string;
  start: moment.Moment;
  end: moment.Moment;
}
export interface NewEventArgs {
  schedulerData: SchedulerData;
  slotId: string;
  slotName: string;
  start: moment.Moment;
  end: moment.Moment;
  type?: DnDTypes;
  item?: Event | EventGroup;
}
export interface NewStockArgs {
  schedulerData: SchedulerData;
  slotId: string;
  slotName: string;
  start: moment.Moment;
  end: moment.Moment;
  type?: DnDTypes;
  item?: Event | EventGroup;
  stock: number;
}
export interface MoveEventArgs {
  schedulerData: SchedulerData;
  event: Event;
  slotId: string;
  slotName: string;
  start: moment.Moment;
  end: moment.Moment;
}
export interface MovingEventArgs {
  schedulerData: SchedulerData;
  slotId: string;
  slotName: string;
  newStart: moment.Moment;
  newEnd: moment.Moment;
  action: any;
  type: DnDTypes;
  item: Event | EventGroup;
}
export interface EventItemPopoverResolverArgs {
  schedulerData: SchedulerData;
  eventItem: Event;
  title: string;
  start: moment.Moment;
  end: moment.Moment;
  statusColor: string;
}
export interface EventItemPopoverResolverDnDArgs {
  timelineEvent: JSX.Element;
  connectDragSource: (action: any) => any;
  connectDragPreview: (action: any) => any;
}
export interface SchedulerContentState {
  visible: false;
  dndContext: DnDContext;
  contentHeight: number;
  contentScrollbarHeight: number;
  contentScrollbarWidth: number;
  resourceScrollbarHeight: number;
  resourceScrollbarWidth: number;
  scrollLeft: number;
  scrollTop: number;
  documentWidth: number;
  documentHeight: number;
}
declare class Scheduler extends Component<SchedulerProps, SchedulerContentState> {
  currentArea: number;
  schedulerContent: any;
  schedulerResource: any;
  schedulerContentBgTable: any;
  schedulerHead: any;
  constructor(props: Readonly<SchedulerProps>);
  onWindowResize: (e: any) => void;
  componentDidMount(): void;
  componentDidUpdate(): void;
  render(): JSX.Element;
  resolveScrollbarSize: () => void;
  schedulerHeadRef: (element: Element) => void;
  onSchedulerHeadMouseOver: () => void;
  onSchedulerHeadMouseOut: () => void;
  onSchedulerHeadScroll: (e: any) => void;
  schedulerResourceRef: (element: Element) => void;
  onSchedulerResourceMouseOver: () => void;
  onSchedulerResourceMouseOut: () => void;
  onSchedulerResourceScroll: (e: any) => void;
  schedulerContentRef: (element: Element) => void;
  schedulerContentBgTableRef: (element: any) => void;
  onSchedulerContentMouseOver: () => void;
  onSchedulerContentMouseOut: () => void;
  onSchedulerContentScroll: (e: any) => void;
  onViewChange: (e: any) => void;
  goNext: () => void;
  goBack: () => void;
  handleVisibleChange: (visible: any) => void;
  onSelect: (date: moment.Moment) => void;
}
export { SchedulerData, CellUnits, SummaryPos };
export {
  RowRenderData as SchedulerRenderData,
  Event as SchedulerEvent,
  EventGroup as SchedulerEventGroup,
  Header as SchedulerHeader,
  Resource as SchedulerResource,
  EventRecurring as SchedulerEventRecurring,
  ViewTypes as SchedulerViewTypes,
  DnDSource as SchedulerDnDSource,
};
export default Scheduler;
