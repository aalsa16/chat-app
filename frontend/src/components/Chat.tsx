import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../socket"
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = (chatObject: { username: string, room: string }) => {
  const socket = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([""]);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async (): Promise<void> => {
    if (currentMessage !== "") {
      const newMessage: object = {
        username: chatObject.username,
        message: currentMessage,
        room: chatObject.room,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
      };

      await socket.emit("message", newMessage);
      setError(null);
      setCurrentMessage("");
    }
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
