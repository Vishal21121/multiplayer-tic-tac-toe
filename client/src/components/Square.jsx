import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { useUserContext } from "../context/UserContext";

const Square = ({ id, value, insertSymbol, index, innerIndex }) => {
  const { currentPlayer, username } = useUserContext();
  console.log(currentPlayer, username);
  return (
    <div
      className={`my-1 w-32 h-32 max-h-32 max-w-32 rounded-md flex justify-center items-center btn ${
        currentPlayer !== username ? "btn-disabled" : ""
      }`}
      id={id}
      onClick={() => insertSymbol(value, index, innerIndex)}
    >
      {value === "X" && <GiCrossMark className="text-3xl" />}
      {value === "O" && <FaRegCircle className="text-3xl" />}
    </div>
  );
};

export default Square;
