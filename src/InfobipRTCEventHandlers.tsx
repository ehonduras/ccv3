import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import React, { MutableRefObject } from "react";
import { ConnectionStatus } from "./help/ConnectionStatus";

enum EVENT_NAME {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    RECONNECTING = "reconnecting",
    RECONNECTED = "reconnected",
    INCOMING_CALL = "incoming-call"
}

 export interface InfobipRTCEventHandlersProps {
    connectionRef: MutableRefObject<InfobipRTC | null>;
    onConnectionStatusSet: (connectionStatus: ConnectionStatus) => void;
    onIdentitySet: (identity: string) => void;
    onIncomingCallEvent: (event: IncomingCallEvent) => void;
  }

function InfobipRTCEventHandlers(props: InfobipRTCEventHandlersProps) {
    if (props.connectionRef && props.connectionRef.current) {
        props.connectionRef.current.on(EVENT_NAME.CONNECTED, function(event: {
          identity: string;
        }) {
          console.log("Connected with identity: " + event.identity);
          props.onIdentitySet(event.identity);
          props.onConnectionStatusSet(ConnectionStatus.connected);
        });
  
        props.connectionRef.current.on(EVENT_NAME.DISCONNECTED, function(event: {
          reason: string;
        }) {
          console.log("Disconnected");
          props.onConnectionStatusSet(ConnectionStatus.disconnected);
        });
    
        props.connectionRef.current.on(EVENT_NAME.RECONNECTING, function() {
          console.log("Reconnecting");
          props.onConnectionStatusSet(ConnectionStatus.reconnecting);
        });
    
        props.connectionRef.current.on(EVENT_NAME.RECONNECTED, function() {
          console.log("Reconnected");
          props.onConnectionStatusSet(ConnectionStatus.reconnected);
        });

        props.connectionRef.current.on(EVENT_NAME.INCOMING_CALL, function(
            incomingCallEvent: IncomingCallEvent
          ) {
            props.onIncomingCallEvent(incomingCallEvent); 
          });
      }
}

export default InfobipRTCEventHandlers;