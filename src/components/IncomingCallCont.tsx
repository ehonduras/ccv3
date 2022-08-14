import React, {useContext} from 'react';
import { Context } from '../context/MyContext';

const IncomingCall = () => {
  const { identity, callRingingSet, showCallModalSet, answerCall, declineCall } = useContext(Context);
   
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event.currentTarget.name) {
      case 'answer':
        callRingingSet!(false);
        showCallModalSet!(true);
        answerCall!();
        break;
      case 'decline':
        callRingingSet!(false);
        showCallModalSet!(true);
        declineCall!();
        break;
      default:
        console.log('Something was wrong');        
        break;
  }
}

  return (
    <div className='incomingCallContainer'>
        <p>{identity ? identity : 'Unknown person'} is calling you</p>
        <button onClick={handleClick} name='answer'>Answer Call</button>
        <button onClick={handleClick} name='decline'>Decline Call</button>
    </div>
  )
}

export default IncomingCall