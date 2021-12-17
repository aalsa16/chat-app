import React, { useState, useContext } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { SocketContext } from './socket';

function App() {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    socket.emit('join', { "username": username, "room": room });
  };

  return (
    <div className="App">
      <h3>Join a chat</h3>
      <input type="text" placeholder="Enter username" onChange={(event) => {setUsername(event.target.value)}} style={{ textAlign: "center" }} />
      <input type="text" placeholder="Enter room ID" onChange={(event) => {setRoom(event.target.value)}} style={{ textAlign: "center" }} />
      <button onClick={joinRoom}>Join room</button>

      <SocketContext.Provider value={socket} >
        <Chat username={username} room={room}/>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
