import { showNamePopup } from './popup.js';

const ws = new WebSocket('ws://localhost:8080'); 

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'roomCreated') {
          document.getElementById('roomCode').textContent = data.roomCode;
          document.getElementById('userName').textContent = data.userName;
          document.getElementById('roomOptions').style.display = 'none';
          document.getElementById('roomInfo').style.display = 'block';
        } else if (data.type === 'roomJoined') {
          document.getElementById('roomCode').textContent = data.roomCode;
          
          const messagesDiv = document.getElementById('messages')
          const newMessage = document.createElement('p');
          newMessage.textContent = data.participants;;
          messagesDiv.appendChild(newMessage);
          document.getElementById('userName').textContent = data.userName;
          document.getElementById('roomOptions').style.display = 'none';
          document.getElementById('roomInfo').style.display = 'block';
       } else if (data.type === 'newParticipant') {
          const messagesDiv = document.getElementById('messages');
          const newMessage = document.createElement('p');
          newMessage.textContent = data.message;
          messagesDiv.appendChild(newMessage);
        }else if (data.type === 'error') {
          alert(data.message);
        }
      };

      document.getElementById('createRoomBtn').addEventListener('click', () => {
        showNamePopup().then((userName) => {
            if (userName) {
                const message = JSON.stringify({ type: 'createRoom', userName });
                ws.send(message);
            }
        }).catch((error) => {
            console.log('Error al ingresar el nombre: ', error);
        });
    });
    
    

      document.getElementById('joinRoomBtn').addEventListener('click', () => {
        const roomCode = document.getElementById('joinRoomInput').value;
        const userName = document.getElementById('name').value;
        const message = JSON.stringify({ type: 'joinRoom', roomCode, userName});
        ws.send(message);
      });