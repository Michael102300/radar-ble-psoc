import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import useRadar from "../hooks/useRadar";
import Slider from "../components/Slider";
import Radar from "../components/Radar";
import ObjectDetected from "../components/ObjectDetected";
import useBLE from "../hooks/useBLE";
import Button from "../components/Button";

const { width } = Dimensions.get("screen");
let SIZE = width * 0.9;

const RadarPage = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    currentDegree,
    currentVelocity,
    radarObject,
  } = useBLE();

  const scanForDevice = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      scanForPeripherals();
    }
  };

  const { degress } = useRadar();
  const rotateIndicator = degress(currentDegree);
  const transformRotate = {
    transform: [{ rotate: rotateIndicator }],
  };

  return (
    <>
      <View
        style={{
          marginTop: "2%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button
          title="SCAN"
          backgroundColor="blue"
          disable={Boolean(connectedDevice) || allDevices.length > 0}
          onClick={() => scanForDevice()}
          width={"30%"}
        />
        {allDevices.length > 0 && !connectedDevice && (
          <Button
            key={"scan_device"}
            title={"Connect " + String(allDevices[0]?.name)}
            backgroundColor="red"
            onClick={() => connectToDevice(allDevices[0])}
            width={"50%"}
          />
        )}
        {connectedDevice && (
          <Button
            key={"scan_device"}
            title={"Disconnect " + String(allDevices[0]?.name)}
            backgroundColor="red"
            onClick={() => disconnectFromDevice()}
            width={"50%"}
          />
        )}
      </View>
      <View>
        <View
          style={{
            marginTop: 70,
            marginLeft: 10,
            position: "absolute",
          }}
        >
          <Text> {degress(currentDegree).replace("deg", "")} °</Text>
        </View>
        <View style={[styles.mover, transformRotate]}>
          <View style={[styles.indicator]} />
        </View>
        <Slider velocity={currentVelocity} />
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Object.entries(radarObject).map((val: any, index) => (
            <ObjectDetected
              key={`object_${val[1].degree}_${index}`}
              degressBLE={val[1].degree}
              distanceBLE={val[1].distance}
            />
          ))}
          <Radar />
        </View>
      </View>
    </>
  );
};

export default RadarPage;

const styles = StyleSheet.create({
  mover: {
    position: "absolute",
    width: SIZE * 0.89,
    height: SIZE * 0.89,
    borderRadius: (SIZE * 0.89) / 2,
    alignItems: "center",
    justifyContent: "flex-start",
    left: SIZE * 0.085,
    top: -5,
    backgroundColor: "transparent",
  },
  indicator: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "50%",
    marginTop: "0%",
    width: 2,
    borderRadius: 8,
  },
});
