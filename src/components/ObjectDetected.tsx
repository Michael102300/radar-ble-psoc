import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { useProvider } from "../providers/provider";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;

interface IProps {
  distanceBLE: number;
  degressBLE: number;
}
// 255 0
// 105 180
const ObjectDetected = ({ degressBLE, distanceBLE }: IProps) => {
  const degressObject = (-5 / 6) * degressBLE + 255;
  const distance = (121 / 195) * distanceBLE - 710 / 39;
  const rotateIndicator = `${degressObject}deg`;
  const transformRotate = {
    transform: [{ rotate: rotateIndicator }],
  };
  return (
    <View key="container_object_detect" style={[styles.mover, transformRotate]}>
      <View key="container_object_detect_range" style={[styles.indicator]} />
      <View
        key="object_detect"
        style={{
          width: 20,
          height: 20,
          backgroundColor: "blue",
          borderRadius: 10,
          marginTop: distanceBLE,
        }}
      />
    </View>
  );
};

export default ObjectDetected;

const styles = StyleSheet.create({
  mover: {
    position: "absolute",
    width: SIZE * 0.89,
    height: SIZE * 0.89,
    borderRadius: (SIZE * 0.89) / 2,
    alignItems: "center",
    justifyContent: "flex-start",
    left: SIZE * 0.085,
    top: 40,
    backgroundColor: "transparent",
  },
  indicator: {
    height: "50%",
    marginTop: "8%",
    width: 2,
    borderRadius: 8,
  },
});
