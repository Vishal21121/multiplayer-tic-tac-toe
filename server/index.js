import { Server } from "socket.io";
import { Actions } from "../client/src/utils/Actions.js";

const io = new Server();

const roomUserCount = {};

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on(Actions.USER_JOIN, ({ roomId }) => {
    console.log(`user joined  ${roomId}`);
    if (roomUserCount[roomId] && roomUserCount[roomId] < 2) {
      roomUserCount[roomId] = roomUserCount[roomId] + 1;
      socket.join(roomId);
    }
  });
});

io.listen(3000);
