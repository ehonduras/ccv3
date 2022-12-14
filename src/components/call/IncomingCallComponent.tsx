import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import InCallControls from "../call_controls/InCallControls";
import ReceiveCall from "../call_controls/ReceiveCall";
import CallModal from "../modals/CallModal";
import { InfobipRTC, IncomingCall, IncomingCallEvent } from "infobip-rtc";
import { Streams } from "../../types/StreamsInterface";

interface IIncomingCallComponent {
  isCallRinging: boolean;
  connectionRef: MutableRefObject<InfobipRTC | null>;
  incomingCallEvent: IncomingCallEvent | null;

  isCallRingingSet: React.Dispatch<React.SetStateAction<boolean>>;
  incomingCallEventSet: React.Dispatch<IncomingCallEvent | null>;
}

const IncomingCallComponent: React.FC<IIncomingCallComponent> = ({
  isCallRinging,
  connectionRef,
  incomingCallEvent,
  isCallRingingSet,
  incomingCallEventSet
}) => {
  const [streams, streamsSet] = useState<Streams>({
    localStream: null,
    remoteStream: null
  });
  const [isCallOngoing, isCallOngoingSet] = useState(false);
  const [isLocalUserMuted, isLocalUserMutedSet] = useState(false);
  const [isLocalVideoCall, isLocalVideoCallSet] = useState(false);
  const [isRemoteVideoCall, isRemoteVideoCallSet] = useState(false);

  const incomingCallRef: MutableRefObject<IncomingCall | null> = useRef(null);

  /*useEffect(() => {
    connectionRef.current && onIncomingCallEventListeners();
  }, [connectionRef.current]);*/

  useEffect(() => {
    onIncomingCallEventListeners();
  }, [incomingCallEvent]);

  const answerCall = () => {
    incomingCallRef.current && incomingCallRef.current.accept();
    console.log("Incoming call answered");
  };

  const declineCall = () => {
    incomingCallRef.current && incomingCallRef.current.decline();
    console.log("Incoming call declined");
  };

  const hangUpCall = () => {
    incomingCallRef.current && incomingCallRef.current.hangup();
  };

  const muteUser = () => {
    if (!isLocalUserMuted && incomingCallRef.current) {
      incomingCallRef.current
        .mute(true)
        .catch((error: string) => console.log(error));
      isLocalUserMutedSet(true);
      console.log("local user muted");
      return;
    }

    incomingCallRef
      .current!.mute(false)
      .catch((error: string) => console.log(error));
    isLocalUserMutedSet(false);
  };

  const toggleVideo = () => {
    if (!isLocalVideoCall && incomingCallRef.current) {
      isLocalVideoCallSet(true);
      incomingCallRef.current
        .localVideo(true)
        .catch(error => console.log(error));
      console.log("video toggled");
      return;
    }
    isLocalVideoCallSet(false);
    incomingCallRef
      .current!.localVideo(false)
      .catch(error => console.log(error));
  };

  const checkIfVideoCall = () => {
    incomingCallRef.current &&
      incomingCallRef.current.hasLocalVideo() &&
      isLocalVideoCallSet(true);
    incomingCallRef.current &&
      incomingCallRef.current.hasRemoteVideo() &&
      isRemoteVideoCallSet(true);
  };

  const onIncomingCallEventListeners = () => {
    if (incomingCallEvent) {
      isCallRingingSet(true);

      incomingCallRef.current = incomingCallEvent.incomingCall as IncomingCall;
      console.log(
        "Received incoming call from: " +
          incomingCallRef.current.source().identity
      );

      incomingCallRef.current.on("established", function(event: {
        localStream: MediaStream;
        remoteStream: MediaStream;
      }) {
        isCallOngoingSet(true);
        streamsSet({
          localStream: event.localStream,
          remoteStream: event.remoteStream
        });

        checkIfVideoCall();
      });

      incomingCallRef.current.on("hangup", function() {
        incomingCallRef.current && incomingCallRef.current.hangup();
        isCallRingingSet(false);
        isCallOngoingSet(false);
        incomingCallEventSet(null);
      });

      incomingCallRef.current.on("updated", function(event: {
        localStream: MediaStream;
        remoteStream: MediaStream;
      }) {
        streamsSet({
          localStream: event.localStream,
          remoteStream: event.remoteStream
        });

        checkIfVideoCall();
      });
    }
  };

  return (
    <div>
      {isCallRinging && (
        <ReceiveCall
          identity={incomingCallRef.current!.source().identity}
          isCallRingingSet={isCallRingingSet}
          answerCall={answerCall}
          declineCall={declineCall}
        />
      )}
      {isCallOngoing && (
        <CallModal
          streams={streams}
          isLocalVideoCall={isLocalVideoCall}
          isRemoteVideoCall={isRemoteVideoCall}
        >
          {" "}
          <InCallControls
            hangUpCall={hangUpCall}
            muteUser={muteUser}
            isLocalUserMuted={isLocalUserMuted}
            toggleVideo={toggleVideo}
          />{" "}
        </CallModal>
      )}
    </div>
  );
};

export default IncomingCallComponent;
