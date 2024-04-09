import "./styles/VolumeButton.css";
import { useVolume } from "../hooks/useVolume";
import { VolumeActiveIcon, VolumeNonActiveIcon } from "../icons";

export const VolumeButton = () => {
  const { volume, changeVolume } = useVolume();
  const isVolumeActive = volume === 0.1;

  return (
    <button onClick={changeVolume} className="volume-button">
      {isVolumeActive ? <VolumeActiveIcon /> : <VolumeNonActiveIcon />}
    </button>
  );
};
