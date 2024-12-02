import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];
wss.on("connection", (socket) => {
  
    socket.on("message", (message) => {
      // @ts-ignore
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type == "join") {
        allSockets.push({
          socket,
          room : parsedMessage.payload.roomId,
        });
        
      }

      if (parsedMessage.type == "chat") {
        console.log("user wants to chat");
        // const currentUserRoom = allSockets.find((x) => x.socket == socket).room
        let currentUserRoom = null;
        for (let i = 0; i < allSockets.length; i++) {
            console.log("inside 1st lopp");
            
          if (allSockets[i].socket == socket) {
            currentUserRoom = allSockets[i].room;
            
          }
        }

        for (let i = 0; i < allSockets.length; i++) {
            console.log("inside 2nd lopp");
            console.log(currentUserRoom);
           
          if (allSockets[i].room == currentUserRoom) {
            console.log("user wants send chat");
            allSockets[i].socket.send(parsedMessage.payload.message);
          }
        }
      }
    });
  
});
