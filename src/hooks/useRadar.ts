import { useProvider } from "../providers/provider";
import useBLE from "./useBLE";

const useRadar = () => {
  const provider = useProvider();
  const degress = (currentDegree: number): string => {
    if (!currentDegree) {
      return "0deg";
    } else {
      const degrees = -Number(currentDegree) + 90;
      return `${degrees}deg`;
    }
  };

  const positionObject = () => {
    let left;
    const distance = 400;
    const degress = 45;
    const rad = (degress * Math.PI) / 180;
    const recta1 = (-7 / 10) * distance + 322;
    const recta2 = (-307 / 390) * distance + 12982 / 39;
    if (degress >= 0 && degress <= 90) {
      left = distance * Math.sin(degress) + recta2;
    }
    const top = distance * Math.cos(rad) + recta1;
    console.log(
      left,
      top,
      degress,
      Math.sin(degress),
      Math.cos(degress),
      Math.cos(rad)
    );
    return {
      top,
      left,
    };
  };

  return {
    degress,
    positionObject,
  };
};

export default useRadar;
