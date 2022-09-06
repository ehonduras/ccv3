import { InfobipRTC, IncomingCallEvent } from "infobip-rtc";
import { MutableRefObject } from "react";
import { ConnectionStatus } from "./ConnectionStatus";

export interface ConnectionEventData {
  connectionRef: MutableRefObject<InfobipRTC | null>;
  onConnectionStatusSet: (connectionStatus: ConnectionStatus) => void;
  onIdentitySet: (identity: string) => void;
  onIncomingCallEvent: (event: IncomingCallEvent) => void;
}
