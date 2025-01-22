export function createRoomView() {
    const mainRoom = document.createElement('main');
    mainRoom.classList.add('main-content');
    mainRoom.innerHTML = `
        <nav class="nav-bar" id="roomNavInfo">
            <div class="nav-content">
              <h2>You are in Room: <span id="roomCode"></span></h2>
              <h2>Welcome: <span id="userName"></span></h2>
            </div>
        </nav>

        <header class="header-banner" id="roomBanner">
            <div class="banner-content">
              <h2 class="participants-title">Other Participants:</h2>
              <div id="messages" class="participants-list"></div>
            </div>
            <div class="banner-image">
              <img class="img_writing_santa" src="src/assets/writing_santa.png" alt="Illustration for Secret Santa draw">
            </div>
        </header>

        <div id="roomInfo">
            <section class="input-section">
                <h2 class="section-title">Press to reveal your Secret Santa</h2>
    
                <div class="button-container">
                    <button class="button-draw" id="play" aria-label="Start Secret Santa draw">
                        <img src="src/assets/play_circle_outline.png" alt="Icon for draw">
                        Reveal Secret Santa
                    </button>
                </div>
            </section>
        </div>
    `;

    return mainRoom;
}
