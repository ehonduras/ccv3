import React, { useContext } from "react";
import { ConnectionStatus } from "../../types/ConnectionStatus";

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
    <div className="connectionState">
      <div className="connectContainer">
        <p>Connection Status: </p>
        <p>{connectionStatus}</p>
      </div>

      <div className="connectContainer">
        <p>Connect</p>
        <button onClick={instantiateIbClient}>Connect</button>
      </div>
      <div className="connectContainer">
        <p>Disconnect</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default ConnectionState;
