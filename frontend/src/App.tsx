import React, { useState } from "react";
import "./App.css";

const socket = new WebSocket("ws://127.0.0.1:3333");

function App() {
  const [infoObject, setObject] = useState({
    username: "",
  });

  const getWebsocket = (event: any) => {
    event.preventDefault();

    setObject({ username: event.target.elements.username.value });

    socket.send(JSON.stringify({ username: infoObject.username }));
  };

  const onInputchange = (event: any) => {
    setObject({
      username: event.target.value,
    });
  };

  socket.addEventListener("open", function (event) {
    socket.send("Connected!");
  });

  socket.addEventListener("message", function (event) {
    console.log("Message from server ", event.data);
  });

  return (
    <div className="App">
      <h1
        style={{
          margin: "10px",
          color: "white",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Chat App
      </h1>
      <form
        onSubmit={getWebsocket}
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          padding: "10%",
        }}
      >
        <label style={{ color: "white", fontFamily: "'Poppins', sans-serif" }}>
          <input
            name="username"
            id="username"
            type="text"
            value={infoObject.username}
            onChange={onInputchange}
            placeholder="Enter username"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textAlign: "center",
              borderRadius: "5px",
            }}
          />
        </label>
        <input
          type="submit"
          value="Enter"
          style={{ margin: "auto", fontFamily: "'Poppins', sans-serif" }}
        />
      </form>
    </div>
  );
}

export default App;
