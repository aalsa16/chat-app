from asyncio.streams import start_server
import json, asyncio, websockets
from websockets.exceptions import ConnectionClosed

connected = []
PORT = 3333

print(f"Server listening on port {PORT}")

async def error(websocket, message):
    event = {
        "type": "error",
        "message": message
    }

    await websocket.send(json.dumps(event))    

def remove(websocket):
    del connected[websocket]

async def sendmessage(websocket, event):
    try:
        for ws in connected:
            print(ws)
            await ws.send(json.dumps({ "message": event['message'], "user": event['user'], "time": event['time'] }))

        await websocket.send(json.dumps({ "message": event['message'], "user": event['user'], "time": event['time'] }))
    except Exception as e:
        print(e)
        print("Unknown error")

async def join(websocket):
    connected.append(websocket)
    print(connected)

async def handler(websocket, path):
    try:
        print("New connection")
        print(connected)
        message = await websocket.recv()
        event = json.loads(message)
        
        if event['type'] == "join":
            await join(websocket)
        elif event['type'] == "sendmessage":
            await sendmessage(websocket, event)
        elif event['type'] == "leave":
            await remove(websocket)
        else:
            pass
    except websockets.ConnectionClosed:
        print("Connection closed")
        remove(websocket)

start_server = websockets.serve(handler, 'localhost', PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()