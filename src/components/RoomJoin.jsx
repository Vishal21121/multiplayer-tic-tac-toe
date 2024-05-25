import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function RoomJoin() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");

  const joinRoom = (e) => {
    navigate(`/room/${roomName}`);
  };

  const createRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter room id"
              className="input input-bordered"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => joinRoom()}>
              Join
            </button>
          </div>
          <div className="divider my-0">OR</div>
          <button href="" className="btn" onClick={() => createRoom()}>
            Create a room
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomJoin;
