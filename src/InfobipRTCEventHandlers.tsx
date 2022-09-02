import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import React, { MutableRefObject } from "react";
import { ConnectionStatus } from "./help/ConnectionStatus";

 export interface InfobipRTCEventHandlersProps {
    connectionRef: MutableRefObject<InfobipRTC | null>;
    onConnectionStatusSet: (connectionStatus: ConnectionStatus) => void;
    onIdentitySet: (identity: string) => void;
    onIncomingCallEvent: (event: IncomingCallEvent) => void;
  }

function InfobipRTCEventHandlers(props: InfobipRTCEventHandlersProps) {
    if (props.connectionRef && props.connectionRef.current) {
        props.connectionRef.current.on("connected", function(event: {
          identity: string;
        }) {
          console.log("Connected with identity: " + event.identity);
          props.onIdentitySet(event.identity);
          props.onConnectionStatusSet(ConnectionStatus.connected);
        });
  
        props.connectionRef.current.on("disconnected", function(event: {
          reason: string;
        }) {
          console.log("Disconnected");
          props.onConnectionStatusSet(ConnectionStatus.disconnected);
        });
    
        props.connectionRef.current.on("reconnecting", function() {
          console.log("Reconnecting");
          props.onConnectionStatusSet(ConnectionStatus.reconnecting);
        });
    
        props.connectionRef.current.on("reconnected", function() {
          console.log("Reconnected");
          props.onConnectionStatusSet(ConnectionStatus.reconnected);
        });

        props.connectionRef.current.on("incoming-call", function(
            incomingCallEvent: IncomingCallEvent
          ) {
            props.onIncomingCallEvent(incomingCallEvent); 
          });
      }
}

export default InfobipRTCEventHandlers;