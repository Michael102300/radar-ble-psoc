import * as ScreenOrientation from "expo-screen-orientation";
import Tabs from "./src/components/Tab";

export default function App() {
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  ).then();
  return (
    <>
      <Tabs />
    </>
  );
}
