import { useState, useContext } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { SocketContext } from './socket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createToast } from "./utils/toast";

function App() {
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [show, setShow] = useState(false);

  const joinRoom = async (): Promise<void> => {
    if (username !== "" && room !== "" && !isNaN(parseInt(room))) {
      createToast('success', `Joined room: ${room} successfully!`);
      await socket.emit('join', { "username": username, "room": room });
      setShow(true);
    } else {
      if (!username) {
        createToast('error', 'Username cannot be blank!');
      } else if (!room) {
        createToast('error', 'Must enter room id!');
      } else if (isNaN(parseInt(room))) {
        createToast('error', 'Room id must be a number!');
      }
    }
  };

  return (
    <div className="App">
      { !show ? (
        <div className="container"> 
          <h3>Join a chat</h3>
          <input type="text" placeholder="Enter username" onChange={(event) => {setUsername(event.target.value)}} style={{ textAlign: "center" }} />
          <input type="text" placeholder="Enter room ID" onChange={(event) => {setRoom(event.target.value)}} style={{ textAlign: "center" }} />
          <button onClick={joinRoom}>Join room</button>
        </div>
      ) : (
        <SocketContext.Provider value={socket} >
          <Chat username={username} room={room} />
        </SocketContext.Provider>
      ) }
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
