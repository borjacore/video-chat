import React, { useState, useEffect } from 'react';
import {navigate} from 'gatsby';
import useTwilioVideo from '../hooks/use-twilio-video';

const Join = ({ location }) => {
  const defaultRoom =
    (location && location.state && location.state.roomName) || '';
  const { state, getRoomToken } = useTwilioVideo();
  const [identity, setIdentity] = useState('');
  const [roomName, setRoomName] = useState(defaultRoom);

  useEffect(() => {
    if (state.token && state.roomName) {
      navigate(`/room/${state.roomName}`)
    }
  }, [state])

  const handleSubmit = event => {
    event.preventDefault();
    getRoomToken({ identity, roomName });
  };

  return (
    <>
      <h1>Start or Join a video call</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <form className="start-form" onSubmit={handleSubmit}>
        <label htmlFor="identity">
          Display name:
          <input
            type="text"
            id="identity"
            value={identity}
            onChange={e => setIdentity(e.target.value)}
          />
        </label>
        <label htmlFor="roomName">
          Display name:
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
          />
        </label>
        <button type="submit">Join the video call</button>
      </form>
    </>
  );
};

export default Join;
