import { createContext, useState } from "react";

interface children {
  children: JSX.Element;
}

interface Props {
  volume: number;
  setVolume: (newVolume: number) => void;
}

export const VolumeContext = createContext<Props>({
  volume: 0.1,
  setVolume: () => {},
});

export const VolumeProvider: React.FC<children> = ({children}) => {
  const [volume, setVolume] = useState(0.1);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};
