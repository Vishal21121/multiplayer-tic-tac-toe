import React, { useState, useRef, useEffect } from "react";
import Square from "./Square";
import { v4 as uuidv4 } from "uuid";
import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import { Actions } from "../utils/Actions";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import ConfettiExplosion from "react-confetti-explosion";
import { toast } from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";
import { useSocketContext } from "../context/SocketContext";

const GameBoard = () => {
  const arr = useRef(new Array(3).fill().map(() => new Array(3).fill("")));
  const [boardArr, setBoardArr] = useState(arr.current);
  const { roomId } = useParams();
  const {
    username,
    setCurrentPlayer,
    remoteUser,
    localMark,
    setLocalMark,
    remoteMark,
  } = useUserContext();
  const [playerWon, setPlayerWon] = useState("");
  const [userWon, setUserWon] = useState(false);
  const navigate = useNavigate();
  const { socketio: socket } = useSocketContext();

  const insertSymbol = (value, index, innerIndex) => {
    let tempArr = JSON.parse(JSON.stringify(arr.current));
    if (!value) {
      socket.emit(Actions.MOVE_PLAYED, {
        value: localMark,
        index,
        innerIndex,
        roomId,
      });
      setCurrentPlayer(remoteUser);
      tempArr[index][innerIndex] = localMark;
      arr.current[index][innerIndex] = localMark;
      setBoardArr(tempArr);
      const isWon = haveWon(tempArr);
      const isEmpty = arr.current.some((el) => el.some((el) => el === ""));
      if (!isWon && !isEmpty) {
        console.log("went inside");
        document.getElementById("my_modal_1").showModal();
      } else if (isWon) {
        setUserWon(true);
        setPlayerWon(username);
        socket.emit(Actions.PLAYER_WON, { roomId, username });
        document.getElementById("my_modal_1").showModal();
      }
    } else {
      console.log("not empty");
    }
  };

  const haveWon = (boardArr) => {
    // check the rows
    for (let index = 0; index < boardArr.length; index++) {
      if (
        boardArr[index][0] === localMark &&
        boardArr[index][1] === localMark &&
        boardArr[index][2] === localMark
      ) {
        return true;
      }
    }
    // check for cols
    for (let index = 0; index < boardArr[0].length; index++) {
      if (
        boardArr[0][index] === localMark &&
        boardArr[1][index] === localMark &&
        boardArr[2][index] === localMark
      ) {
        return true;
      }
    }
    //   for diagnols
    if (
      boardArr[0][0] === localMark &&
      boardArr[1][1] === localMark &&
      boardArr[2][2] === localMark
    ) {
      return true;
    }
    if (
      boardArr[2][0] === localMark &&
      boardArr[1][1] === localMark &&
      boardArr[0][2] === localMark
    ) {
      return true;
    }
    return false;
  };

  const resetGame = () => {
    arr.current = new Array(3).fill().map(() => new Array(3).fill(""));
    setBoardArr(arr.current);
    setPlayerWon("");
    setUserWon(false);
    socket.emit(Actions.GAME_RESET, { roomId });
    document.getElementById("my_modal_1").close();
  };

  useEffect(() => {
    console.log({ username, remoteUser, localMark, remoteMark });
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

    socket.on(Actions.GAME_RESET, () => {
      arr.current = new Array(3).fill().map(() => new Array(3).fill(""));
      setBoardArr(arr.current);
      setPlayerWon("");
      setUserWon(false);
    });

    return () => {
      socket.off(Actions.MOVE_PLAYED);
      socket.off(Actions.PLAYER_WON);
      socket.off(Actions.ROOM_FULL);
      socket.off(Actions.GAME_RESET);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Choose One Symbol!</h3>
            <div className="flex gap-2 mt-4">
              <div
                className={`${
                  localMark === "X" ? "bg-base-300" : "bg-neutral"
                } hover:bg-base-300 cursor-pointer flex items-center p-6`}
                onClick={(e) => {
                  setLocalMark("X");
                }}
              >
                <ImCross className="text-2xl text-white" />
              </div>
              <div
                className={`${
                  localMark === "O" ? "bg-base-300" : "bg-neutral"
                } hover:bg-base-300 cursor-pointer flex items-center p-6`}
                onClick={() => setLocalMark("O")}
              >
                <FaDotCircle className="text-2xl text-white" />
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
      {
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div
              className="flex gap-1 bg-gray-900 w-fit p-4 rounded-lg items-center cursor-pointer"
              onClick={() => resetGame()}
            >
              <h3 className="font-bold text-lg">Reset!</h3>
              <GrPowerReset className="text-2xl" />
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
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
      {userWon ? (
        ""
      ) : (
        <div className="flex gap-2 mt-4 items-center">
          <div className="flex flex-col items-center">
            <p className="text-lg">You</p>
            <div
              className={`${
                localMark === "X" ? "bg-base-300" : "bg-neutral"
              } cursor-pointer flex items-center p-6`}
            >
              {localMark === "X" ? (
                <ImCross className="text-2xl text-white" />
              ) : (
                <FaDotCircle className="text-2xl text-white" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg">Opponent</p>
            <div
              className={`${
                localMark === "O" ? "bg-base-300" : "bg-neutral"
              } hover:bg-base-300 cursor-pointer flex items-center p-6`}
            >
              {remoteMark === "X" ? (
                <ImCross className="text-2xl text-white" />
              ) : (
                <FaDotCircle className="text-2xl text-white" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
