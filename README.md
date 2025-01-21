# Secret Santa Web App

## Descripción

Esta aplicación permite realizar sorteos de "Amigo Secreto" de manera fácil y rápida. Los usuarios pueden unirse a una sala, donde se asignan los amigos secretos de forma aleatoria. La app está diseñada para evitar que un usuario se asigne a sí mismo como su amigo secreto.

## Características

- Los usuarios se conectan a través de una sala con un código único.
- Mensajes en tiempo real utilizando WebSockets.
- Validación de que al menos 3 participantes estén presentes antes de realizar el sorteo.
- Garantía de que ningún participante se asigna a sí mismo como amigo secreto.
- Capacidad para manejar eventos como la unión de nuevos participantes y el cierre automático de popups.

## Tecnologías Utilizadas

- **Node.js**: Servidor principal.
- **WebSocket**: Para la comunicación en tiempo real.
- **HTML/CSS/JavaScript**: Interfaz de usuario.

## Requisitos

- Node.js (versión 14 o superior).

## Instalación

1. Clona este repositorio:

    ```
    git clone <URL-del-repositorio>
    cd <nombre-del-proyecto>
    ```

2. Instala las dependencias necesarias:

    ```
    npm install
    ```

## Ejecución

Para ejecutar el proyecto localmente, utiliza el siguiente comando:

```
node server.js
```

El servidor se iniciará en `http://localhost:8080` o en el puerto configurado en tu archivo `server.js`.

## Uso

1. Inicia el servidor con `node server.js`.
2. Abre el archivo `index.html` con la extensión Live Server en Visual Studio Code. Esto iniciará el servidor local automáticamente y abrirá la página en tu navegador.
3. Los usuarios pueden:
    - Crear una sala y compartir el código con otros participantes.
    - Ingresar el código de sala para unirse.
    - Iniciar el sorteo una vez que al menos 3 participantes estén presentes.
4. A cada usuario se le mostrará un popup con el nombre de su amigo secreto.

## Estructura del Proyecto



```
|-- server.js          # Archivo principal del servidor
|-- src/            # Archivos estáticos (HTML, CSS, JS)
|-- package.json       # Información y dependencias del proyecto
|-- README.md          # Documentación del proyecto
```

## Notas

- Es necesario tener una conexión activa para participar en el sorteo.
- Para iniciar un sorteo se necesitan al menos 3 usuarios conectados. Cualquiera que presione el botón activará el popup para todos. Una vez activado el sorteo, al presionar se mostrará el amigo secreto del usuario que presionó el botón.
- Los popups se cierran automáticamente cuando un nuevo usuario se une a la sala, eliminando los valores si es que se realizó un sorteo anterior, para evitar errores.
- Se envía un mensaje de advertencia si un nombre de usuario ya está ocupado, además de advertencias como el cierre de la sala por inactividad después de un tiempo (ajustable en el código) y si el código de sala no se encuentra.
- (No existen validaciones tan profundas como verificar detalladamente el nombre de usuario).

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu función o corrección:

    ```
    git checkout -b nueva-funcionalidad
    ```

3. Realiza tus cambios y confirma:

    ```
    git commit -m "Añade nueva funcionalidad"
    ```

4. Sube los cambios a tu repositorio:

    ```
    git push origin nueva-funcionalidad
    ```

5. Crea un pull request en este repositorio.

## Demo 

https://github.com/user-attachments/assets/1a59bf6b-aecb-4fbe-bf6e-fa50164b289e

