import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Circle, Svg } from "react-native-svg";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;

const RadarPage = () => {
  const rotateIndicator = "90deg";
  const transformRotate = {
    transform: [{ rotate: rotateIndicator }],
  };
  return (
    <View>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text> Grados</Text>
      </View>
      <View style={[styles.mover, transformRotate]}>
        <View style={[styles.indicator]} />
      </View>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="100"
          r="20"
          stroke="black"
          strokeWidth="0.5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="100"
          r="40"
          stroke="black"
          strokeWidth="0.5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="100"
          r="60"
          stroke="black"
          strokeWidth="0.5"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="100"
          r="80"
          stroke="black"
          strokeWidth="0.5"
          fill="transparent"
        />

        <Circle
          cx="50"
          cy="100"
          r="99"
          stroke="black"
          strokeWidth="0.5"
          fill="transparent"
        />
      </Svg>
    </View>
  );
};

export default RadarPage;

const styles = StyleSheet.create({
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    justifyContent: "flex-start",
    left: "5%",
    top: "-14%",
  },
  indicator: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "40%",
    marginTop: "10%",
    width: 2,
    borderRadius: 8,
  },
});
