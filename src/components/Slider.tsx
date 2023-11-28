import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slider as SliderRN, Text, Icon } from "@rneui/themed";
import useBLE from "../hooks/useBLE";
import { useProvider } from "../providers/provider";

const Slider = ({ velocity }: { velocity: number }) => {
  const [value, setValue] = useState(velocity);
  const { sendData } = useBLE();
  const provider = useProvider();
  const sendValue = () => {
    sendData(provider?.connected, `${value}\r\n`);
    console.log("send", provider?.connected);
  };
  return (
    <View style={[styles.contentView]}>
      <SliderRN
        value={value}
        onValueChange={setValue}
        onSlidingComplete={() => sendValue()}
        maximumValue={7}
        minimumValue={1}
        step={1}
      />
      <Text style={{ position: "absolute", right: "-40%" }}>V: {value}</Text>
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "20%",
    justifyContent: "center",
    alignItems: "stretch",
    position: "absolute",
    zIndex: 50,
  },
  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    height: 500,
    justifyContent: "center",
    alignItems: "stretch",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
});
