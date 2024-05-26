import React, { useState } from "react";
import { UserContext } from "./UserContext";

function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [remoteUser, setRemoteUser] = useState("");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        currentPlayer,
        setCurrentPlayer,
        remoteUser,
        setRemoteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
