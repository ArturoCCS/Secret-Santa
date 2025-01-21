export function cleanSessionRoom(){
    sessionStorage.removeItem('closeRoomMessage');
    sessionStorage.removeItem('currentRoom');
    return;
}
