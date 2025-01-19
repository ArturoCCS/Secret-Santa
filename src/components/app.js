const ws = new WebSocket('ws://localhost:8080'); 

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'roomCreated') {
          document.getElementById('roomCode').textContent = data.roomCode;
          document.getElementById('roomOptions').style.display = 'none';
          document.getElementById('roomInfo').style.display = 'block';
        } else if (data.type === 'roomJoined') {
          document.getElementById('roomCode').textContent = data.roomCode;
          document.getElementById('roomOptions').style.display = 'none';
          document.getElementById('roomInfo').style.display = 'block';
        } else if (data.type === 'newParticipant') {
          const messagesDiv = document.getElementById('messages');
          const newMessage = document.createElement('p');
          newMessage.textContent = data.message;
          messagesDiv.appendChild(newMessage);
        } else if (data.type === 'newMessage') {
          const messagesDiv = document.getElementById('messages');
          const newMessage = document.createElement('p');
          newMessage.textContent = data.message;
          messagesDiv.appendChild(newMessage);
        } else if (data.type === 'error') {
          alert(data.message);
        }
      };

      document.getElementById('createRoomBtn').addEventListener('click', () => {
        const message = JSON.stringify({ type: 'createRoom' });
        ws.send(message);
      });

      document.getElementById('joinRoomBtn').addEventListener('click', () => {
        const roomCode = document.getElementById('joinRoomInput').value;
        const message = JSON.stringify({ type: 'joinRoom', roomCode });
        ws.send(message);
      });

document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        const messagesDiv = document.getElementById('messages');
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        messagesDiv.appendChild(newMessage);

          const roomCode = document.getElementById('roomCode').textContent;
          const ms = JSON.stringify({ type: 'newMessage', roomCode, content: message });
          ws.send(ms);
        }
});

