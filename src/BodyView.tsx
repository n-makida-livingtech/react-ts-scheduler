import * as React from 'react';
import * as moment from 'moment';
import { Component, CSSProperties } from 'react';
import { SchedulerData } from '.';

interface BodyViewProps {
  schedulerData: SchedulerData;
}

class BodyView extends Component<BodyViewProps> {
  constructor(props: Readonly<BodyViewProps>) {
    super(props);
  }

  public render() {
    const { schedulerData } = this.props;
    const { renderData, headers, config, behaviors, stocks } = schedulerData;

    const cellWidth = schedulerData.getContentCellWidth();
    const displayRenderData = renderData.filter((o) => o.render);
    const tableRows = displayRenderData.map((item) => {
      const rowCells = headers.map((header, index) => {
        const key = item.slotId + '_' + header.time;
        const bodyCss: CSSProperties = {
          width: index === headers.length - 1 ? undefined : cellWidth,
          backgroundColor: undefined,
        };

        const stockCss: CSSProperties = {
          height:
            item.rowHeight > config.defaultResourceHeight - 20
              ? item.rowHeight - 20
              : config.defaultResourceHeight - 20,
        };

        if (!!header.nonWorkingTime) {
          bodyCss.backgroundColor = config.nonWorkingTimeBodyBgColor;
        }
        if (item.groupOnly) {
          bodyCss.backgroundColor = config.groupOnlySlotColor;
        }

        if (stocks[item.slotId] && stocks[item.slotId][moment(header.time).format('Y-MM-DD')]) {
          stockCss.backgroundColor = config.stockBodyBgColor;
        }

        return (
          <td key={key} style={bodyCss}>
            <div style={stockCss}></div>
          </td>
        );
      });
      const cssParent: CSSProperties = {
        height: item.rowHeight > config.defaultResourceHeight ? item.rowHeight : config.defaultResourceHeight,
      };
      return (
        <tr key={item.slotId} style={cssParent}>
          {rowCells}
        </tr>
      );
    });

    const cssToParent: CSSProperties = {};

    return <tbody style={cssToParent}>{tableRows}</tbody>;
  }
}

export default BodyView;
