import RoomJoin from "./components/RoomJoin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
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
      <Analytics />
    </>
  );
}

export default App;
