export function showNamePopup() {
    return new Promise((resolve, reject) => {  
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Ingresa tu nombre</h3>
                <input type="text" id="userNameInput" placeholder="Escribe tu nombre">
                <button id="submitNameBtn">Aceptar</button>
                <p id="error-message" style="color: red; display: none;">Por favor, ingresa un nombre válido</p> <!-- Mensaje de error -->
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('submitNameBtn').addEventListener('click', () => {
            const userName = document.getElementById('userNameInput').value.trim();
            const errorMessage = document.getElementById('error-message');

            if (userName) {
                document.body.removeChild(modal);  
                resolve(userName);  
            } else {
                errorMessage.style.display = 'block';  
                setTimeout(() => {
                    errorMessage.style.display = 'none';  
                }, 2000);
                reject('No se ingresó un nombre válido');  
                document.body.removeChild(modal);  
            }
        });
    });
}
