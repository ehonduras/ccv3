import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import { ConnectionEventData } from "../types/ConnectionEventData";
import { EVENT_CONNECTION_STATUS_NAME } from "../types/ConnectionStatus";

function ibRtcConnectionEventsHandler({
  connectionRef,
  onConnectionStatusSet,
  onIdentitySet,
  onIncomingCallEvent
}: ConnectionEventData) {
  if (connectionRef && connectionRef.current) {
    connectionRef.current.on(
      EVENT_CONNECTION_STATUS_NAME.CONNECTED,
      function(event: { identity: string }) {
        console.log("Connected with identity: " + event.identity);
        onIdentitySet(event.identity);
        onConnectionStatusSet(EVENT_CONNECTION_STATUS_NAME.CONNECTED);
      }
    );

    connectionRef.current.on(
      EVENT_CONNECTION_STATUS_NAME.DISCONNECTED,
      function(event: { reason: string }) {
        onConnectionStatusSet(EVENT_CONNECTION_STATUS_NAME.DISCONNECTED);
      }
    );

    connectionRef.current.on(
      EVENT_CONNECTION_STATUS_NAME.RECONNECTING,
      function() {
        onConnectionStatusSet(EVENT_CONNECTION_STATUS_NAME.RECONNECTING);
      }
    );

    connectionRef.current.on(
      EVENT_CONNECTION_STATUS_NAME.RECONNECTED,
      function() {
        onConnectionStatusSet(EVENT_CONNECTION_STATUS_NAME.RECONNECTED);
      }
    );

    connectionRef.current.on(
      EVENT_CONNECTION_STATUS_NAME.INCOMING_CALL,
      function(incomingCallEvent: IncomingCallEvent) {
        onIncomingCallEvent(incomingCallEvent);
      }
    );
  }
}

export default ibRtcConnectionEventsHandler;
