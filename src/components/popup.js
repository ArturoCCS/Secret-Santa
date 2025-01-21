import { cleanSessionSecretSanta } from '../utility/sessionStorage.js';

export function showCreateRoomPopup() {
    return new Promise((resolve, reject) => {  
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3 class="title_popup">Ingresa tu nombre</h3>
                <input class="input" type="text" id="userNameInput" placeholder="Escribe tu nombre">
                <button id="submitCreateRoomBtn">Aceptar</button>
                <button id="cancelJoinRoomBtn">Cancelar</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitCreateRoomBtn').addEventListener('click', () => {
            const userName = document.getElementById('userNameInput').value.trim();

            if (userName) {
                document.body.removeChild(modal);  
                resolve(userName);  
            } else {  
                reject('No se ingresó un nombre');  
                document.body.removeChild(modal);  
            }
        });
        document.getElementById('cancelJoinRoomBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            reject('CANCELLED');
          });
    });
}

export function showJoinRoomPopup(){
    return new Promise((resolve, reject) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
             <div class="modal-content">
                <h3 class="title_popup">Ingresa tu nombre y el codigo de una sala</h3>
                <input class="input"  type="text" id="name" class="name" placeholder="Escribe tu nombre">
                <input class="input"  type="text" id="joinRoomInput" placeholder="Código de Sala">
                <button id="submitJoinRoomBtn">Aceptar</button>
                <button id="cancelJoinRoomBtn">Cancelar</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitJoinRoomBtn').addEventListener('click', () => {
            const userName = document.getElementById('name').value.trim();
            const roomCode = document.getElementById('joinRoomInput').value.trim();

                if (userName) {
                    if(roomCode){
                        document.body.removeChild(modal);  
                        resolve({userName, roomCode}); 
                    }else{
                        reject('No se ingresó un codigo de sala');  
                        document.body.removeChild(modal);
                    }
                } else {  
                    if(roomCode){
                        reject('No se ingresó un nombre');
                    }else{
                        reject('No se ingresó ningun dato');  
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

export function showSecretSantaPopup(secretSanta){
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content center">
            <p class="section-title">Amigo Secreto</p>
            <img class="secretSantaIcon" src="../assets/santa_snowman_icon.png" alt="Imagen representativa de amigo secreto para sorteo de regalos">
      
            <p class="section-secret-santa">Felicidades tu amigo secreto es <span class="subtitle">¡${secretSanta}!</span></p>
            
            <button id="close">Cerrar</button>
               
        </div>    
    `;

    document.body.appendChild(modal);

    document.getElementById('close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

}


export function desativatedPopoup(){
    const activePopups = document.querySelectorAll('.modal'); 
    activePopups.forEach(popup => {
        popup.remove();
    });
    cleanSessionSecretSanta()
}