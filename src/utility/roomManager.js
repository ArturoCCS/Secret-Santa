import { createRoomView } from "./roomView.js";

export function addUser(userName, isCurrentUser) {
    const participantsList = document.getElementById('messages');
    const userItem = document.createElement('p');
    userItem.textContent = isCurrentUser ? 'Tu' : userName;
    userItem.setAttribute('data-username', userName);
    
    if (isCurrentUser) userItem.classList.add('current-user');
    participantsList.appendChild(userItem);
}
  
export function updateRoomInfo(data) {
    document.getElementById('preview').style.display = 'none';
    document.body.appendChild(createRoomView());
    document.getElementById('roomCode').textContent = data.roomCode;
    document.getElementById('userName').textContent = data.userName;
    sessionStorage.setItem('currentRoom', data.roomCode);
}

export function populateParticipants(data) {
    data.participants.forEach((participant) => {
      addUser(participant, participant === data.userName);
    });
}
  
  
export function deleteParticipant(userName) {
    const participantsList = document.getElementById('messages');
    const userItem = participantsList.querySelector(`p[data-username="${userName}"]`);
    
    if (userItem) {
        participantsList.removeChild(userItem);
    }
  }