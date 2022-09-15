import React, { useContext } from "react";
import { CallParties } from "../../types/CallParties";
import { EVENT_CONNECTION_STATUS_NAME } from "../../types/ConnectionStatus";
import ConnectedStatus from "./ConnectedStatus";
import Identity from "./Identity";

interface IConnectionStateProps {
  connectionStatus: EVENT_CONNECTION_STATUS_NAME;
  disconnect: () => void;
  instantiateIbClient: () => void;
  localIdentity: string;
  calleeIdentity: string;
  localIdentitySet: React.Dispatch<React.SetStateAction<string>>;
}

const ConnectionState: React.FC<IConnectionStateProps> = ({
  connectionStatus,
  instantiateIbClient,
  disconnect,
  localIdentity,
  calleeIdentity,
  localIdentitySet
}) => {
  return (
    <div className="connectionComponent">
      <Identity
        callParty={CallParties.LOCAL_SIDE}
        identity={localIdentity}
        identityToDisable={calleeIdentity}
        identitySet={localIdentitySet}
      />
      <ConnectedStatus
        connectionStatus={connectionStatus}
        instantiateIbClient={instantiateIbClient}
        disconnect={disconnect}
      />
    </div>
  );
};

export default ConnectionState;
