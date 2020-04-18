import * as React from 'react';
import { Component } from 'react';
import { EventItemPopoverProps } from '.';
declare class EventItemPopover extends Component<EventItemPopoverProps & {
    PopoverFC?: React.FC<EventItemPopoverProps>;
}> {
    constructor(props: Readonly<EventItemPopoverProps & {
        PopoverFC?: React.FunctionComponent<EventItemPopoverProps>;
    }>);
    render(): JSX.Element;
}
export default EventItemPopover;
