import * as React from 'react';
import * as Moment from 'moment';
import { Component, CSSProperties } from 'react';
import { SchedulerData, ColumnHeaderProps } from '.';
import { ViewTypes } from './types/ViewTypes';

interface HeaderViewProps {
  schedulerData: SchedulerData;
  ColumnHeaderFC?: React.FC<ColumnHeaderProps>;
}

class HeaderView extends Component<HeaderViewProps> {
  constructor(props: Readonly<HeaderViewProps>) {
    super(props);
  }

  public render() {
    const { schedulerData, ColumnHeaderFC } = this.props;
    const { headers } = schedulerData;
    const headerHeight = schedulerData.getTableHeaderHeight();
    const css: CSSProperties = {
      height: headerHeight,
    };

    const startYear = schedulerData.startDate.format('Y');

    let headerList = [<div className='InternalError'>Missing ColumnHeaderFC</div>];
    if (schedulerData.viewType === ViewTypes.Year) {
      let dateList: Array<number> = [];
      let widthList: Array<number> = [];
      for (let index = 0; index < 12; index++) {
        let sumDay = 0;
        if (dateList[index - 1]) {
          sumDay = dateList[index - 1];
        }
        dateList.push(Moment(startYear + '-' + (1 + index) + '-1').daysInMonth() + sumDay);
        widthList.push(Moment(startYear + '-' + (1 + index) + '-1').daysInMonth() * 2);
      }

      console.log(dateList);
      if (ColumnHeaderFC) {
        const count = 12;
        headerList = headers.map((header, index) => {
          const date = new Date(header.time);
          const month = date.getMonth();

          if (dateList[month] === index + 1) {
            return (
              <ColumnHeaderFC
                key={index}
                schedulerData={schedulerData}
                header={header}
                headersCount={count}
                index={index}
                width={widthList[month]}
              />
            );
          }
          // console.log(dayCache);

          return;
        });
      }
    } else {
      if (ColumnHeaderFC) {
        const count = headers.length;
        headerList = headers.map((header, index) => {
          return (
            <ColumnHeaderFC
              key={index}
              schedulerData={schedulerData}
              header={header}
              headersCount={count}
              index={index}
            />
          );
        });
      }
    }

    console.log(schedulerData);

    return (
      <thead>
        <tr style={css}>{headerList}</tr>
      </thead>
    );
  }
}

export default HeaderView;
