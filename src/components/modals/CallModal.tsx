import React, { useRef, MutableRefObject, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Streams } from "../../help/streamsInterface";

interface ICallModal {
  children: React.ReactNode;
  streams: Streams;
  isLocalVideoCall: boolean;
  isRemoteVideoCall: boolean; 
}

const CallModal: React.FC<ICallModal> = ({
  children,
  streams,
  isLocalVideoCall,
  isRemoteVideoCall
}) => {
  const localStream: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const remoteStream: MutableRefObject<HTMLVideoElement | null> = useRef(null);

  useEffect(() => {
    localStream.current && (localStream.current.srcObject = streams.localStream);
    remoteStream.current && (remoteStream.current.srcObject = streams.remoteStream);
  }, [streams]);

  return (
    <div className="callModalContainer">
      <div className="callPartiesContainer">
        <div className="userCallItem">
          {isLocalVideoCall ? (
            <video playsInline autoPlay className="video" ref={localStream} />
          ) : (
            <>
              <FontAwesomeIcon icon={faUser} size="5x"></FontAwesomeIcon>
              <audio autoPlay ref={localStream}></audio>
            </>
          )}
        </div>
        <div className="userCallItem">
          {isRemoteVideoCall ? (
              <video playsInline autoPlay className="video" ref={remoteStream}>video</video> 
          ) : (
            <>
              <FontAwesomeIcon icon={faUser} size="5x"></FontAwesomeIcon>
              <audio autoPlay ref={remoteStream}></audio>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CallModal;
