import Avatar_1 from "../assets/1.png";
import Avatar_2 from "../assets/2.png";
import Avatar_3 from "../assets/3.png";
import Avatar_4 from "../assets/4.png";

const avatarMaps = {
  "Avatar-1": Avatar_1,
  "Avatar-2": Avatar_2,
  "Avatar-3": Avatar_3,
  "Avatar-4": Avatar_4,
};

export const randomAvatarGenerator = () => {
  const keys = Object.keys(avatarMaps);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const randomAvatar = avatarMaps[randomKey];
  return randomAvatar;
};
