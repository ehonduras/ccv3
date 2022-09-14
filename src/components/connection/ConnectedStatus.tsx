import React from "react";
import { ConnectionStatus } from "../../types/ConnectionStatus";

interface IConnectedStatus {
  connectionStatus: ConnectionStatus;
  disconnect: () => void;
  instantiateIbClient: () => void;
}

const ConnectedStatus: React.FC<IConnectedStatus> = ({
  connectionStatus,
  instantiateIbClient,
  disconnect
}) => {
  return (
    <div className="connectedState">
      <div className="connectContainer">
        <p>Connection Status: </p>
        <p>
          <span>{connectionStatus}</span>
        </p>
      </div>
      <div className="btnContainer">
        <button onClick={instantiateIbClient}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default ConnectedStatus;
