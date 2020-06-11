import * as React from 'react';
import * as moment from 'moment';
import { CSSProperties } from 'react';
import { ColumnHeaderProps, CellUnits } from '../../src/';
import { ViewTypes } from '../../src/types/ViewTypes';

export const ColumnHeaderComponent: React.FC<ColumnHeaderProps> = (props) => {
  const { schedulerData, header, index, headersCount, width } = props;
  const { config, cellUnit } = schedulerData;
  const cellWidth = schedulerData.getContentCellWidth();

  let style: CSSProperties = {};
  const currentDateStyle: CSSProperties = {
    backgroundColor: '#118dea',
    color: 'white',
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    padding: '10px',
  };

  if (cellUnit === CellUnits.Hour) {
    const minuteStepsInHour = schedulerData.getMinuteStepsInHour();
    if (index % minuteStepsInHour === 0) {
      style = !!header.nonWorkingTime
        ? {
            // width: cellWidth * minuteStepsInHour,
            width: width ? width : cellWidth * minuteStepsInHour,
            color: config.nonWorkingTimeHeadColor,
            backgroundColor: config.nonWorkingTimeHeadBgColor,
            verticalAlign: 'middle',
          }
        : {
            width: width ? width : cellWidth * minuteStepsInHour,
            verticalAlign: 'middle',
          };

      if (index === headersCount - minuteStepsInHour) {
        style = !!header.nonWorkingTime
          ? {
              color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor,
              verticalAlign: 'middle',
            }
          : {};
      }

      const pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map((i) => moment(header.time).format(i));

      if (moment(header.time).isSame(new Date(), 'hour')) {
        style = currentDateStyle;
      }

      return (
        <th key={moment(header.time).format()} style={style} className='header3-text'>
          {pFormattedList.map((i, ind) => (
            <div key={ind}>{i}</div>
          ))}
        </th>
      );
    }
  } else {
    style = !!header.nonWorkingTime
      ? {
          width: width ? width : cellWidth,
          color: config.nonWorkingTimeHeadColor,
          backgroundColor: config.nonWorkingTimeHeadBgColor,
        }
      : { width: width ? width : cellWidth };
    if (index === headersCount - 1) {
      style = !!header.nonWorkingTime
        ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor }
        : {};
    }

    if (moment(header.time).isSame(new Date(), 'day')) {
      style = currentDateStyle;
    }
    if (ViewTypes.Year == schedulerData.viewType) {
      // Custom
      style.fontWeight = 'normal';
      style.color = 'black';

      const currentMonthStyle =
        moment(header.time).format('Y-M') === moment().format('Y-M')
          ? { backgroundColor: 'gray', borderRadius: 40, padding: '8px 0px', color: 'white' }
          : {};
      return (
        <th key={moment(header.time).format()} style={style} className='header3-text'>
          <div style={currentMonthStyle}>{`${moment(header.time).format('M')}月`}</div>
        </th>
      );
    } else {
      const pFormattedList = config.nonAgendaOtherCellHeaderFormat
        .split('|')
        .map((i) => moment(header.time).format('DD'));
      return (
        <th key={moment(header.time).format()} style={style} className='header3-text'>
          {pFormattedList.map((i, ind) => (
            <div key={ind}>{i}</div>
          ))}
        </th>
      );
    }
  }
};
