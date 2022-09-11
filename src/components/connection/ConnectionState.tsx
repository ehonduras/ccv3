import React, { useContext } from "react";
import { ConnectionStatus } from "../../types/ConnectionStatus";
import ConnectedStatus from "./ConnectedStatus";
import Identity from "./Identity";

interface IConnectionStateProps {
  connectionStatus: ConnectionStatus;
  disconnect: () => void;
  instantiateIbClient: () => void;
}

const ConnectionState: React.FC<IConnectionStateProps> = ({
  connectionStatus,
  instantiateIbClient,
  disconnect
}) => {
  return (
    <div className="connectionComponent">
      <Identity />
      <ConnectedStatus
        connectionStatus={connectionStatus}
        instantiateIbClient={instantiateIbClient}
        disconnect={disconnect}
      />
      <Identity />
    </div>
  );
};

export default ConnectionState;
