import * as React from 'react';
import { Component } from 'react';
import Scheduler, { SchedulerData, SchedulerViewTypes } from '../src/Scheduler';
import * as ExampleFunction from './utils/ExampleFunctions';
import { DemoData } from './utils/DemoData';
import Nav from './utils/Nav';
import withDragDropContext from './utils/withDnDContext';

class Basic extends Component<{}, { viewModel: SchedulerData }> {
  constructor(props: Readonly<{}>) {
    super(props);

    const schedulerData = new SchedulerData(
      ExampleFunction.updateSchedulerDataState.bind(this),
      ExampleFunction.getNow(),
      SchedulerViewTypes.Week,
      false,
      false,
      {
        crossResourceMove: false,
      }
    );
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  public render() {
    const { viewModel } = this.state;
    return (
      <div>
        <Nav />
        <div>
          <h3 style={{ textAlign: 'center' }}>No cross-slot move</h3>
          <Scheduler
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
        </div>
      </div>
    );
  }
}

export default withDragDropContext(Basic);
