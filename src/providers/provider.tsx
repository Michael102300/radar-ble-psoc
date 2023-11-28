import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface IProvider {
  connected: any;
  setConnected: Dispatch<SetStateAction<any>>;
  grade: number | undefined;
  setGrade: Dispatch<SetStateAction<number | undefined>>;
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  currentGrade: number;
  setCurrentGrade: Dispatch<SetStateAction<number>>;
  velocity: number;
  setVelocity: Dispatch<SetStateAction<number>>;
  radarObject: {};
  setRadarObject: Dispatch<SetStateAction<{}>>;
}

const Context = createContext<IProvider | undefined>(undefined);

export const Provider = ({ children }: any) => {
  const [connected, setConnected] = useState<any>(false);
  const [grade, setGrade] = useState<number | undefined>(0);
  const [distance, setDistance] = useState<number>(0);
  const [currentGrade, setCurrentGrade] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [radarObject, setRadarObject] = useState<{}>({});
  return (
    <Context.Provider
      value={{
        connected,
        setConnected,
        grade,
        setGrade,
        distance,
        setDistance,
        currentGrade,
        setCurrentGrade,
        velocity,
        setVelocity,
        radarObject,
        setRadarObject,
      }}
      children={children}
    />
  );
};

export const useProvider = () => {
  const provider = useContext<IProvider | undefined>(Context);
  return provider;
};
