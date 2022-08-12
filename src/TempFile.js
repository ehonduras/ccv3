


// let outgoingCall = infobipRTC.call(id, callOptions);
// // let outgoingCall = infobipRTC.callPhoneNumber('38761545933');
// console.log(outgoingCall);        

// outgoingCall.on('ringing', function() {
//     console.log('Call is ringing on johnny\'s device!');
//   });

// outgoingCall.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
//     console.log('Alice answered call!');
//     localVideo.current!.srcObject = event.localStream;
//     remoteVideo.current!.srcObject = event.remoteStream;
//   });

  
//   const connect = () => {
//     infobipRTC.connect();

//     infobipRTC.on('connected', function(event: {identity: string}) {
//         console.log('Connected with identity: ' + event.identity);

//         infobipRTC.on('incoming-call', function(incomingCallEvent:any) {
//             console.log(incomingCallEvent);
            
//             const incomingCall = incomingCallEvent.incomingCall;
//             console.log('Received incoming call from: ' + incomingCall.source().identity);
            
//             incomingCall.accept();
             
//             incomingCall.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
//                 setCallAccepted(true);
//                 localVideo.current!.srcObject = event.localStream;
//                 remoteVideo.current!.srcObject = event.remoteStream;
//             });
//             incomingCall.on('hangup', function() {});
//         });
//       });
// }


// const disconnect = () => {
//     infobipRTC.disconnect();
//     infobipRTC.on('disconnected', function(event: {identity: string}) {
//       console.log('Disconnected!');
//     });
// }