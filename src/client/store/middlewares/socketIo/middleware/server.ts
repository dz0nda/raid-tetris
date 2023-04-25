/**
 * Socketio Redux Middleware Server Event Handler.
 * @module socketio-middleware/middleware/server
 */

import { IServerEvent } from '@client/store/events/event.interface';

/**
 * Event handler for server events
 * @param {array} serverEvents - the user server events list
 * @param {Function} dispatch - the redux dispatch function
 * @since v0.0.1
 */
export default function serverEventHandler(serverEvents: IServerEvent[], dispatch: any) {
  return (event: any, data: any) => {
    serverEvents.some((e) => {
      if (e.action === event) {
        e.dispatch(event, data, dispatch);
        return true;
      }
      return false;
    });
  };
}
