import RoomJoin from "./components/RoomJoin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import PlatForm from "./components/PlatForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<RoomJoin />} />
          <Route path="/room/:roomId" element={<PlatForm />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </>
  );
}

export default App;
