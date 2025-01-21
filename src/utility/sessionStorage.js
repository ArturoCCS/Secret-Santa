export function cleanSessionRoom(){
    sessionStorage.removeItem('closeRoomMessage');
    sessionStorage.removeItem('currentRoom');
    sessionStorage.removeItem('completedRaffle');
}

export function addSessionSecretSanta(message){
    sessionStorage.setItem('completedRaffle',message);
}

export function addSessionCloseRoomMessage(message){
    sessionStorage.setItem('closeRoomMessage', message);
    window.location.reload();
}

export function addSessionCurrentRoom(roomCode){
    sessionStorage.setItem('currentRoom', roomCode);
}

export function cleanSessionSecretSanta(){
    sessionStorage.removeItem('completedRaffle');
}

export function cleanSessionCurrentRoom(){
    sessionStorage.removeItem('currentRoom');
}

