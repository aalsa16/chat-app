from logging import debug
from flask import Flask
from flask_socketio import SocketIO, send, join_room, leave_room, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRET_KEY"
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

@socketio.on('message')
def handle_message(data):
    message = data['message']
    room = data['room']
    emit('message', message, room=room)

if __name__ == "__main__":
    socketio.run(app, debug=True, port=3333)