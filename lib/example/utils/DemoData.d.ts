import { Resource as SchedulerResource, Event } from '../../src/SchedulerData';
import { GQLStock } from '../../src/StockData';
export declare const DEMO_DATE_FORMAT = "DD.MM.YYYY";
export interface DemoData {
    resources: SchedulerResource[];
    events: Event[];
    eventsForTaskView: Event[];
    eventsForCustomEventStyle: Event[];
    stocks: GQLStock[];
}
export declare const DemoData: DemoData;
