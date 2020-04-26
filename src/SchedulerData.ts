import * as moment from 'moment';
import { RRuleSet, rrulestr } from 'rrule';
import { Config as config } from './Config';
import behaviors from './Behaviors';
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
  time?: string; // TODO bug not wotking with moment.Moment
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
  data?: any;
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
  public stateUpdateHandler: (sd?: SchedulerData) => void;
  public resources: Resource[];
  public stocks: DateStock;
  public events: Event[];
  public eventGroups: EventGroup[];
  public eventGroupsAutoGenerated: boolean;
  public viewType: ViewTypes;
  public cellUnit: CellUnits;
  public showAgenda: boolean;
  public isEventPerspective: boolean;
  public resizing: boolean;
  public scrollToSpecialMoment: boolean;
  public documentWidth: number;
  public config: typeof Config;
  public behaviors: any;
  public startDate: moment.Moment;
  public endDate: moment.Moment;
  public selectDate: moment.Moment;
  public renderData: RowRenderData[];
  public headers: Header[];

  constructor(
    stateUpdateHandler: (sd: SchedulerData) => void,
    date: moment.Moment = moment(),
    viewType: ViewTypes = ViewTypes.Week,
    showAgenda = false,
    isEventPerspective = false,
    // tslint:disable-next-line: no-unnecessary-initializer
    newConfig?: any,
    // tslint:disable-next-line: no-unnecessary-initializer
    newBehaviors?: any
  ) {
    this.stateUpdateHandler = stateUpdateHandler;
    this.resources = [];
    this.stocks = {};
    this.events = [];
    this.eventGroups = [];
    this.eventGroupsAutoGenerated = true;
    this.viewType = viewType;
    this.cellUnit = viewType === ViewTypes.Day ? CellUnits.Hour : CellUnits.Day;
    this.showAgenda = showAgenda;
    this.isEventPerspective = isEventPerspective;
    this.resizing = false;
    this.scrollToSpecialMoment = false;
    this.documentWidth = 0;

    this.config = newConfig == undefined ? config : { ...config, ...newConfig };
    this._validateMinuteStep(this.config.minuteStep);
    this.behaviors = newBehaviors == undefined ? behaviors : { ...behaviors, ...newBehaviors };
    this._resolveDate(0, date);
    this._createHeaders();
    this._createRenderData();
  }

  public setResources(resources: Resource[]) {
    this._validateResource(resources);
    this.resources = Array.from(new Set(resources));
    this._createRenderData();
    this.setScrollToSpecialMoment(true);
  }

  public setEventGroupsAutoGenerated(autoGenerated: boolean) {
    this.eventGroupsAutoGenerated = autoGenerated;
  }

  // optional
  public setEventGroups(eventGroups: EventGroup[]) {
    this._validateEventGroups(eventGroups);
    this.eventGroups = Array.from(new Set(eventGroups));
    this.eventGroupsAutoGenerated = false;
    this._createRenderData();
    this.setScrollToSpecialMoment(true);
  }

  public setStocks(stocks: GQLStock[]) {
    // this._validateResource();
    // this.stocks = Array.from(new Set(stocks));
    this.stocks = this._createStockData(stocks);
    this._createRenderData();
    this.setScrollToSpecialMoment(true);
  }

  public setMinuteStep(minuteStep: number) {
    if (this.config.minuteStep !== minuteStep) {
      this._validateMinuteStep(minuteStep);
      this.config.minuteStep = minuteStep;
      this._createHeaders();
      this._createRenderData();
    }
  }

  public setBesidesWidth(besidesWidth: number) {
    if (besidesWidth >= 0) {
      this.config.besidesWidth = besidesWidth;
    }
  }

  public getMinuteStepsInHour() {
    return 60 / this.config.minuteStep;
  }

  public addResource(resource: Resource) {
    const existedResources = this.resources.filter((x) => x.id === resource.id);
    if (existedResources.length === 0) {
      this.resources.push(resource);
      this._createRenderData();
    }
  }

  public addEventGroup(eventGroup: EventGroup) {
    const existedEventGroups = this.eventGroups.filter((x) => x.id === eventGroup.id);
    if (existedEventGroups.length === 0) {
      this.eventGroups.push(eventGroup);
      this._createRenderData();
    }
  }

  public removeEventGroupById(eventGroupId: EventGroup['id']) {
    let index = -1;
    this.eventGroups.forEach((item, idx) => {
      if (item.id === eventGroupId) {
        index = idx;
      }
    });
    if (index !== -1) {
      this.eventGroups.splice(index, 1);
    }
  }

  public containsEventGroupId(eventGroupId: EventGroup['id']) {
    let index = -1;
    this.eventGroups.forEach((item, idx) => {
      if (item.id === eventGroupId) {
        index = idx;
      }
    });
    return index !== -1;
  }

  public setEvents(events: Event[]) {
    this._validateEvents(events);
    this.events = Array.from(events);
    if (this.eventGroupsAutoGenerated) {
      this._generateEventGroups();
    }
    if (this.config.recurringEventsEnabled) {
      this._handleRecurringEvents();
    }

    this._createRenderData();
  }

  public setScrollToSpecialMoment(scrollToSpecialMoment: boolean) {
    if (this.config.scrollToSpecialMomentEnabled) {
      this.scrollToSpecialMoment = scrollToSpecialMoment;
    }
  }

  public prev() {
    this._resolveDate(-1);
    this.events = [];
    this._createHeaders();
    this._createRenderData();
  }

  public next() {
    this._resolveDate(1);
    this.events = [];
    this._createHeaders();
    this._createRenderData();
  }

  public setDate(date = moment()) {
    this._resolveDate(0, date);
    this.events = [];
    this._createHeaders();
    this._createRenderData();
  }

  public setViewType(viewType = ViewTypes.Week, showAgenda: boolean = false, isEventPerspective: boolean = false) {
    this.showAgenda = showAgenda;
    this.isEventPerspective = isEventPerspective;
    this.cellUnit = CellUnits.Day;

    if (this.viewType !== viewType) {
      let date = this.startDate;

      if (viewType === ViewTypes.Custom || viewType === ViewTypes.Custom1 || viewType === ViewTypes.Custom2) {
        this.viewType = viewType;
        this._resolveDate(0, date);
      } else {
        if (this.viewType < viewType) {
          if (viewType === ViewTypes.Week) {
            this.startDate = moment(date).startOf('week');
            this.endDate = moment(this.startDate).endOf('week');
          } else if (viewType === ViewTypes.Month) {
            this.startDate = moment(date).startOf('month');
            this.endDate = moment(this.startDate).endOf('month');
          } else if (viewType === ViewTypes.Quarter) {
            this.startDate = moment(date).startOf('quarter');
            this.endDate = moment(this.startDate).endOf('quarter');
          } else if (viewType === ViewTypes.Year) {
            this.startDate = moment(date).startOf('year');
            this.endDate = moment(this.startDate).endOf('year');
          }
        } else {
          const start = moment(this.startDate);
          const end = moment(this.endDate).add(1, 'days');

          if (this.selectDate !== undefined) {
            const selectDate = moment(this.selectDate);
            if (selectDate >= start && selectDate < end) {
              date = this.selectDate;
            }
          }

          const now = moment();
          if (now >= start && now < end) {
            date = now;
          }

          if (viewType === ViewTypes.Day) {
            this.startDate = date;
            this.endDate = this.startDate;
            this.cellUnit = CellUnits.Hour;
          } else if (viewType === ViewTypes.Week) {
            this.startDate = moment(date).startOf('week');
            this.endDate = moment(this.startDate).endOf('week');
          } else if (viewType === ViewTypes.Month) {
            this.startDate = moment(date).startOf('month');
            this.endDate = moment(this.startDate).endOf('month');
          } else if (viewType === ViewTypes.Quarter) {
            this.startDate = moment(date).startOf('quarter');
            this.endDate = moment(this.startDate).endOf('quarter');
          }
        }

        this.viewType = viewType;
      }

      this.events = [];
      this._createHeaders();
      this._createRenderData();
      this.setScrollToSpecialMoment(true);
    }
  }

  public setSchedulerMaxHeight(newSchedulerMaxHeight: number) {
    this.config.schedulerMaxHeight = newSchedulerMaxHeight;
  }

  public isSchedulerResponsive() {
    return !!this.config.schedulerWidth.endsWith && this.config.schedulerWidth.endsWith('%');
  }

  public toggleExpandStatus(slotId: any) {
    let slotEntered = false;
    let slotIndent = -1;
    let isExpanded = false;
    const expandedMap = new Map();
    this.renderData.forEach((item) => {
      if (slotEntered === false) {
        if (item.slotId === slotId && item.hasChildren) {
          slotEntered = true;

          isExpanded = !item.expanded;
          item.expanded = isExpanded;
          slotIndent = item.indent;
          expandedMap.set(item.indent, {
            expanded: item.expanded,
            render: item.render,
          });
        }
      } else {
        if (item.indent > slotIndent) {
          const expandStatus = expandedMap.get(item.indent - 1);
          item.render = expandStatus.expanded && expandStatus.render;

          if (item.hasChildren) {
            expandedMap.set(item.indent, {
              expanded: item.expanded,
              render: item.render,
            });
          }
        } else {
          slotEntered = false;
        }
      }
    });
  }

  public isResourceViewResponsive() {
    const resourceTableWidth = this.getResourceTableConfigWidth();
    return !!resourceTableWidth.endsWith && resourceTableWidth.endsWith('%');
  }

  public isContentViewResponsive() {
    const contentCellWidth = this.getContentCellConfigWidth();
    return !!contentCellWidth.endsWith && contentCellWidth.endsWith('%');
  }

  public getSchedulerWidth(): string {
    const baseWidth =
      this.documentWidth - this.config.besidesWidth > 0 ? this.documentWidth - this.config.besidesWidth : 0;
    return (this.isSchedulerResponsive()
      ? (baseWidth * Number(this.config.schedulerWidth.slice(0, -1))) / 100
      : this.config.schedulerWidth
    ).toString();
  }

  public getResourceTableWidth(): number {
    const resourceTableConfigWidth = this.getResourceTableConfigWidth();
    const schedulerWidth = parseInt(this.getSchedulerWidth(), undefined);
    let resourceTableWidth = this.isResourceViewResponsive()
      ? (schedulerWidth * Number(resourceTableConfigWidth.slice(0, -1))) / 100
      : parseInt(resourceTableConfigWidth, undefined);
    if (this.isSchedulerResponsive() && this.getContentTableWidth() + resourceTableWidth < schedulerWidth) {
      resourceTableWidth = schedulerWidth - this.getContentTableWidth();
    }
    return resourceTableWidth;
  }

  public getContentCellWidth(): number {
    const contentCellConfigWidth = this.getContentCellConfigWidth();
    const schedulerWidth = parseInt(this.getSchedulerWidth(), undefined);
    return this.isContentViewResponsive()
      ? (schedulerWidth * Number(contentCellConfigWidth.slice(0, -1))) / 100
      : parseInt(contentCellConfigWidth, undefined);
  }

  public getContentTableWidth(): number {
    return this.headers.length * this.getContentCellWidth();
  }

  public getScrollToSpecialMoment(): boolean {
    if (this.config.scrollToSpecialMomentEnabled) {
      return this.scrollToSpecialMoment;
    }
    return false;
  }

  public getSlots(): EventGroup[] | Resource[] {
    return this.isEventPerspective ? this.eventGroups : this.resources;
  }

  public getSlotById(slotId: any): EventGroup | Resource {
    const slots = this.getSlots();
    let slot;
    slots.forEach((item) => {
      if (item.id === slotId) {
        slot = item;
      }
    });
    return slot;
  }

  public getResourceById(resourceId: string): Resource {
    let resource;
    this.resources.forEach((item) => {
      if (item.id === resourceId) {
        resource = item;
      }
    });
    return resource;
  }

  public getTableHeaderHeight(): number {
    return this.config.tableHeaderHeight;
  }

  public getSchedulerContentDesiredHeight(): number {
    let height = 0;
    this.renderData.forEach((item) => {
      if (item.render) {
        height += item.rowHeight;
      }
    });
    return height;
  }

  public getCellMaxEvents(): number {
    return this.viewType === ViewTypes.Week
      ? this.config.weekMaxEvents
      : this.viewType === ViewTypes.Day
      ? this.config.dayMaxEvents
      : this.viewType === ViewTypes.Month
      ? this.config.monthMaxEvents
      : this.viewType === ViewTypes.Year
      ? this.config.yearMaxEvents
      : this.viewType === ViewTypes.Quarter
      ? this.config.quarterMaxEvents
      : this.config.customMaxEvents;
  }

  public getDateLabel(): string {
    const start = moment(this.startDate);
    const end = moment(this.endDate);
    let dateLabel = start.format('LL');

    if (start != end) {
      dateLabel = `${start.format('LL')}-${end.format('LL')}`;
    }

    if (!!this.behaviors.getDateLabelFunc) {
      dateLabel = this.behaviors.getDateLabelFunc(this, this.viewType, this.startDate, this.endDate);
    }

    console.log('dateLabel' + dateLabel);
    return dateLabel;
  }

  public addEvent(newEvent: Event) {
    this._attachEvent(newEvent);
    if (this.eventGroupsAutoGenerated) {
      this._generateEventGroups();
    }
    this._createRenderData();
  }

  public updateEventStart(event: Event, newStart: moment.Moment) {
    this._detachEvent(event);
    event.start = newStart;
    this._attachEvent(event);
    this._createRenderData();
  }

  public updateEventEnd(event: Event, newEnd: moment.Moment) {
    event.end = newEnd;
    this._createRenderData();
  }

  public moveEvent(event: Event, newSlotId: any, newSlotName: string, newStart: moment.Moment, newEnd: moment.Moment) {
    this._detachEvent(event);
    if (this.isEventPerspective) {
      event.groupId = newSlotId;
      event.groupName = newSlotName;
    } else {
      event.resourceId = newSlotId;
    }
    event.end = newEnd;
    event.start = newStart;
    this._attachEvent(event);
    this._createRenderData();
  }

  public isEventInTimeWindow(
    eventStart: moment.Moment,
    eventEnd: moment.Moment,
    windowStart: moment.Moment,
    windowEnd: moment.Moment
  ): boolean {
    return eventStart < windowEnd && eventEnd > windowStart;
  }

  public removeEvent(event: Event) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
      this._createRenderData();
    }
  }

  public removeEventById(eventId: string) {
    let index = -1;
    this.events.forEach((item, idx) => {
      if (item.id === eventId) {
        index = idx;
      }
    });
    if (index !== -1) {
      this.events.splice(index, 1);
      this._createRenderData();
    }
  }

  // Stock
  public addStock(newStock: Stock) {
    // this._attachStock(newStock);
    this._createRenderData();
  }

  public getResourceTableConfigWidth(): string {
    if (this.showAgenda) {
      return this.config.agendaResourceTableWidth.toString();
    }

    return this.viewType === ViewTypes.Week
      ? this.config.weekResourceTableWidth
      : this.viewType === ViewTypes.Day
      ? this.config.dayResourceTableWidth.toString()
      : this.viewType === ViewTypes.Month
      ? this.config.monthResourceTableWidth.toString()
      : this.viewType === ViewTypes.Year
      ? this.config.yearResourceTableWidth.toString()
      : this.viewType === ViewTypes.Quarter
      ? this.config.quarterResourceTableWidth.toString()
      : this.config.customResourceTableWidth.toString();
  }

  public getContentCellConfigWidth(): string {
    return this.viewType === ViewTypes.Week
      ? this.config.weekCellWidth.toString()
      : this.viewType === ViewTypes.Day
      ? this.config.dayCellWidth.toString()
      : this.viewType === ViewTypes.Month
      ? this.config.monthCellWidth.toString()
      : this.viewType === ViewTypes.Year
      ? this.config.yearCellWidth.toString()
      : this.viewType === ViewTypes.Quarter
      ? this.config.quarterCellWidth.toString()
      : this.config.customCellWidth.toString();
  }

  public setDocumentWidth(documentWidth: number) {
    if (documentWidth >= 0) {
      this.documentWidth = documentWidth;
    }
  }

  public startResizing() {
    this.resizing = true;
  }

  public stopResizing() {
    this.resizing = false;
  }

  public isResizing(): boolean {
    return this.resizing;
  }

  public getEventSlotId(event: Event) {
    return this.isEventPerspective ? this._getEventGroupId(event) : event.resourceId;
  }

  private _detachEvent(event: Event) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }

  private _attachEvent(event: Event) {
    let pos = 0;
    const eventStart = moment(event.start);
    this.events.forEach((item, index) => {
      const start = moment(item.start);
      if (eventStart >= start) {
        pos = index + 1;
      }
    });
    this.events.splice(pos, 0, event);
  }

  //   private _attachStock(stock: Stock) {
  //     let pos = 0;
  //     const stockRegisterStart = moment(stock.start);
  //     this.stocks.forEach((item, index) => {
  //       const start = moment(item.start);
  //       if (stockRegisterStart >= start) {
  //         pos = index + 1;
  //       }
  //     });
  //     this.stocks.splice(pos, 0, stock);
  //   }

  private _handleRecurringEvents() {
    const recurringEvents = this.events.filter((x) => !!x.rrule);
    recurringEvents.forEach((item) => {
      this._detachEvent(item);
    });

    recurringEvents.forEach((item) => {
      const windowStart = moment(this.startDate);
      const windowEnd = moment(this.endDate).add(1, 'days');
      const oldStart = moment(item.start);
      const oldEnd = moment(item.end);
      let rule = rrulestr(item.rrule);
      let oldDtstart: moment.Moment;
      if (!!rule.origOptions.dtstart) {
        oldDtstart = moment(rule.origOptions.dtstart);
      }
      rule.origOptions.dtstart = oldStart.toDate();
      if (!rule.origOptions.until || windowEnd < moment(rule.origOptions.until)) {
        rule.origOptions.until = windowEnd.toDate();
      }

      // reload
      rule = rrulestr(rule.toString());
      if (item.exdates || item.exrule) {
        const rruleSet = new RRuleSet();
        rruleSet.rrule(rule);
        if (item.exrule) {
          rruleSet.exrule(rrulestr(item.exrule));
        }
        if (item.exdates) {
          item.exdates.forEach((exdate) => {
            rruleSet.exdate(moment(exdate).toDate());
          });
        }
        rule = rruleSet;
      }

      const all = rule.all();
      const newEvents = all.map((time, index) => {
        return {
          ...item,
          recurringEventId: item.id,
          recurringEventStart: item.start,
          recurringEventEnd: item.end,
          id: `${item.id}-${index}`,
          start: moment(time),
          end: moment(time).add(oldEnd.diff(oldStart), 'ms'),
        };
      });
      newEvents.forEach((newEvent) => {
        const eventStart = moment(newEvent.start);
        const eventEnd = moment(newEvent.end);
        if (
          this.isEventInTimeWindow(eventStart, eventEnd, windowStart, windowEnd) &&
          (!oldDtstart || eventStart >= oldDtstart)
        ) {
          this._attachEvent(newEvent);
        }
      });
    });
  }

  private _resolveDate(num: number, date?: moment.Moment) {
    if (date != undefined) {
      this.selectDate = moment(date);
    }
    this.selectDate = moment();

    if (this.viewType === ViewTypes.Week) {
      this.startDate = date != undefined ? moment(date).startOf('week') : moment(this.startDate).add(num, 'weeks');
      this.endDate = moment(this.startDate).endOf('week');
    } else if (this.viewType === ViewTypes.Day) {
      this.startDate = date != undefined ? this.selectDate : moment(this.startDate).add(num, 'days');
      this.endDate = this.startDate;
    } else if (this.viewType === ViewTypes.Month) {
      this.startDate = date != undefined ? moment(date).startOf('month') : moment(this.startDate).add(num, 'months');
      this.endDate = moment(this.startDate).endOf('month');
    } else if (this.viewType === ViewTypes.Quarter) {
      this.startDate =
        date != undefined ? moment(date).startOf('quarter') : moment(this.startDate).add(num, 'quarters');
      this.endDate = moment(this.startDate).endOf('quarter');
    } else if (this.viewType === ViewTypes.Year) {
      this.startDate = date != undefined ? moment(date).startOf('year') : moment(this.startDate).add(num, 'year');
      this.endDate = moment(this.startDate).endOf('year');

      console.log(num);
      console.log(this.startDate.format('Y'));
      console.log(this.endDate.format('Y'));
    } else if (
      this.viewType === ViewTypes.Custom ||
      this.viewType === ViewTypes.Custom1 ||
      this.viewType === ViewTypes.Custom2
    ) {
      if (this.behaviors.getCustomDateFunc != undefined) {
        const customDate = this.behaviors.getCustomDateFunc(this, num, date);
        this.startDate = customDate.startDate;
        this.endDate = customDate.endDate;
        if (!!customDate.cellUnit) {
          this.cellUnit = customDate.cellUnit;
        }
      } else {
        throw new Error(
          'This is custom view type, set behaviors.getCustomDateFunc func to resolve the time window(startDate and endDate) yourself'
        );
      }
    }
  }

  private _createHeaders() {
    const headers: Header[] = [];
    let start = moment(this.startDate);
    let end = moment(this.endDate);
    let header = start;

    if (this.showAgenda) {
      headers.push({ time: header.format(), nonWorkingTime: false });
    } else {
      if (this.cellUnit === CellUnits.Hour) {
        start = start.add(this.config.dayStartFrom, 'hours');
        end = end.add(this.config.dayStopTo, 'hours');
        header = start;

        while (header >= start && header <= end) {
          const minuteSteps = this.getMinuteStepsInHour();
          for (let i = 0; i < minuteSteps; i++) {
            const hour = header.hour();
            if (hour >= this.config.dayStartFrom && hour <= this.config.dayStopTo) {
              const time = header.format();
              const nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
              headers.push({ time, nonWorkingTime });
            }

            header = header.add(this.config.minuteStep, 'minutes');
          }
        }
      } else {
        while (header >= start && header <= end) {
          const time = header.format();
          const dayOfWeek = header.weekday();
          if (this.config.displayWeekend || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
            const nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
            headers.push({ time, nonWorkingTime });
          }

          header = header.add(1, 'days');
        }
      }
    }

    this.headers = headers;
  }

  private _createInitHeaderEvents(header: Header) {
    const start = moment(header.time);
    const startValue = start.format();
    const endValue = this.showAgenda
      ? this.viewType === ViewTypes.Week
        ? start.add(1, 'weeks').format()
        : this.viewType === ViewTypes.Day
        ? start.add(1, 'days').format()
        : this.viewType === ViewTypes.Month
        ? start.add(1, 'months').format()
        : this.viewType === ViewTypes.Year
        ? start.add(1, 'years').format()
        : this.viewType === ViewTypes.Quarter
        ? start.add(1, 'quarters').format()
        : moment(this.endDate).add(1, 'days').format()
      : this.cellUnit === CellUnits.Hour
      ? start.add(this.config.minuteStep, 'minutes').format()
      : start.add(1, 'days').format();
    return {
      time: header.time,
      nonWorkingTime: header.nonWorkingTime,
      start: startValue,
      end: endValue,
      count: 0,
      addMore: 0,
      addMoreIndex: 0,
      events: [],
    };
  }

  private _createHeaderEvent(render: any, span: any, eventItem: Event) {
    return {
      render,
      span,
      eventItem,
    };
  }

  private _createStockData(stocks: GQLStock[]) {
    const stockData = {};
    stocks.forEach((value) => {
      stockData[value.roomTypeId] = {};
    });
    stocks.forEach((value) => {
      stockData[value.roomTypeId][value.usesAt] = value;
    });
    return stockData;
  }

  private _getEventGroupId(event: Event): string {
    return !!event.groupId ? event.groupId.toString() : event.id.toString();
  }

  private _getEventGroupName(event: Event): string {
    return !!event.groupName ? event.groupName : event.title;
  }

  private _generateEventGroups() {
    const eventGroups: EventGroup[] = [];
    const set = new Set();
    this.events.forEach((item) => {
      const groupId = this._getEventGroupId(item);
      const groupName = this._getEventGroupName(item);

      if (!set.has(groupId)) {
        const a: EventGroup = {
          id: groupId,
          name: groupName,
          state: item,
        };
        eventGroups.push(a);
        set.add(groupId);
      }
    });
    this.eventGroups = eventGroups;
  }

  private _createInitRenderData(
    isEventPerspective: boolean,
    eventGroups: EventGroup[],
    resources: Resource[],
    headers: Header[]
  ): RowRenderData[] {
    const slots = isEventPerspective ? eventGroups : resources;
    const slotTree = [];
    const slotMap = new Map();
    slots.forEach((slot) => {
      const headerEvents = headers.map((header) => {
        return this._createInitHeaderEvents(header);
      });

      const slotRenderData = {
        slotId: slot.id,
        thumbnailImagePath: slot.thumbnailImagePath,
        slotName: slot.name,
        parentId: slot.parentId,
        groupOnly: slot.groupOnly,
        hasSummary: false,
        rowMaxCount: 0,
        rowHeight:
          this.config.nonAgendaSlotMinHeight !== 0
            ? this.config.nonAgendaSlotMinHeight
            : this.config.eventItemLineHeight + 2,
        headerItems: headerEvents,
        indent: 0,
        hasChildren: false,
        expanded: true,
        render: true,
      };
      const id = slot.id;
      let value;
      if (slotMap.has(id)) {
        value = slotMap.get(id);
        value.data = slotRenderData;
      } else {
        value = {
          data: slotRenderData,
          children: [],
        };
        slotMap.set(id, value);
      }

      const parentId = slot.parentId;
      if (!parentId || parentId === id) {
        slotTree.push(value);
      } else {
        let parentValue;
        if (slotMap.has(parentId)) {
          parentValue = slotMap.get(parentId);
        } else {
          parentValue = {
            data: undefined,
            children: [],
          };
          slotMap.set(parentId, parentValue);
        }

        parentValue.children.push(value);
      }
    });

    const slotStack: any[] = [];
    let i;
    for (i = slotTree.length - 1; i >= 0; i--) {
      slotStack.push(slotTree[i]);
    }
    const initRenderData = [];
    let currentNode;
    while (slotStack.length > 0) {
      currentNode = slotStack.pop();
      if (currentNode.data.indent > 0) {
        currentNode.data.render = this.config.defaultExpanded;
      }
      if (currentNode.children.length > 0) {
        currentNode.data.hasChildren = true;
        currentNode.data.expanded = this.config.defaultExpanded;
      }
      initRenderData.push(currentNode.data);

      for (i = currentNode.children.length - 1; i >= 0; i--) {
        currentNode.children[i].data.indent = currentNode.data.indent + 1;
        slotStack.push(currentNode.children[i]);
      }
    }

    return initRenderData;
  }

  private _getSpan(startTime: moment.MomentInput, endTime: moment.Moment, headers: Header[]): number {
    if (this.showAgenda) {
      return 1;
    }

    const start = moment(startTime);
    const end = moment(endTime);
    let span = 0;

    for (const header of headers) {
      const spanStart = moment(header.time);
      const spanEnd =
        this.cellUnit === CellUnits.Hour
          ? moment(header.time).add(this.config.minuteStep, 'minutes')
          : moment(header.time).add(1, 'days');

      if (spanStart < end && spanEnd > start) {
        span++;
      }
    }

    return span;
  }

  private _validateResource(resources: Resource[]) {
    if (Object.prototype.toString.call(resources) !== '[object Array]') {
      throw new Error('Resources should be Array object');
    }

    resources.forEach((item: any, index: any) => {
      if (item == undefined) {
        console.error(`Resource undefined: ${index}`);
        throw new Error(`Resource undefined: ${index}`);
      }
      if (item.id == undefined || item.name == undefined) {
        console.error('Resource property missed', index, item);
        throw new Error(`Resource property undefined: ${index}`);
      }
    });
  }

  private _validateEventGroups(eventGroups: EventGroup[]) {
    if (Object.prototype.toString.call(eventGroups) !== '[object Array]') {
      throw new Error('Event groups should be Array object');
    }

    eventGroups.forEach((item, index) => {
      if (item == undefined) {
        console.error(`Event group undefined: ${index}`);
        throw new Error(`Event group undefined: ${index}`);
      }
      if (item.id == undefined || item.name == undefined) {
        console.error('Event group property missed', index, item);
        throw new Error(`Event group property undefined: ${index}`);
      }
    });
  }

  private _validateEvents(events: Event[]) {
    if (Object.prototype.toString.call(events) !== '[object Array]') {
      throw new Error('Events should be Array object');
    }

    events.forEach((e, index) => {
      if (e == undefined) {
        console.error(`Event undefined: ${index}`);
        throw new Error(`Event undefined: ${index}`);
      }
      if (
        e.id == undefined ||
        e.resourceId == undefined ||
        e.title == undefined ||
        e.start == undefined ||
        e.end == undefined
      ) {
        console.error('Event property missed', index, e);
        throw new Error(`Event property undefined: ${index}`);
      }
    });
  }

  private _validateMinuteStep(minuteStep: number) {
    if (60 % minuteStep !== 0) {
      console.error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
      throw new Error(
        'Minute step is not set properly - 60 minutes must be divisible without remainder by this number'
      );
    }
  }

  private _compare(event1: Event, event2: Event): number {
    const start1 = moment(event1.start);
    const start2 = moment(event2.start);
    const end1 = moment(event1.end);
    const end2 = moment(event2.end);

    if (start1 !== start2) {
      return start1 < start2 ? -1 : 1;
    }
    if (end1 !== end2) {
      return end1 < end2 ? -1 : 1;
    }
    return event1.id < event2.id ? -1 : 1;
  }

  private _createRenderData() {
    const initRenderData = this._createInitRenderData(
      this.isEventPerspective,
      this.eventGroups,
      this.resources,
      this.headers
    );
    // this.events.sort(this._compare);
    const cellMaxEventsCount = this.getCellMaxEvents();
    const cellMaxEventsCountValue = 30;

    this.events.forEach((item) => {
      const resourceEventsList = initRenderData.filter((x) => x.slotId === this.getEventSlotId(item));
      if (resourceEventsList.length > 0) {
        const resourceEvents = resourceEventsList[0];
        const span = this._getSpan(item.start, item.end, this.headers);
        const eventStart = moment(item.start);
        const eventEnd = moment(item.end);
        let pos = -1;

        resourceEvents.headerItems.forEach((header, index) => {
          const headerStart = moment(header.start);
          const headerEnd = moment(header.end);
          if (headerEnd > eventStart && headerStart < eventEnd) {
            header.count = header.count + 1;
            if (header.count > resourceEvents.rowMaxCount) {
              resourceEvents.rowMaxCount = header.count;
              const rowsCount =
                cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount
                  ? cellMaxEventsCount
                  : resourceEvents.rowMaxCount;
              const newRowHeight =
                rowsCount * this.config.eventItemLineHeight +
                (this.config.creatable && this.config.checkConflict === false ? config.defaultResourceHeight : 2);
              if (newRowHeight > resourceEvents.rowHeight) {
                resourceEvents.rowHeight = newRowHeight;
              }
            }

            if (pos === -1) {
              let tmp = 0;
              while (header.events[tmp] !== undefined) {
                tmp++;
              }

              pos = tmp;
            }
            let render = headerStart <= eventStart || index === 0;
            if (render === false) {
              const previousHeader = resourceEvents.headerItems[index - 1];
              const previousHeaderStart = moment(previousHeader.start);
              const previousHeaderEnd = moment(previousHeader.end);
              if (previousHeaderEnd <= eventStart || previousHeaderStart >= eventEnd) {
                render = true;
              }
            }
            header.events[pos] = this._createHeaderEvent(render, span, item);
          }
        });
      }
    });

    if (cellMaxEventsCount <= cellMaxEventsCountValue || this.behaviors.getSummaryFunc !== undefined) {
      initRenderData.forEach((resourceEvents) => {
        let hasSummary = false;

        resourceEvents.headerItems.forEach((headerItem) => {
          if (cellMaxEventsCount <= cellMaxEventsCountValue) {
            let renderItemsCount = 0;
            let addMoreIndex = 0;
            let index = 0;
            while (index < cellMaxEventsCount - 1) {
              if (headerItem.events[index] !== undefined) {
                renderItemsCount++;
                addMoreIndex = index + 1;
              }

              index++;
            }

            if (headerItem.events[index] !== undefined) {
              if (renderItemsCount + 1 < headerItem.count) {
                headerItem.addMore = headerItem.count - renderItemsCount;
                headerItem.addMoreIndex = addMoreIndex;
              }
            } else {
              if (renderItemsCount < headerItem.count) {
                headerItem.addMore = headerItem.count - renderItemsCount;
                headerItem.addMoreIndex = addMoreIndex;
              }
            }
          }

          if (this.behaviors.getSummaryFunc !== undefined) {
            const events: any = [];
            headerItem.events.forEach((e) => {
              if (!!e && !!e.eventItem) {
                events.push(e.eventItem);
              }
            });

            headerItem.summary = this.behaviors.getSummaryFunc(
              this,
              events,
              resourceEvents.slotId,
              resourceEvents.slotName,
              headerItem.start,
              headerItem.end
            );
            if (!!headerItem.summary && headerItem.summary.text != undefined) {
              hasSummary = true;
            }
          }
        });

        resourceEvents.hasSummary = hasSummary;
        if (hasSummary) {
          const rowsCount =
            cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount
              ? cellMaxEventsCount
              : resourceEvents.rowMaxCount;
          const newRowHeight =
            (rowsCount + 1) * this.config.eventItemLineHeight +
            (this.config.creatable && this.config.checkConflict === false ? config.defaultResourceHeight : 2);
          if (newRowHeight > resourceEvents.rowHeight) {
            resourceEvents.rowHeight = newRowHeight;
          }
        }
      });
    }

    this.renderData = initRenderData;
  }
}
