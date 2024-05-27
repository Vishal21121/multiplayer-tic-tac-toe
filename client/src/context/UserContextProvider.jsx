import React, { useState } from "react";
import { UserContext } from "./UserContext";

function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [remoteUser, setRemoteUser] = useState("");
  const [localMark, setLocalMark] = useState("");
  const [remoteMark, setRemoteMark] = useState("");

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
