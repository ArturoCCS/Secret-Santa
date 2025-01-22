// Local version

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// const rooms = {};

// function generateRoomCode() {
//   return Math.random().toString(36).substr(2, 6).toUpperCase();
// }

// function assignSecretSanta(room, ws) {
//   const participants = room.participants;

//   if (participants.length < 3) {
//     ws.send(JSON.stringify({ type: 'warning', message: 'At least 3 people are required to start the draw.' }));
//     return;
//   }

//   let shuffledParticipants;
//   let isValid = false;

//   // Repeat until a valid shuffle is generated
//   while (!isValid) {
//     shuffledParticipants = [...participants];

//     // Shuffle participants randomly
//     for (let i = shuffledParticipants.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
//     }

//     // Verify that no one is assigned to themselves
//     isValid = shuffledParticipants.every((participant, index) => participant !== participants[index]);
//   }

//   // Assign each participant a secret friend
//   const assignments = {};
//   for (let i = 0; i < participants.length; i++) {
//     assignments[participants[i]] = shuffledParticipants[i];
//   }

//   // Send the assignment to each client
//   room.clients.forEach(client => {
//     const userName = room.participants[room.clients.indexOf(client)];
//     client.send(JSON.stringify({
//       type: 'raffle',
//       message: `${assignments[userName]}`,
//     }));
//   });
// }

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     const { type, roomCode, userName } = JSON.parse(message);

//     if (type === 'createRoom') {
//       const newRoomCode = generateRoomCode();
//       rooms[newRoomCode] = {
//         clients: [ws],
//         participants: [userName],
//         inactivityTimeout: setTimeout(() => closeRoom(newRoomCode), 3600 * 1000), // 1 hour
//       };

//       ws.send(JSON.stringify({ type: 'roomCreated', roomCode: newRoomCode, userName }));
//     } else if (type === 'joinRoom') {
//       if (rooms[roomCode]) {
//         const room = rooms[roomCode];
//         const userInRoom = room.participants.some(participant => participant === userName);

//         if (userInRoom) {
//           ws.send(JSON.stringify({ type: 'warning', message: 'This username is already taken in the room.' }));
//         } else {
//           room.clients.push(ws);
//           room.participants.push(userName);

//           clearTimeout(room.inactivityTimeout);
//           room.inactivityTimeout = setTimeout(() => closeRoom(roomCode), 3600 * 1000); // 1 hour

//           ws.send(JSON.stringify({ type: 'roomJoined', roomCode, participants: room.participants, userName }));

//           room.clients.forEach(client => {
//             if (client !== ws) {
//               client.send(JSON.stringify({ type: 'newParticipant', userName }));
//             }
//           });
//         }
//       } else {
//         ws.send(JSON.stringify({ type: 'warning', message: 'Room not found.' }));
//       }
//     } else if (type === 'raffle') {
//       if (rooms[roomCode]) {
//         const room = rooms[roomCode];
//         assignSecretSanta(room, ws);
//       }
//     }
//   });

//   ws.on('close', () => {
//     for (let roomCode in rooms) {
//       const room = rooms[roomCode];
//       const clientIndex = room.clients.indexOf(ws);

//       if (clientIndex !== -1) {
//         const disconnectedUser = room.participants[clientIndex];
//         room.clients.splice(clientIndex, 1);
//         room.participants.splice(clientIndex, 1);

//         room.clients.forEach(client => {
//           client.send(JSON.stringify({ type: 'participantLeft', disconnectedUser }));
//         });

//         if (room.clients.length === 0) {
//           clearTimeout(room.inactivityTimeout);
//           delete rooms[roomCode];
//         } else {
//           clearTimeout(room.inactivityTimeout);
//           room.inactivityTimeout = setTimeout(() => closeRoom(roomCode), 3600 * 1000);
//         }

//         break;
//       }
//     }
//   });

//   function closeRoom(roomCode) {
//     const room = rooms[roomCode];
//     if (room) {
//       clearTimeout(room.inactivityTimeout);
//       room.clients.forEach(client => {
//         client.send(JSON.stringify({ type: 'roomClosed', message: 'The room has been closed due to inactivity.' }));
//       });
//       delete rooms[roomCode];
//     }
//   }
// });
