import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const VideoDisplay = ({ roomID }) => {
  const { state, startVideo, videoRef, leaveRoom } = useTwilioVideo();

  useEffect(() => {
    if (!state.token) {
      navigate('/', { state: { roomName: roomID } });
    }

    if (!state.room) {
      startVideo();
    }

    window.addEventListener('beforeunload', leaveRoom);
    return () => {
      window.removeEventListener('beforeunload', leaveRoom);
    };
  }, [state, roomID, startVideo, leaveRoom]);

  return (
    <>
      <h1>Room: {roomID}</h1>
      {state.room && (
        <button className="leave-room" onClick={leaveRoom}>
          Leave room
        </button>
      )}
      <div className="chat" ref={videoRef} />
    </>
  );
};

export default VideoDisplay;
