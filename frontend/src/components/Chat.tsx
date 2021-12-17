import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../socket"

const Chat = (chatObject: { username: string, room: string }) => {
  const socket = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on("connect", (data: any) => {
      console.log("Successfully Connected to the Server");
    });

    socket.on("message", (data: any) => {
      console.log(data);
    });
  }, [socket]);

  const sendMessage = () => {
    const newMessage: object = {
      "username": chatObject.username,
      "message": currentMessage,
      "room": chatObject.room
    };

    socket.emit("message", newMessage);
    setError(null);
    setCurrentMessage("");
  };


  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
