import React, { useEffect, useState } from "react";
import {
  DimensionValue,
  TouchableOpacity,
  Text,
  ColorValue,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Button as ButtonRNE, Icon } from "@rneui/themed";
import useBLE from "../hooks/useBLE";

interface IButton {
  title?: string;
  backgroundColor?: string;
  onClick?: () => void;
  width?: DimensionValue | undefined;
  disable?: boolean;
}

const ButtonBLE = ({ title, backgroundColor, onClick, disable }: IButton) => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
  } = useBLE();
  const [blink, setBlink] = useState(true);
  var interval: any;
  const blinkStart = () => {
    interval = setInterval(() => {
      setBlink((blink) => !blink);
      connectedBLE();
    }, 1000);
  };
  const scanForDevice = async () => {
    if (allDevices.length > 0 && connectedDevice) {
      disconnectFromDevice();
    } else {
      blinkStart();
      const isPermissionEnabled = await requestPermissions();
      if (isPermissionEnabled) {
        scanForPeripherals();
        connectedBLE();
      }
    }
  };

  const connectedBLE = () => {
    if (allDevices.length > 0 && !connectedDevice) {
      connectToDevice(allDevices[0]);
      clearInterval(interval);
      setBlink(true);
    }
    console.log("try to connect BLE");
  };

  const colorBLE = (): ColorValue => {
    if (allDevices.length > 0 && !connectedDevice) {
      return "red";
    } else if (connectedDevice) {
      return "green";
    } else {
      return "black";
    }
  };

  return (
    <TouchableWithoutFeedback
      style={{ zIndex: -1 }}
      onPress={() => scanForDevice()}
      children={
        <Icon
          name="bluetooth-b"
          type="font-awesome"
          color={blink ? colorBLE() : "gray"}
        />
      }
    />
  );
};
/* <ButtonRNE
title={title}
buttonStyle={{
  backgroundColor: "transparent",
  borderWidth: 2,
  borderColor: "tranparent",
  borderRadius: 30,
  borderBlockColor: "transparent",
}}
containerStyle={{
  width: 450,
  height: 450,
  top: "6%",
  right: "2%",
}}
titleStyle={{ fontWeight: "bold" }}
onPress={() => scanForDevice()}
disabled={disable}
children={<Icon name="bluetooth-b" type="font-awesome" color={"red"} />}
/> */

export default ButtonBLE;
