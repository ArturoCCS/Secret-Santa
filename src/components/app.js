import { addUser, deleteParticipant, populateParticipants, updateRoomInfo } from '../utility/roomManager.js';
import { addSessionCloseRoomMessage, addSessionSecretSanta, cleanSessionCurrentRoom, cleanSessionRoom, cleanSessionSecretSanta } from '../utility/sessionStorage.js';
import { showCloseRoomMessage, showWarningMessage } from './message.js';
import { desativatedPopoup, showCreateRoomPopup, showJoinRoomPopup, showSecretSantaPopup } from './popup.js';

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const message = data.message;

  if (data.type === 'roomCreated') {
    updateRoomInfo(data);
    addUser(data.userName, true);
    activatePlay();
  } else if (data.type === 'roomJoined') {
    updateRoomInfo(data);
    populateParticipants(data);
    activatePlay();
  } else if (data.type === 'newParticipant') {
    addUser(data.userName);
    desativatedPopoup();
  } else if (data.type === 'participantLeft') {
    deleteParticipant(data.disconnectedUser);
    cleanSessionRoom();
  } else if(data.type === 'raffle'){
    showSecretSantaPopup(message);
    addSessionSecretSanta(message);
  } else if (data.type === 'roomClosed'){
    addSessionCloseRoomMessage(message)
  } else if (data.type === 'warning') {
    showWarningMessage(message);
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

function activatePlay() {
  document.getElementById('play').addEventListener('click', () => {
    const yourSecretSanta = sessionStorage.getItem('completedRaffle'); 
    const roomCode = sessionStorage.getItem('currentRoom'); 

    if (yourSecretSanta) { 
      showSecretSantaPopup(yourSecretSanta);
    } else if (roomCode) {
      ws.send(JSON.stringify({ type: 'raffle', roomCode }));
    }
  });
}

window.addEventListener('load', () => {
  const savedMessage = sessionStorage.getItem('closeRoomMessage');
  const currentRoom = sessionStorage.getItem('currentRoom');
  const secretSanta = sessionStorage.getItem('completedRaffle');

  if (savedMessage && currentRoom) {
    showCloseRoomMessage(savedMessage);
  }else if(currentRoom){
    cleanSessionCurrentRoom();
  }else if(secretSanta){
    cleanSessionSecretSanta();
  }
});