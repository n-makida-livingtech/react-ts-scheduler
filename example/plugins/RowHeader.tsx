import * as React from 'react';
import { CSSProperties } from 'react';
import Icon from 'antd/lib/icon';
import { RowHeaderProps } from '../../src/';

export const RowHeaderComponent: React.FC<RowHeaderProps> = (props) => {
  const { item, schedulerData } = props;
  const indents = [];
  for (let i = 0; i < item.indent; i++) {
    indents.push(<span key={`es${i}`} className='expander-space'></span>);
  }

  let indent = <span key={`es${item.indent}`} className='expander-space'></span>;
  if (item.hasChildren) {
    indent = item.expanded ? (
      <Icon
        type='minus-square'
        key={`es${item.indent}`}
        style={{}}
        className=''
        onClick={() => {
          schedulerData.toggleExpandStatus(item.slotId);
          schedulerData.stateUpdateHandler(schedulerData);
        }}
      />
    ) : (
      <Icon
        type='plus-square'
        key={`es${item.indent}`}
        style={{}}
        className=''
        onClick={() => {
          schedulerData.toggleExpandStatus(item.slotId);
          schedulerData.stateUpdateHandler(schedulerData);
        }}
      />
    );
  }
  indents.push(indent);

  const tdStyle: CSSProperties = { height: item.rowHeight };
  if (item.groupOnly) {
    tdStyle.backgroundColor = schedulerData.config.groupOnlySlotColor;
  }

  return (
    <tr key={item.slotId}>
      <td data-resource-id={item.slotId} style={tdStyle}>
        <div title={item.slotName} className='overflow-text header2-text' style={{ textAlign: 'left' }}>
          <span className='slot-cell'>
            {indents}
            <a className='slot-text' style={{ margin: '8px 8px 0px 8px', display: 'block' }}>
              <p>{item.slotName}</p>
              <p>{item.slotSubName}</p>
            </a>
          </span>
        </div>
      </td>
    </tr>
  );
};
