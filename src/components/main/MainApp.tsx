import { useState, useRef, MutableRefObject } from "react";
import ibRtcConnectionEventsHandler from "../../functions/ibRtcConnectionEventsHandler";
import { obtainToken } from "../../functions/obtainToken";
import { ConnectionEventData } from "../../types/ConnectionEventData";
import ConnectionState from "../../components/connection/ConnectionState";
import { ConnectionStatus } from "../../types/ConnectionStatus";
import OutgoingCallComponent from "../../components/call/OutgoingCallComponent";
import IncomingCallComponent from "../../components/call/IncomingCallComponent";
import { IncomingCallEvent, InfobipRTC } from "infobip-rtc";
import {
  ibIdentities,
  obtainPossibleCallees
} from "../../functions/ibIdentities";

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

  const getCallees = () => {
    const callees = obtainPossibleCallees(ibIdentities, localIdentity);

    return callees;
  };

  return (
    <div className="mainApp">
      <ConnectionState
        connectionStatus={connectionStatus}
        instantiateIbClient={instantiateIbClient}
        disconnect={disconnect}
        localIdentity={localIdentity}
        calleeIdentity={calleeIdentity}
        localIdentitySet={localIdentitySet}
      />

      {!incomingCallEvent && (
        <OutgoingCallComponent
          connectionRef={connectionRef}
          calleeIdentity={calleeIdentity}
          localIdentity={localIdentity}
          calleeIdentitySet={calleeIdentitySet}
        ></OutgoingCallComponent>
      )}

      <IncomingCallComponent
        isCallRinging={isCallRinging}
        connectionRef={connectionRef}
        isCallRingingSet={isCallRingingSet}
        incomingCallEvent={incomingCallEvent}
      ></IncomingCallComponent>
    </div>
  );
};

export default MainApp;
