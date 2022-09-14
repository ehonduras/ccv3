import React, { useContext, useState } from "react";

interface IReceiveCallProps {
  identity: string;
  answerCall: () => void;
  declineCall: () => void;

  isCallRingingSet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReceiveCall: React.FC<IReceiveCallProps> = ({
  identity,
  answerCall,
  declineCall,
  isCallRingingSet
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event.currentTarget.name) {
      case "answer":
        isCallRingingSet(false);
        answerCall();
        break;
      case "decline":
        isCallRingingSet(false);
        declineCall();
        break;
      default:
        console.log("Something was wrong");
        break;
    }
  };

  return (
    <div className="incomingCallContainer">
      <p>{identity ? identity : "Unknown person"} is calling you</p>
      <button onClick={handleClick} name="answer">
        Answer Call
      </button>
      <button onClick={handleClick} name="decline">
        Decline Call
      </button>
    </div>
  );
};

export default ReceiveCall;
