const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); 

const rooms ={};

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

wss.on('connection', (ws) => {
  let inactivityTimeout;

  ws.on('message', (message) => {
    const { type, roomCode, userName } = JSON.parse(message);

    if (type === 'createRoom') {
      const newRoomCode = generateRoomCode();
      rooms[newRoomCode] = { clients: [ws], participants: [userName] }; 

      inactivityTimeout = setTimeout(() => closeRoom(roomCode), 3600);

      ws.send(JSON.stringify({ type: 'roomCreated', roomCode: newRoomCode, userName }));
    } else if (type === 'joinRoom') {
      if (rooms[roomCode]) {
        const room = rooms[roomCode];

        room.clients.push(ws);
        room.participants.push(userName);

        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => closeRoom(roomCode), 3600);

        ws.send(JSON.stringify({ type: 'roomJoined', roomCode: roomCode, participants: room.participants, userName: userName }));

        room.clients.forEach(client => {
          if (client !== ws) {
              client.send(JSON.stringify({ type: 'newParticipant', userName: userName }));
          }
        });
      } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Sala no encontrada' }));
      }
    }
  });

  ws.on('close', () => {
    for (let roomCode in rooms) {
        const room = rooms[roomCode];
        const clientIndex = room.clients.indexOf(ws);

        if (clientIndex !== -1) {
            const disconnectedUser = room.participants[clientIndex];
            room.clients.splice(clientIndex, 1);
            room.participants.splice(clientIndex, 1);

            room.clients.forEach(client => {
                client.send(JSON.stringify({ type: 'participantLeft', disconnectedUser: disconnectedUser }));
            });

            if (room.clients.length === 0) {
                delete rooms[roomCode];
            }
            break;
        }
    }
  });

  function closeRoom(roomCode) {
    const room = rooms[roomCode];
    if (room) {
      room.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'roomClosed', message: 'La sala ha sido cerrada por inactividad.' }));
      });
      delete rooms[roomCode]; 
    }
  }
});