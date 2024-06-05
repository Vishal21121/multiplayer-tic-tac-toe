import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

function RoomJoin() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const {
    setUsername: setName,
    setCurrentPlayer,
    setRemoteUser,
    setIsRoomCreate,
  } = useUserContext();

  const joinRoom = () => {
    const uuid = uuidv4();
    const shortUuid = uuid.replace(/-/g, "").substring(0, 4);
    setName(`user-${shortUuid}`);
    setIsRoomCreate(false);
    navigate(`/room/${shortUuid}`);
  };

  const createRoom = async () => {
    setIsRoomCreate(true);
    const roomId = uuidv4();
    const uuid = uuidv4();
    const shortUuid = uuid.replace(/-/g, "").substring(0, 4);
    await navigator.clipboard.writeText(roomId);
    toast.success("Room id copied");
    setCurrentPlayer(`user-${shortUuid}`);
    setName(`user-${shortUuid}`);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    setName("");
    setCurrentPlayer("");
    setRemoteUser("");
  }, []);

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
