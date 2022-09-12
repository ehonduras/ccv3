import { useState, useRef, MutableRefObject, useEffect } from "react";
import ibRtcConnectionEventsHandler from "../../functions/ibRtcConnectionEventsHandler";
import { obtainToken } from "../../functions/obtainToken";
import { ConnectionEventData } from "../../types/ConnectionEventData";
import ConnectionState from "../../components/connection/ConnectionState";
import { ConnectionStatus } from "../../types/ConnectionStatus";
import OutgoingCallComponent from "../../components/call/OutgoingCallComponent";
import IncomingCallComponent from "../../components/call/IncomingCallComponent";
import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import { ibIdentities } from "../../functions/ibIdentities";

const MainApp: React.FC = () => {
  const [connectionStatus, connectionStatusSet] = useState(
    ConnectionStatus.disconnected
  );
  const [isCallRinging, isCallRingingSet] = useState(false);
  const [localIdentity, localIdentitySet] = useState("");
  const [calleeIdentity, calleeIdentitySet] = useState("");
  const [
    incomingCallEvent,
    setIncomingCallEvent
  ] = useState<IncomingCallEvent | null>(null);

  const connectionRef: MutableRefObject<InfobipRTC | null> = useRef(null);

  const instantiateIbClient = async () => {
    let TOKEN = await obtainToken(localIdentity);
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
    localIdentitySet(identity);
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
    <div className="mainApp">
      <ConnectionState
        connectionStatus={connectionStatus}
        instantiateIbClient={instantiateIbClient}
        disconnect={disconnect}
        localIdentity={localIdentity}
        localIdentitySet={localIdentitySet}
      />

      {!incomingCallEvent && (
        <OutgoingCallComponent
          connectionRef={connectionRef}
          calleeIdentity={calleeIdentity}
          calleeIdentitySet={calleeIdentitySet}
        ></OutgoingCallComponent>
      )}

      <IncomingCallComponent
        identity={localIdentity} //provjeriti dodatno
        isCallRinging={isCallRinging}
        connectionRef={connectionRef}
        isCallRingingSet={isCallRingingSet}
        incomingCallEvent={incomingCallEvent}
      ></IncomingCallComponent>
    </div>
  );
};

export default MainApp;
