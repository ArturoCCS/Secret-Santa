# Secret Santa Web App

## Description

This application allows for easy and quick "Secret Santa" draws. Users can join a room where secret friends are assigned randomly. The app is designed to ensure that no user is assigned to themselves as their secret friend.

## Features

- Users connect through a room with a unique code.
- Real-time messaging using WebSockets.
- Validation to ensure at least 3 participants are present before starting the draw.
- Guarantees that no participant is assigned to themselves.
- Handles events such as new participants joining and the automatic closure of popups.

## Technologies Used

- **Node.js**: Main server.
- **WebSocket**: For real-time communication.
- **HTML/CSS/JavaScript**: User interface.

## Requirements

- Node.js (version 14 or higher).

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/ArturoCCS/Secret-Santa.git
    cd <project-name>
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

## Execution

To run the project locally, use the following command:

```
node server.js
```

The server will start at http://localhost:8080 or the port configured in your server.js file.

## Usage

1. Start the server with `node server.js`.
2. Open the `index.html` file with the Live Server extension in Visual Studio Code. This will automatically start the local server and open the page in your browser.
3. Users can:
    - Create a room and share the code with other participants.
    - Enter a room code to join.
    - Start the draw once at least 3 participants are present.
4. Each user will see a popup showing their secret friend’s name.

## Project Structure



```
|-- server.js          # Main server file

|-- src/             # Static files (HTML, CSS, JS)

|-- package.json       # Project information and dependencies

|-- README.md          # Project documentation

```

## Notes

- An active connection is required to participate in the draw.
- To start a draw, at least 3 users must be connected. Anyone who clicks the button will trigger the popup for all participants. Once the draw is activated, clicking will display the secret friend of the user who clicked.
- Popups close automatically when a new user joins the room, clearing previous values if a draw was conducted earlier to avoid errors.
- A warning message is displayed if a username is already taken, as well as warnings for events like the room closing due to inactivity after a set time (adjustable in the code) or when the room code is not found.
- (There are no deep validations, such as detailed checks on the username).

## Contribution

1. Fork the repository.
    
2. Create a branch for your feature or fix:

        ```bash
    
        git checkout -b new-feature
    
        ```
    
      

  

3. Make your changes and commit them:

  

    ```bash

    git commit -m "Add new feature"

    ```


  

4. Push your changes to your repository:

  
  
    ```bash

    git push origin new-feature


    ```


  

5. Create a pull request in this repository.



## Demo

https://github.com/user-attachments/assets/1a59bf6b-aecb-4fbe-bf6e-fa50164b289e
