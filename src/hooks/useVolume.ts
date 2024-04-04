import { useContext } from "react";
import { VolumeContext } from "../context/VolumeContext";

export const useVolume = () => {
  const { volume, setVolume } = useContext(VolumeContext);

  const changeVolume = () => {
    if (volume === 0.1) return setVolume(0);
    return setVolume(0.1);
  };

  return { volume, changeVolume };
};
