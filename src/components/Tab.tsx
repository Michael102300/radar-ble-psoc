import React from "react";
import { Tab, TabView } from "@rneui/themed";
import ConnectBLEPage from "../pages/ConnectBLEPage";
import RadarPage from "../pages/RadarPage";

const Tabs = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "blue",
          height: 3,
        }}
        variant="primary"
        containerStyle={{ backgroundColor: "white", bottom: 0 }}
      >
        <Tab.Item
          title="Radar"
          titleStyle={{ fontSize: 12, color: "black" }}
          icon={{ name: "locate", type: "ionicon", color: "black" }}
          iconPosition="left"
        />
        <Tab.Item
          title="Config"
          titleStyle={{ fontSize: 12, color: "black" }}
          icon={{ name: "settings", type: "ionicon", color: "black" }}
          iconPosition="left"
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <RadarPage />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "white", width: "100%" }}>
          <ConnectBLEPage />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default Tabs;
