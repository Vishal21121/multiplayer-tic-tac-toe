import { useState } from "react";
import RoomJoin from "./components/RoomJoin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./components/GameBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomJoin />} />
        <Route path="/room/:roomId" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
