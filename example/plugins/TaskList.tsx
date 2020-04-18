import * as React from 'react';
import { Component } from 'react';
import { SchedulerData, SchedulerDnDSource } from '../../src/';

class TaskList extends Component<
  {
    schedulerData: SchedulerData;
    newEvent: Event;
    taskDndSource: SchedulerDnDSource;
  },
  {}
> {
  constructor(props: Readonly<{ schedulerData: SchedulerData; newEvent: Event; taskDndSource: SchedulerDnDSource }>) {
    super(props);
  }

  public render() {
    const { schedulerData, newEvent, taskDndSource } = this.props;
    const DnDTaskItem = taskDndSource.getDragSource();
    const tasks = schedulerData.eventGroups;
    const taskList = tasks.map((item) => {
      return <DnDTaskItem key={item.id} task={item} newEvent={newEvent} schedulerData={schedulerData} />;
    });

    return <ul>{taskList}</ul>;
  }
}

export default TaskList;
