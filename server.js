const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); 

const rooms ={};

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

wss.on('connection', (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on('message', (message) => {
    const { type, roomCode, userName } = JSON.parse(message);

    if (type === 'createRoom') {
      const newRoomCode = generateRoomCode();
      rooms[newRoomCode] = { clients: [ws], participants: [userName] }; 
      ws.send(JSON.stringify({ type: 'roomCreated', roomCode: newRoomCode, userName }));
    } else if (type === 'joinRoom') {
      if (rooms[roomCode]) {
        const room = rooms[roomCode];

        room.clients.push(ws);
        room.participants.push(userName);

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
                client.send(JSON.stringify({ type: 'participantLeft', message: disconnectedUser }));
            });

            if (room.clients.length === 0) {
                delete rooms[roomCode];
            }
            break;
        }
    }
  });
});