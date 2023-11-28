import React from "react";
import { View, Text } from "react-native";

const Radar = () => {
  return (
    <View style={{ display: "flex", alignItems: "center", marginTop: "-5%" }}>
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: "transparent",
          borderRadius: 60,
          marginTop: "10%",
          position: "absolute",
          top: 230,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
      <View
        style={{
          width: 220,
          height: 220,
          backgroundColor: "transparent",
          borderRadius: 110,
          marginTop: "10%",
          position: "absolute",
          top: 170,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: "transparent",
          borderRadius: 150,
          marginTop: "10%",
          position: "absolute",
          top: 120,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
      <View
        style={{
          width: 400,
          height: 400,
          backgroundColor: "transparent",
          borderRadius: 200,
          marginTop: "10%",
          position: "absolute",
          top: 80,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
      <View
        style={{
          width: 500,
          height: 500,
          backgroundColor: "transparent",
          borderRadius: 250,
          marginTop: "10%",
          position: "absolute",
          top: 40,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
      <View
        style={{
          width: 600,
          height: 600,
          backgroundColor: "transparent",
          borderRadius: 300,
          marginTop: "10%",
          position: "absolute",
          top: 1,
          borderWidth: 4,
          borderStyle: "dotted",
          borderBlockColor: "black",
        }}
      ></View>
    </View>
  );
};

export default Radar;
