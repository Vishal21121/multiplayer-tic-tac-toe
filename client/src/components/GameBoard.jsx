import React, { useState, useRef, useEffect } from "react";
import Square from "./Square";
import { v4 as uuidv4 } from "uuid";
import { GiCrossMark } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { initSocket } from "../utils/socket";
import { Actions } from "../utils/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import ConfettiExplosion from "react-confetti-explosion";
import { toast } from "react-hot-toast";

const GameBoard = () => {
  const arr = useRef(new Array(3).fill().map(() => new Array(3).fill("")));
  const [boardArr, setBoardArr] = useState(arr.current);
  const [userSymbol, setUserSymbol] = useState("");
  const [socketio, setSocketio] = useState(null);
  const { roomId } = useParams();
  const { username, setCurrentPlayer, remoteUser, setRemoteUser } =
    useUserContext();
  const [playerWon, setPlayerWon] = useState("");
  const [userWon, setUserWon] = useState(false);
  const navigate = useNavigate();

  const insertSymbol = (value, index, innerIndex) => {
    let tempArr = JSON.parse(JSON.stringify(arr.current));
    if (!value) {
      socketio.emit(Actions.MOVE_PLAYED, {
        value: userSymbol,
        index,
        innerIndex,
        roomId,
      });
      console.log(remoteUser);
      setCurrentPlayer(remoteUser);
      tempArr[index][innerIndex] = userSymbol;
      arr.current[index][innerIndex] = userSymbol;
      setBoardArr(tempArr);
      const isWon = haveWon(tempArr);
      console.log("iswon", isWon);
      if (isWon) {
        setUserWon(true);
        setPlayerWon(username);
        socketio.emit(Actions.PLAYER_WON, { roomId, username });
      }
    } else {
      console.log("not empty");
    }
  };

  const haveWon = (boardArr) => {
    // check the rows
    for (let index = 0; index < boardArr.length; index++) {
      if (
        boardArr[index][0] === userSymbol &&
        boardArr[index][1] === userSymbol &&
        boardArr[index][2] === userSymbol
      ) {
        return true;
      }
    }
    // check for cols
    for (let index = 0; index < boardArr[0].length; index++) {
      if (
        boardArr[0][index] === userSymbol &&
        boardArr[1][index] === userSymbol &&
        boardArr[2][index] === userSymbol
      ) {
        return true;
      }
    }
    //   for diagnols
    if (
      boardArr[0][0] === userSymbol &&
      boardArr[1][1] === userSymbol &&
      boardArr[2][2] === userSymbol
    ) {
      return true;
    }
    if (
      boardArr[2][0] === userSymbol &&
      boardArr[1][1] === userSymbol &&
      boardArr[0][2] === userSymbol
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    console.log({ username, remoteUser });
    document.getElementById("my_modal_5").showModal();
    const socket = initSocket();
    setSocketio(socket);
    socket.on("connect_error", (err) => handleErrors(err));
    socket.on("connect_failed", (err) => handleErrors(err));

    function handleErrors(e) {
      console.log("socket error", e);
      toast.error("Socket connection failed, try again later.");
      navigate("/");
    }

    socket.emit(Actions.USER_JOIN, { roomId: roomId, username });
    socket.on(Actions.USER_JOINED, ({ username }) => {
      console.log("username", username);
      toast.success(`${username} joined`);
      setRemoteUser(username);
    });
    socket.on(Actions.DISCONNECTED, ({ username }) => {
      toast.success(`${username} left`);
    });

    socket.on(Actions.MOVE_PLAYED, ({ value, index, innerIndex }) => {
      console.log("move played", value);
      let tempArr = JSON.parse(JSON.stringify(arr.current));
      console.log(tempArr);
      tempArr[index][innerIndex] = value;
      setBoardArr(tempArr);
      arr.current[index][innerIndex] = value;
      setCurrentPlayer(username);
      toast.success("It's your chance");
    });

    socket.on(Actions.PLAYER_WON, ({ username }) => {
      setUserWon(true);
      setPlayerWon(username);
    });

    socket.on(Actions.ROOM_FULL, () => {
      toast.error("Room is full");
      navigate("/");
    });

    return () => {
      socket.off(Actions.USER_JOIN);
      socket.off(Actions.USER_JOINED);
      socket.off(Actions.DISCONNECTED);
      socket.off(Actions.MOVE_PLAYED);
      socket.off(Actions.PLAYER_WON);
      socket.off(Actions.ROOM_FULL);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Choose One Symbol!</h3>
            <div className="flex gap-2 mt-4">
              <div
                className="bg-neutral hover:bg-base-300 cursor-pointer flex items-center p-6"
                onClick={() => setUserSymbol("X")}
              >
                <GiCrossMark className="text-2xl" />
              </div>
              <div
                className="bg-neutral hover:bg-base-300 cursor-pointer flex items-center p-6"
                onClick={() => setUserSymbol("O")}
              >
                <FaRegCircle className="text-2xl" />
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog" className="border">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      }
      {userWon ? (
        <div className="flex">
          <h1 className="text-4xl bg-green-500 text-white p-4 rounded">
            {playerWon === username ? "You won" : `${playerWon} won`}
          </h1>
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />
        </div>
      ) : (
        <div>
          {boardArr.map((el, index) => (
            <div className="flex justify-center items-center gap-1">
              {el.map((innerEl, innerIndex) => {
                const val = uuidv4();
                return (
                  <Square
                    key={val}
                    id={val}
                    value={innerEl}
                    index={index}
                    innerIndex={innerIndex}
                    insertSymbol={insertSymbol}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
