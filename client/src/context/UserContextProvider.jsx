import React, { useState } from "react";
import { UserContext } from "./UserContext";

function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [remoteUser, setRemoteUser] = useState("");
  const [localMark, setLocalMark] = useState("");
  const [remoteMark, setRemoteMark] = useState("");
  const [isRoomCreate, setIsRoomCreate] = useState(true);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        currentPlayer,
        setCurrentPlayer,
        remoteUser,
        setRemoteUser,
        localMark,
        setLocalMark,
        remoteMark,
        setRemoteMark,
        isRoomCreate,
        setIsRoomCreate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
