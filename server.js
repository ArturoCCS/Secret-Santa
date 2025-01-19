const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); 

const rooms ={};

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

wss.on('connection', (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on('message', (message) => {
    const { type, roomCode, content } = JSON.parse(message);

    if (type === 'createRoom') {
      const newRoomCode = generateRoomCode();
      rooms[newRoomCode] = [ws];  
      ws.send(JSON.stringify({ type: 'roomCreated', roomCode: newRoomCode }));
      console.log(`Sala creada con código: ${newRoomCode}`);
    } else if (type === 'joinRoom') {
      if (rooms[roomCode]) {
        rooms[roomCode].push(ws);  
        ws.send(JSON.stringify({ type: 'roomJoined', roomCode: roomCode }));

        rooms[roomCode].forEach(client => {
          if (client !== ws) {
            client.send(JSON.stringify({ type: 'newParticipant', message: 'Un nuevo participante se ha unido' }));
          }
        });
      } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Sala no encontrada' }));
      }
    }else if (type === 'newMessage') {
      if (rooms[roomCode]) {
        rooms[roomCode].forEach(client => {
          if (client !== ws) {
            client.send(JSON.stringify({ type: 'newMessage', message: `${content}` }));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    for(let roomCode in rooms){
      const index = rooms[roomCode].indexOf(ws);
      if (index !== -1) {
        rooms[roomCode].splice(index, 1);
        console.log(`Cliente desconectado de la sala ${roomCode}`)
        if(rooms[roomCode].length === 0){
          delete rooms[roomCode];
        }
        break;
      }
    }
  });

 
});

