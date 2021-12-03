from asyncio.streams import start_server
import websockets
import asyncio

PORT = 3333

print(f"Server listening on port {PORT}")

async def echo(websocket, path):
    print("A client just connected")
    async for message in websocket:
        print(f"Received message from client: {message}")
        # await websocket.send(f"Pong: {message}")

start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()