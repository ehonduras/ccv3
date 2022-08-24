import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

interface IStartControls {
  startAudioCall: (id: string) => void;
  startVideoCall: (id: string) => void;
}

const StartCallControls: React.FC<IStartControls> = ({
  startAudioCall,
  startVideoCall
}) => {
  const handleAudioClick = () => {
    startAudioCall("franco");
  };

  const handleVideoClick = () => {
    startVideoCall("franco");
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
