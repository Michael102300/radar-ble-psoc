import * as ScreenOrientation from "expo-screen-orientation";
import Tabs from "./src/components/Tab";
import { Provider } from "./src/providers/provider";
import RadarPage from "./src/pages/RadarPage";
import { View } from "react-native";

export default function App() {
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  ).then();
  return (
    <Provider>
      <RadarPage />
    </Provider>
  );
}
