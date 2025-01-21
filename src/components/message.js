import { createCard } from '../utility/card.js';
import { cleanSessionRoom } from '../utility/cleanSessionStorage.js';

export function showWarningMessage(message){
        const card = createCard(message);
        document.body.appendChild(card);
        document.getElementById('close').addEventListener('click', () => {
            document.body.removeChild(card);
        });
        setTimeout(() => {
            if (document.body.contains(card)) {
              document.body.removeChild(card);
            }
        }, 3000);
}

export function showCloseRoomMessage(message) {
    const card = document.createElement('div');
    card.classList.add('modal');
    card.appendChild(createCard(message));
    
    document.body.appendChild(card);
    document.getElementById('close').addEventListener('click', () => {
        document.body.removeChild(card);
        cleanSessionRoom();
        window.location.reload();
    });
    
    window.addEventListener('beforeunload', () => {
        cleanSessionRoom();
    });
       
}
