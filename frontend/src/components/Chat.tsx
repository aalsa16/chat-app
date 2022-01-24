import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../socket"
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import { createToast } from ".././utils/toast";

const createId = (): number => {
  return Math.random() * Math.random();
};

const Chat = (chat: { username: string, room: string }): any => {
  const socket = useContext(SocketContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.length !== 0) {
      const messageData: any = {
        room: chat.room,
        author: chat.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("message", messageData);

      setCurrentMessage("");
    }
  };

  const leave_room = async () => {
    await socket.emit('leave', { "username": chat.username, "room": chat.room });
    window.location.reload();
  };

  useEffect(() => {
    socket.on("message", (data: any) => {
        if (data.type) {
          if (data.username !== chat.username) {
            createToast('info', data.message);
          }
        } else {
          // @ts-ignore
          setMessageList((list: any) => [...list, data]);
        }
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <button id="leave-room" onClick={leave_room}>Back</button>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent: {
            author: string;
            message: string;
            time: string;
          }) => {
            return (
              <div
                className="message"
                id={chat.username === messageContent.author ? "you" : "other"}
                key={createId()}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time" key={createId()}>{messageContent.time}</p>
                    <p id="author" key={createId()}>{messageContent.author}</p>
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;