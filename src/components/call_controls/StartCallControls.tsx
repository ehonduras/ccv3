import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

interface IStartControls {
  calleeIdentity: string;
  startAudioCall: (id: string) => void;
  startVideoCall: (id: string) => void;
}

const StartCallControls: React.FC<IStartControls> = ({
  calleeIdentity,
  startAudioCall,
  startVideoCall
}) => {
  const handleAudioClick = () => {
    startAudioCall(calleeIdentity);
  };

  const handleVideoClick = () => {
    startVideoCall(calleeIdentity);
  };

  return (
    <div className="startCallControls">
      <>
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={faPhone}
            color="whitesmoke"
            size="3x"
            className="icon"
            onClick={handleAudioClick}
          ></FontAwesomeIcon>
        </div>
        <div className="iconContainer">
          <FontAwesomeIcon
            icon={faVideoCamera}
            color="whitesmoke"
            size="3x"
            className="icon"
            onClick={handleVideoClick}
          ></FontAwesomeIcon>
        </div>
      </>
    </div>
  );
};

export default StartCallControls;
