import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import GameBoard from "./GameBoard";
import WaitingPage from "./WaitingPage";
import { useSocketContext } from "../context/SocketContext";
import { initSocket } from "../utils/socket";
import { Actions } from "../utils/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function PlatForm() {
  const { setRemoteUser, username, setLocalMark, setRemoteMark, isRoomCreate } =
    useUserContext();
  const { setSocketio } = useSocketContext();
  const { roomId } = useParams();
  const [showGameBoard, setShowGameBoard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("username", username);
    const socket = initSocket();
    setSocketio(socket);
    socket.on("connect_error", (err) => handleErrors(err));
    socket.on("connect_failed", (err) => handleErrors(err));

    function handleErrors(e) {
      console.log("socket error", e);
      toast.error("Socket connection failed, try again later.");
      navigate("/");
    }
    socket.emit(Actions.USER_JOIN, { roomId: roomId, username, isRoomCreate });
    socket.on(Actions.USER_JOINED, ({ username: remoteUserName }) => {
      console.log("username", username);
      setRemoteUser(remoteUserName);
      toast.success(`${username} joined`);
      let arr = ["X", "O"];
      let localMark = arr[Math.floor(Math.random() * arr.length)];
      setLocalMark(localMark);
      let remoteMark = localMark === "X" ? "O" : "X";
      setRemoteMark(remoteMark);
      setTimeout(() => {
        setShowGameBoard(true);
        socket.emit(Actions.SET_REMOTE, {
          localMark,
          remoteMark,
          remoteUser: username,
          roomId,
        });
      }, 1000);
    });
    socket.on(Actions.DISCONNECTED, ({ username }) => {
      toast.success(`${username} left`);
    });

    socket?.on(Actions.SET_REMOTE, ({ localMark, remoteMark, remoteUser }) => {
      console.log("listen for remote mark");
      setRemoteMark(localMark);
      setLocalMark(remoteMark);
      setRemoteUser(remoteUser);
      setShowGameBoard(true);
    });

    socket?.on(Actions.JOIN_NOT_ALLOWED, () => {
      toast.error("room is empty");
      navigate("/");
    });

    return () => {
      socket.off(Actions.USER_JOIN);
      socket.off(Actions.USER_JOINED);
      socket.off(Actions.DISCONNECTED);
      socket.off(Actions.SET_REMOTE);
      socket.disconnect();
    };
  }, []);
  return <div>{showGameBoard ? <GameBoard /> : <WaitingPage />}</div>;
}

export default PlatForm;
