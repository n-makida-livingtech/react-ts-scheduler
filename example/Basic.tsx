import * as moment from 'moment';
import * as React from 'react';
import { Component } from 'react';
import Scheduler, { SchedulerData, SchedulerViewTypes } from '../src/Scheduler';
import { DemoData } from './utils/DemoData';
import * as ExampleFunction from './utils/ExampleFunctions';
import Nav from './utils/Nav';
import Tips from './utils/Tips';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'antd/lib/style/index.css';
import { PopoverComponent } from './plugins/PopoverPlugin';
import { RowHeaderComponent } from './plugins/RowHeader';
import { EventComponent, EventComponentRound } from './plugins/EventPlugin';
import { ColumnHeaderComponent } from './plugins/ColumnHeader';

interface IBasicState {
  viewModel: SchedulerData;
  update: moment.Moment;
}

class Basic extends Component<{}, IBasicState> {
  constructor(props: Readonly<{}>) {
    super(props);
    const schedulerData = new SchedulerData(
      ExampleFunction.updateSchedulerDataState.bind(this),
      ExampleFunction.getNow(),
      SchedulerViewTypes.Year
    );
    // To set locale
    moment.locale('ja-JP');
    const demoData = DemoData;
    schedulerData.setResources(demoData.resources);
    schedulerData.setEvents(DemoData.events);
    schedulerData.setStocks(DemoData.stocks);
    this.state = {
      viewModel: schedulerData,
      update: ExampleFunction.getNow(),
    };
  }

  public render() {
    const { viewModel } = this.state;
    return (
      <div>
        <Nav />
        <div>
          <h3 style={{ textAlign: 'center' }}>Basic example</h3>
          <DndProvider backend={HTML5Backend}>
            <Scheduler
              RowHeaderFC={RowHeaderComponent}
              PopoverFC={PopoverComponent}
              EventFC={EventComponentRound}
              ColumnHeaderFC={ColumnHeaderComponent}
              schedulerData={viewModel}
              prevClick={ExampleFunction.prevClick.bind(this)}
              nextClick={ExampleFunction.nextClick.bind(this)}
              onSelectDate={ExampleFunction.onSelectDate.bind(this)}
              onViewChange={ExampleFunction.onViewChange.bind(this)}
              updateEventStart={ExampleFunction.updateEventStart.bind(this)}
              updateEventEnd={ExampleFunction.updateEventEnd.bind(this)}
              moveEvent={ExampleFunction.moveEvent.bind(this)}
              newEvent={ExampleFunction.newEvent.bind(this)}
              newStock={ExampleFunction.newStock.bind(this)}
              onSetAddMoreState={ExampleFunction.onSetAddMoreState.bind(this)}
            />
          </DndProvider>
        </div>
        <Tips />
      </div>
    );
  }
}

export default Basic;
