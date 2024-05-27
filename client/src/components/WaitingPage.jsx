import React, { useEffect, useState } from "react";
import { randomAvatarGenerator } from "../utils/randomAvatar";
import { useUserContext } from "../context/UserContext";
import { useSocketContext } from "../context/SocketContext";
import { Actions } from "../utils/Actions";

function WaitingPage() {
  const [avatar_1, setAvatar_1] = useState("");
  const [avatar_2, setAvatar_2] = useState("");
  const { remoteUser } = useUserContext();

  useEffect(() => {
    const avatar_1 = randomAvatarGenerator();
    const avatar_2 = randomAvatarGenerator();
    setAvatar_1(avatar_1);
    setAvatar_2(avatar_2);
  }, []);

  return (
    <div className="w-2/4 mt-16 ring-8 rounded  ring-blue-500 mx-auto flex flex-col items-center gap-1 h-[80vh]">
      <h1 className="text-3xl my-4 font-extrabold">
        {remoteUser ? "Another player joined" : "Waiting for another player"}
      </h1>
      <div className="flex p-4 items-center h-[60%] justify-between gap-12">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-2xl font-bold">Player - 1</p>
          <img src={avatar_1} className="w-36 h-36" alt="" />
        </div>
        {/* skeleton */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl font-bold">Player - 2</p>
          {remoteUser ? (
            <img src={avatar_2} className="w-36 h-36" alt="" srcset="" />
          ) : (
            <div className="skeleton w-36 h-36 rounded-full shrink-0"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingPage;
