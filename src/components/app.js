import { showCreateRoomPopup, showJoinRoomPopup } from './popup.js';
import { showWarningMessage } from './warningMessage.js';

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'roomCreated') {
    addUser(data.userName, true);
    updateRoomInfo(data);
  } else if (data.type === 'roomJoined') {
    populateParticipants(data);
    updateRoomInfo(data);
  } else if (data.type === 'newParticipant') {
    addUser(data.userName);
  } else if (data.type === 'participantLeft') {
    deleteParticipant(data.disconnectedUser);
  } else if (data.type === 'roomClosed'){
    alert(data.message);
  } else if (data.type === 'error') {
    alert(data.message);
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
        console.log(userName)
        const message = JSON.stringify({ type: 'joinRoom', roomCode, userName });
        ws.send(message);
      }
    })
    .catch((error) => {
      if (error !== 'CANCELLED') {
        showWarningMessage(error);
      }
    });
});

function populateParticipants(data) {
  data.participants.forEach((participant) => {
    addUser(participant, participant === data.userName);
  });
}

function addUser(userName, isCurrentUser) {
  const participantsList = document.getElementById('messages');
  const userItem = document.createElement('p');
  userItem.textContent = isCurrentUser ? 'You' : userName;
  userItem.setAttribute('data-username', userName);
  
  if (isCurrentUser) userItem.classList.add('current-user');
  participantsList.appendChild(userItem);
}

function updateRoomInfo(data) {
  document.getElementById('roomCode').textContent = data.roomCode;
  document.getElementById('userName').textContent = data.userName;
  document.getElementById('roomOptions').style.display = 'none';
  document.getElementById('primaryBanner').style.display = 'none';
  document.getElementById('roomInfo').style.display = 'block';
  document.getElementById('roomBanner').style.display = 'flex';
  document.getElementById('roomNavInfo').style.display = 'block';
  
}

function deleteParticipant(userName) {
  const participantsList = document.getElementById('messages');
  const userItem = participantsList.querySelector(`p[data-username="${userName}"]`);
  
  if (userItem) {
      participantsList.removeChild(userItem);
  }
}

