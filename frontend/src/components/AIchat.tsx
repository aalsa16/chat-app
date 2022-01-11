import React, { useState, useEffect, useContext } from "react";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";

const createId = (): number => {
    return Math.random() * Math.random();
};

const AIchat = (chat: { username: string }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const getResponse = async (message: string) => {
        return fetch("http://127.0.0.1:1111/api/getResponse", {
            "body": JSON.stringify({ "message": message }),
            headers: {
                'Content-Type': 'application/json',
            },
            "method": "POST"
        }).then(async res => {
            const resp: { response: string } = await res.json();

            return resp.response;
        });
    };

    const sendMessage = async () => {
        if (currentMessage !== "") {
            // @ts-ignore
            setMessageList((list: any) => [...list, {
                author: chat.username,
                message: currentMessage,
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              }]);

            const response = await getResponse(currentMessage);

            // @ts-ignore
            setMessageList((list: any) => [...list, {
                author: "Jarvis",
                message: response,
                time:
                  new Date(Date.now()).getHours() +
                  ":" +
                  new Date(Date.now()).getMinutes(),
              }]);

            setCurrentMessage("");
        }
    };

    const leave_room = async () => {
        window.location.reload();
    };

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
    )
}

export default AIchat
