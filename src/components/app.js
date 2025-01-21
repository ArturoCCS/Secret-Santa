import { addUser, deleteParticipant, populateParticipants, updateRoomInfo } from '../utility/roomManager.js';
import { showCloseRoomMessage, showWarningMessage } from './message.js';
import { showCreateRoomPopup, showJoinRoomPopup } from './popup.js';

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'roomCreated') {
    updateRoomInfo(data);
    addUser(data.userName, true);
  } else if (data.type === 'roomJoined') {
    updateRoomInfo(data);
    populateParticipants(data);
  } else if (data.type === 'newParticipant') {
    addUser(data.userName);
  } else if (data.type === 'participantLeft') {
    deleteParticipant(data.disconnectedUser);
  } else if (data.type === 'roomClosed'){
    sessionStorage.setItem('closeRoomMessage', data.message);
    window.location.reload();
  } else if (data.type === 'error') {
    showWarningMessage(data.message);
  }
};

document.getElementById('createRoomBtn').addEventListener('click', () => {
  showCreateRoomPopup()
    .then((userName) => {
      if (userName) {
        const message = JSON.stringify({ type: 'createRoom', userName });
        ws.send(message);
      }
    })
    .catch((error) => {
      if(error !== 'CANCELLED'){
        showWarningMessage(error);
      }
    });
});

document.getElementById('joinRoomBtn').addEventListener('click', () => {
  showJoinRoomPopup()
    .then(({ userName, roomCode }) => { 
      if (userName && roomCode) {
        ws.send(JSON.stringify({ type: 'joinRoom', roomCode, userName }));
      }
    })
    .catch((error) => {
      if (error !== 'CANCELLED') {
        showWarningMessage(error);
      }
    });
});

window.addEventListener('load', () => {
  const savedMessage = sessionStorage.getItem('closeRoomMessage');
  const currentRoom = sessionStorage.getItem('currentRoom');
  if (savedMessage && currentRoom) {
      showCloseRoomMessage(savedMessage);
  }
});

