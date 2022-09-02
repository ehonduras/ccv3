import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import "./styles/styles.scss";
import ConnectionState from "./components/connection/ConnectionState";
import { ConnectionStatus } from "./help/ConnectionStatus";
import OutgoingCallComponent from "./components/call/OutgoingCallComponent";
import IncomingCallComponent from "./components/call/IncomingCallComponent";
import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import InfobipRTCEventHandlers, { InfobipRTCEventHandlersProps } from "./InfobipRTCEventHandlers";

const TOKEN = "";

function App() {
  const [connectionStatus, connectionStatusSet] = useState(
    ConnectionStatus.disconnected
  );
  const [isCallRinging, isCallRingingSet] = useState(false);
  const [identity, identitySet] = useState("");
  const [incomingCallEvent, setIncomingCallEvent] = useState<IncomingCallEvent | null>(null);

  const connectionRef: MutableRefObject<InfobipRTC | null> = useRef(null);

  const connect = () => {
    let infobipRTC = new InfobipRTC(
      TOKEN,
      { debug: true }
    );

    connectToInfobipRTC(infobipRTC);
    checkConnectionStatus();
  };

  const connectToInfobipRTC = (infobipRTC: InfobipRTC) => {
    infobipRTC && (connectionRef.current = infobipRTC);
    connectionRef.current && connectionRef.current.connect();
  };

  const disconnect = () => {
    console.log("disconnecting");

    connectionRef.current && connectionRef.current.disconnect();
  };

  const onConnectionStatusSet = (connectionStatus: ConnectionStatus) => {
    connectionStatusSet(connectionStatus);
  }

  const onIdentitySet = (identity: string) => {
    identitySet(identity);
  }

  const onIncomingCallEvent = (event: IncomingCallEvent) => {
    setIncomingCallEvent(event);
  }

  const getInfobipRTCEventHandlersProps = (): InfobipRTCEventHandlersProps => {
    return {connectionRef, onConnectionStatusSet, onIdentitySet, onIncomingCallEvent} as InfobipRTCEventHandlersProps;
  };

  const checkConnectionStatus = () => {
    InfobipRTCEventHandlers(getInfobipRTCEventHandlersProps());
  };

  return (
    <div className="App">
      <ConnectionState
        connectionStatus={connectionStatus}
        connect={connect}
        disconnect={disconnect}
      />

      {!incomingCallEvent && <OutgoingCallComponent
        connectionRef={connectionRef}
      ></OutgoingCallComponent>}

      <IncomingCallComponent
        identity={identity}
        isCallRinging={isCallRinging}
        connectionRef={connectionRef}
        isCallRingingSet={isCallRingingSet}
        incomingCallEvent={incomingCallEvent}
      ></IncomingCallComponent>
    </div>
  );
}

export default App;
