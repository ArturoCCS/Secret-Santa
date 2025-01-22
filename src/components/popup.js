import { cleanSessionSecretSanta } from '../utility/sessionStorage.js';

export function showCreateRoomPopup() {
    return new Promise((resolve, reject) => {  
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3 class="title_popup">Enter your name</h3>
                <input class="input" type="text" id="userNameInput" placeholder="Type your name">
                <button id="submitCreateRoomBtn">Accept</button>
                <button id="cancelJoinRoomBtn">Cancel</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitCreateRoomBtn').addEventListener('click', () => {
            const userName = document.getElementById('userNameInput').value.trim();

            if (userName) {
                document.body.removeChild(modal);  
                resolve(userName);  
            } else {  
                reject('No name was entered');  
                document.body.removeChild(modal);  
            }
        });
        document.getElementById('cancelJoinRoomBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            reject('CANCELLED');
        });
    });
}

export function showJoinRoomPopup() {
    return new Promise((resolve, reject) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
             <div class="modal-content">
                <h3 class="title_popup">Enter your name and room code</h3>
                <input class="input" type="text" id="name" class="name" placeholder="Type your name">
                <input class="input" type="text" id="joinRoomInput" placeholder="Room code">
                <button id="submitJoinRoomBtn">Accept</button>
                <button id="cancelJoinRoomBtn">Cancel</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitJoinRoomBtn').addEventListener('click', () => {
            const userName = document.getElementById('name').value.trim();
            const roomCode = document.getElementById('joinRoomInput').value.trim();

            if (userName) {
                if (roomCode) {
                    document.body.removeChild(modal);  
                    resolve({ userName, roomCode }); 
                } else {
                    reject('No room code was entered');  
                    document.body.removeChild(modal);
                }
            } else {  
                if (roomCode) {
                    reject('No name was entered');
                } else {
                    reject('No data was entered');  
                }
                document.body.removeChild(modal);
            }
        });

        document.getElementById('cancelJoinRoomBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            reject('CANCELLED');
        });
    });
}

export function showSecretSantaPopup(secretSanta) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content center">
            <p class="section-title">Secret Santa</p>
            <img class="secretSantaIcon" src="src/assets/santa_snowman_icon.png" alt="Illustration for Secret Santa draw">
            <p class="section-secret-santa">Congratulations! Your Secret Santa is <span class="subtitle">¡${secretSanta}!</span></p>
            <button id="close">Close</button>
        </div>    
    `;

    document.body.appendChild(modal);

    document.getElementById('close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

export function deactivatePopup() {
    const activePopups = document.querySelectorAll('.modal'); 
    activePopups.forEach(popup => {
        popup.remove();
    });
    cleanSessionSecretSanta();
}