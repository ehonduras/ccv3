import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import { MutableRefObject } from "react";
import { ConnectionEventData } from "../types/ConnectionEventData";
import { ConnectionStatus } from "../types/ConnectionStatus";

enum EVENT_NAME {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  RECONNECTING = "reconnecting",
  RECONNECTED = "reconnected",
  INCOMING_CALL = "incoming-call"
}

function ibRtcConnectionEventsHandler({
  connectionRef,
  onConnectionStatusSet,
  onIdentitySet,
  onIncomingCallEvent
}: ConnectionEventData) {
  if (connectionRef && connectionRef.current) {
    connectionRef.current.on(EVENT_NAME.CONNECTED, function(event: {
      identity: string;
    }) {
      console.log("Connected with identity: " + event.identity);
      onIdentitySet(event.identity);
      onConnectionStatusSet(ConnectionStatus.connected);
    });

    connectionRef.current.on(EVENT_NAME.DISCONNECTED, function(event: {
      reason: string;
    }) {
      console.log("Disconnected");
      onConnectionStatusSet(ConnectionStatus.disconnected);
    });

    connectionRef.current.on(EVENT_NAME.RECONNECTING, function() {
      console.log("Reconnecting");
      onConnectionStatusSet(ConnectionStatus.reconnecting);
    });

    connectionRef.current.on(EVENT_NAME.RECONNECTED, function() {
      console.log("Reconnected");
      onConnectionStatusSet(ConnectionStatus.reconnected);
    });

    connectionRef.current.on(EVENT_NAME.INCOMING_CALL, function(
      incomingCallEvent: IncomingCallEvent
    ) {
      onIncomingCallEvent(incomingCallEvent);
    });
  }
}

export default ibRtcConnectionEventsHandler;
