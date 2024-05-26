import { Server } from "socket.io";
import { Actions } from "../client/src/utils/Actions.js";

const io = new Server();

const roomUserCount = {};
const userSocketMap = {};

io.on("connection", (socket) => {
  socket.on(Actions.USER_JOIN, ({ roomId, username }) => {
    let userCount = roomUserCount[roomId] || 1;
    if (userCount < 2) {
      userSocketMap[socket.id] = username;
      roomUserCount[roomId] = roomUserCount[roomId]
        ? roomUserCount[roomId] + 1
        : 1;
      socket.join(roomId);
      io.to(roomId).except(socket.id).emit(Actions.USER_JOINED, { username });
    } else {
      io.to(socket.id).emit(Actions.ROOM_FULL);
    }
  });

  socket.on(Actions.MOVE_PLAYED, ({ value, index, innerIndex, roomId }) => {
    io.to(roomId)
      .except(socket.id)
      .emit(Actions.MOVE_PLAYED, { value, index, innerIndex });
  });

  socket.on(Actions.PLAYER_WON, ({ roomId, username }) => {
    io.to(roomId).except(socket.id).emit(Actions.PLAYER_WON, { username });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

io.listen(3000);
