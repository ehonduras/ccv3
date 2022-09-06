import { useState, useRef, MutableRefObject } from "react";
import "./styles/styles.scss";
import ConnectionState from "./components/connection/ConnectionState";
import { ConnectionStatus } from "./types/ConnectionStatus";
import OutgoingCallComponent from "./components/call/OutgoingCallComponent";
import IncomingCallComponent from "./components/call/IncomingCallComponent";
import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import ibRtcConnectionEventsHandler from "./functions/ibRtcConnectionEventsHandler";
import { ConnectionEventData } from "./types/ConnectionEventData";

const TOKEN = "";

function App() {
  const [connectionStatus, connectionStatusSet] = useState(
    ConnectionStatus.disconnected
  );
  const [isCallRinging, isCallRingingSet] = useState(false);
  const [identity, identitySet] = useState("");
  const [
    incomingCallEvent,
    setIncomingCallEvent
  ] = useState<IncomingCallEvent | null>(null);

  const connectionRef: MutableRefObject<InfobipRTC | null> = useRef(null);

  const instantiateIbClient = () => {
    let infobipRTC = new InfobipRTC(TOKEN, { debug: true });

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
  };

  const onIdentitySet = (identity: string) => {
    identitySet(identity);
  };

  const onIncomingCallEvent = (event: IncomingCallEvent) => {
    setIncomingCallEvent(event);
  };

  const getConnectionData = ({
    connectionRef,
    onConnectionStatusSet,
    onIdentitySet,
    onIncomingCallEvent
  }: ConnectionEventData) => {
    return {
      connectionRef,
      onConnectionStatusSet,
      onIdentitySet,
      onIncomingCallEvent
    } as ConnectionEventData;
  };

  const checkConnectionStatus = () => {
    ibRtcConnectionEventsHandler(
      getConnectionData({
        connectionRef,
        onConnectionStatusSet,
        onIdentitySet,
        onIncomingCallEvent
      })
    );
  };

  return (
    <div className="App">
      <ConnectionState
        connectionStatus={connectionStatus}
        instantiateIbClient={instantiateIbClient}
        disconnect={disconnect}
      />

      {!incomingCallEvent && (
        <OutgoingCallComponent
          connectionRef={connectionRef}
        ></OutgoingCallComponent>
      )}

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
