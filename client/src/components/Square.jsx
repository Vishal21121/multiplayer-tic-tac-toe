import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaDotCircle } from "react-icons/fa";
import { useUserContext } from "../context/UserContext";

const Square = ({ id, value, insertSymbol, index, innerIndex }) => {
  const { currentPlayer, username } = useUserContext();
  return (
    <div
      className={`my-1 w-32 h-32 max-h-32 max-w-32 rounded-md flex justify-center items-center btn ${
        currentPlayer !== username ? "btn-disabled" : ""
      }`}
      id={id}
      onClick={() => insertSymbol(value, index, innerIndex)}
    >
      {value === "X" && <ImCross className="text-4xl text-white" />}
      {value === "O" && <FaDotCircle className="text-4xl text-blue-500" />}
    </div>
  );
};

export default Square;
