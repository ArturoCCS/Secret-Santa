export function createRoomView(){
    const mainRoom = document.createElement('main');
    mainRoom.classList.add('main-content');
    mainRoom.innerHTML = `
                
        <nav class="nav-bar"  id="roomNavInfo" >
            <div class="nav-content">
              <h2>Estás en la Sala: <span id="roomCode"></span></h2>
              <h2>Bienvenido: <span id="userName"></span></h2>
            </div>
        </nav>

           <header class="header-banner" id="roomBanner" >
            <div class="banner-content">
              <h2 class="participants-title">Otros Participantes:</h2>
              <div id="messages" class="participants-list"></div>
            </div>
            <div class="banner-image">
              <img class="img_writing_santa" src="../assets/writing_santa.png" alt="Imagen representativa de amigo secreto para sorteo de regalos">
            </div>
        </header>

                <div id="roomInfo" >
            
            <section class="input-section" >
                <h2 class="section-title">Preciona para descubrir a su amigos secretos</h2>
    
                <div class="button-container">
                    <button class="button-draw" onclick="sortearAmigo()" aria-label="Sortear amigo secreto">
                        <img src="../assets//play_circle_outline.png" alt="Ícono para sortear">
                        Sortear amigo
                    </button>
                </div>
            </section>
        </div>
    `;

    return mainRoom;
}

