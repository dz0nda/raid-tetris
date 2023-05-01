import { IEvent } from '@client/store/events/event.interface';

export const defaultSocketEvents: IEvent[] = [
  {
    action: 'NOOP',
    dispatch: (socket, store, action) => {
      console.debug('NOOP event called. Have you implemented your events?');
    },
  },
];

export default defaultSocketEvents;
