const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); 

const rooms ={};

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
function assignSecretSanta(room, ws) {
  const participants = room.participants;

  if (participants.length < 3) {
    ws.send(JSON.stringify({ type: 'warning', message: 'Debe haber al menos 3 personas para hacer el sorteo.' }));
    return;
  }

  let shuffledParticipants;
  let isValid = false;

  // Repetir hasta que se genere un barajado válido
  while (!isValid) {
    shuffledParticipants = [...participants];

    // Barajar los participantes de forma aleatoria
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }

    // Verificar que nadie se asigna a sí mismo
    isValid = shuffledParticipants.every((participant, index) => participant !== participants[index]);
  }

  // Asignar a cada participante un amigo secreto
  const assignments = {};
  for (let i = 0; i < participants.length; i++) {
    assignments[participants[i]] = shuffledParticipants[i];
  }

  // Enviar la asignación a cada cliente
  room.clients.forEach(client => {
    const userName = room.participants[room.clients.indexOf(client)];
    client.send(JSON.stringify({
      type: 'raffle',
      message: `${assignments[userName]}`,
    }));
  });
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
        const userInRoom = room.participants.some(participant => participant === userName);

        if (userInRoom) {
          ws.send(JSON.stringify({ type: 'warning', message: 'Este nombre ya está ocupado en la sala' }));
        } else {
          room.clients.push(ws);
          room.participants.push(userName);
  
          clearTimeout(inactivityTimeout);
          inactivityTimeout = setTimeout(() => closeRoom(roomCode), 360000);
  
          ws.send(JSON.stringify({ type: 'roomJoined', roomCode: roomCode, participants: room.participants, userName: userName }));
  
          room.clients.forEach(client => {
            if (client !== ws) {
                client.send(JSON.stringify({ type: 'newParticipant', userName: userName }));
            }
          });
        }

      }else {
        ws.send(JSON.stringify({ type: 'warning', message: 'Sala no encontrada' }));
      }
    }else if (type === 'raffle'){
     
      if (rooms[roomCode]) {
        const room = rooms[roomCode];
        assignSecretSanta(room, ws);
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