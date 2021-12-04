import React, { useState, useEffect } from "react";

const Chat = (chatObj: any) => {
  let socket = chatObj.socket;

  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      await socket.send(
        JSON.stringify({
          room: chatObj.room,
          type: 'sendmessage',
          user: chatObj.username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        })
      );
    }
  };

  useEffect(() => {
    socket.addEventListener("message", function (event: any) {
      console.log("Message from server ", event.data);
    });
  }, [socket]);

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
