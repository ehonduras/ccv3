import React, { useState, useRef, MutableRefObject } from "react";
import { InfobipRTC, CallOptions, Call, HangupStatus } from "infobip-rtc";
import StartCallControls from "../call_controls/StartCallControls";
import InCallControls from "../call_controls/InCallControls";
import CallModal from "../modals/CallModal";
import { Streams } from "../../types/StreamsInterface";
import Calling from "../call_controls/Calling";
import Identity from "../connection/Identity";
import { CallParties } from "../../types/CallParties";

interface IOutgoingCallProps {
  connectionRef: MutableRefObject<InfobipRTC | null>;
  calleeIdentity: string;
  localIdentity: string;
  calleeIdentitySet: React.Dispatch<React.SetStateAction<string>>;
}

const OutgoingCallComponent: React.FC<IOutgoingCallProps> = ({
  connectionRef,
  calleeIdentity,
  localIdentity,
  calleeIdentitySet
}) => {
  const [streams, streamsSet] = useState<Streams>({
    localStream: null,
    remoteStream: null
  });
  const [isCallRinging, isCallRingingSet] = useState(false);
  const [isCallOngoing, isCallOngoingSet] = useState(false);
  const [isLocalUserMuted, isLocalUserMutedSet] = useState(false);
  const [isLocalVideoCall, isLocalVideoCallSet] = useState(false);
  const [isRemoteVideoCall, isRemoteVideoCallSet] = useState(false);

  const callRef: MutableRefObject<Call | null> = useRef(null);

  const startAudioCall = (id: string) => {
    try {
      if (connectionRef.current) {
        callRef.current = connectionRef.current.call(id);
        createCallEventListeners();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startVideoCall = (id: string) => {
    let callOptions = CallOptions.builder()
      .setVideo(true)
      .build();

    try {
      if (connectionRef.current) {
        callRef.current = connectionRef.current.call(id, callOptions);
        createCallEventListeners();
        isLocalVideoCallSet(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hangUpCall = () => {
    callRef.current && callRef.current.hangup();
    //provjeriti dodatno
  };

  const muteUser = () => {
    if (!isLocalUserMuted && callRef.current) {
      callRef.current.mute(true).catch((error: string) => console.log(error));
      isLocalUserMutedSet(true);
      console.log("local user muted");
      return;
    }

    callRef.current!.mute(false).catch((error: string) => console.log(error));
    isLocalUserMutedSet(false);
  };

  const toggleVideo = () => {
    if (!isLocalVideoCall && callRef.current) {
      isLocalVideoCallSet(true);
      callRef.current.localVideo(true).catch(error => console.log(error));
      console.log("local video toggled");
      return;
    }
    isLocalVideoCallSet(false);
    callRef.current!.localVideo(false).catch(error => console.log(error));
  };

  const checkIfVideoCall = () => {
    callRef.current &&
      callRef.current.hasLocalVideo() &&
      isLocalVideoCallSet(true);
    callRef.current &&
      callRef.current.hasRemoteVideo() &&
      isRemoteVideoCallSet(true);
  };

  const createCallEventListeners = () => {
    if (callRef.current) {
      callRef.current.on("ringing", function() {
        console.log("Call is ringing on johnny's device!");
        isCallRingingSet(true);
      });

      callRef.current.on("established", function(event: {
        localStream: MediaStream;
        remoteStream: MediaStream;
      }) {
        console.log("Alice answered call!");
        isCallRingingSet(false);
        isCallOngoingSet(true);

        streamsSet({
          localStream: event.localStream,
          remoteStream: event.remoteStream
        });

        checkIfVideoCall();
      });

      callRef.current.on("hangup", (event: HangupStatus) => {
        console.log(event);
        callRef.current && callRef.current.hangup();
        isCallOngoingSet(false);
        isCallRingingSet(false);
      });

      callRef.current.on(
        "updated",
        (event: { localStream: MediaStream; remoteStream: MediaStream }) => {
          streamsSet({
            localStream: event.localStream,
            remoteStream: event.remoteStream
          });

          checkIfVideoCall();
        }
      );
    }
  };

  return (
    <>
      {isCallOngoing ? (
        <CallModal
          streams={streams}
          isLocalVideoCall={isLocalVideoCall}
          isRemoteVideoCall={isRemoteVideoCall}
        >
          <InCallControls
            hangUpCall={hangUpCall}
            muteUser={muteUser}
            isLocalUserMuted={isLocalUserMuted}
            toggleVideo={toggleVideo}
          />
        </CallModal>
      ) : isCallRinging ? (
        <Calling />
      ) : (
        <>
          <StartCallControls
            calleeIdentity={calleeIdentity}
            startAudioCall={startAudioCall}
            startVideoCall={startVideoCall}
          />
          <Identity
            callParty={CallParties.CALLEE_SIDE}
            identity={calleeIdentity}
            identityToDisable={localIdentity}
            identitySet={calleeIdentitySet}
          />
        </>
      )}
    </>
  );
};

export default OutgoingCallComponent;
