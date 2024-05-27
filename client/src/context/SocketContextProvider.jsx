import React, { useState } from "react";
import { SocketContext } from "./SocketContext";

function SocketContextProvider({ children }) {
  const [socketio, setSocketio] = useState("");
  return (
    <SocketContext.Provider value={{ socketio, setSocketio }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;
