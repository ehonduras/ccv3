import { InfobipRTC, IncomingCallEvent } from "infobip-rtc";
import { MutableRefObject } from "react";
import { EVENT_CONNECTION_STATUS_NAME } from "./ConnectionStatus";

export interface ConnectionEventData {
  connectionRef: MutableRefObject<InfobipRTC | null>;
  onConnectionStatusSet: (
    connectionStatus: EVENT_CONNECTION_STATUS_NAME
  ) => void;
  onIdentitySet: (identity: string) => void;
  onIncomingCallEvent: (event: IncomingCallEvent) => void;
}
