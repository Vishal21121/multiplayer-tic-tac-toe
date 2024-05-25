import React, { useState, useRef, useEffect } from "react";
import Square from "./Square";
import { v4 as uuidv4 } from "uuid";
import { GiCrossMark } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

const GameBoard = () => {
  const arr = useRef(new Array(3).fill().map(() => new Array(3).fill("")));
  const [boardArr, setBoardArr] = useState(arr.current);
  const [userSymbol, setUserSymbol] = useState("");

  const insertSymbol = (id, index, innerIndex) => {
    let tempArr = JSON.parse(JSON.stringify(boardArr));
    if (!id) {
      tempArr[index][innerIndex] = userSymbol;
      setBoardArr(tempArr);
      console.log(tempArr);
    } else {
      console.log("not empty");
    }
  };

  useEffect(() => {
    document.getElementById("my_modal_5").showModal();
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
    </div>
  );
};

export default GameBoard;
