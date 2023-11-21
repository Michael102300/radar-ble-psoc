import React from "react";
import { View, StyleSheet, Text } from "react-native";
import useBLE from "../hooks/useBLE";
import Button from "../components/Button";

const ConnectBLEPage = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    sendData,
  } = useBLE();

  const scanForDevice = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      scanForPeripherals();
    }
  };
  return (
    <View
      style={{
        flex: 1,
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
  );
};
export default ConnectBLEPage;
