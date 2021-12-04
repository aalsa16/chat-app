import React, { useState } from "react";
import "./App.css";
import socket from './websocketConnection';
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {

    }
  };

  return (
    <div className="App">
      <h3>Join a chat</h3>
      <input type="text" placeholder="Enter username" onChange={(event) => {setUsername(event.target.value)}} style={{ textAlign: "center" }} />
      <input type="text" placeholder="Enter room ID" onChange={(event) => {setRoom(event.target.value)}} style={{ textAlign: "center" }} />
      <button>Join room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
