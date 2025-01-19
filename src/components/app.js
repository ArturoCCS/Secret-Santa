import { showNamePopup } from './popup.js';

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
  } else if (data.type === 'error') {
    alert(data.message);
  }
};

document.getElementById('createRoomBtn').addEventListener('click', () => {
  showNamePopup()
    .then((userName) => {
      if (userName) {
        const message = JSON.stringify({ type: 'createRoom', userName });
        ws.send(message);
      }
    })
    .catch((error) => {
      console.error('Error al ingresar el nombre:', error);
      alert('Ocurrió un error, por favor intenta de nuevo.');
    });
});

document.getElementById('joinRoomBtn').addEventListener('click', () => {
  const roomCode = document.getElementById('joinRoomInput').value;
  const userName = document.getElementById('name').value;
  const message = JSON.stringify({ type: 'joinRoom', roomCode, userName });
  ws.send(message);
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
  document.getElementById('roomInfo').style.display = 'block';
}

function deleteParticipant(userName) {
  const participantsList = document.getElementById('messages');
  const userItem = participantsList.querySelector(`p[data-username="${userName}"]`);
  
  if (userItem) {
      participantsList.removeChild(userItem);
  }
}
