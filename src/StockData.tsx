import moment from 'moment';

export interface StockResource {
  id: string;
  stocks: GQLStock;
}

export interface GQLStock {
  usesAt: string;
  id: string;
  basicQuantity: number;
  reservedQuantity: number;
  remainedQuantity: number;
  isOnSale: number;
  isClosed: number;
  roomTypeId: string;
}

export interface Stock {
  end: moment.Moment;
  start: moment.Moment;
  id: string;
  resourceId: string;
  bgColor?: string;
}

export interface DateStockResource {
  id: string;
  stocks: GQLStock;
}

export interface DateStock {
  [key: string]: GQLStock;
}

export default class StockData {
  constructor() {}
}
