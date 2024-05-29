# Tic-Tac-Toe Game

This is a multiplayer Tic-Tac-Toe game built with React, Node.js, and Socket.IO. The game allows two players to play Tic-Tac-Toe in real-time.

## Project Structure

The project is divided into two main directories: `client` and `server`.

### Client

The client-side of the application is built with React. The main entry point of the application is `main.jsx`. The application uses context for state management, which can be found in `UserContextProvider.jsx` and `SocketContextProvider.jsx`.

The game logic is primarily handled in `PlatForm.jsx`, where socket events are emitted and listened to. The `WaitingPage.jsx` component is displayed while waiting for another player to join the game.

The `randomAvatar.js` utility is used to generate random avatars for the players.

### Server

The server-side of the application is a simple Node.js server that handles Socket.IO events. The main entry point of the server is `index.js`.

## Setup

1. Clone the repository.
2. Navigate to the `client` directory and run `npm install` to install the client dependencies.
3. Navigate to the `server` directory and run `npm install` to install the server dependencies.
4. In the `client` directory, run `npm run dev` to start the client-side of the application.
5. In the `server` directory, run `npm run dev` to start the server-side of the application.

## Usage

1. Open the application in your web browser.
2. Enter your username and click "Join Game".
3. Share the game link with another player.
4. Once the other player joins, the game will start.
