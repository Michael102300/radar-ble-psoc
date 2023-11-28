/* eslint-disable no-bitwise */

import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
/* eslint-disable-next-line */
import base64 from "react-native-base64";

import { useProvider } from "../providers/provider";

const BLE_HM_10_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const BLE_HM_10_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

interface BluetoothLowEnergyApi {
  requestPermissions: () => Promise<boolean>;
  scanForPeripherals: () => void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
  sendData: (device: Device | null, data: string) => Promise<void>;
  currentDegree: number;
  currentVelocity: number;
  radarObject: {};
}

let count: number = -1;

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [currentDegree, setCurrentDegree] = useState<number>(0);
  const [currentVelocity, setCurrentVelocity] = useState<number>(1);
  const [radarObject, setRadarObject] = useState<{}>({});
  const provider = useProvider();
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes("BT05")) {
        console.log("deviece", device.name);
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      provider?.setConnected(deviceConnection);
      const characteristic =
        await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log(characteristic);
      bleManager.stopDeviceScan();
      // bleManager.readCharacteristicForDevice(deviceConnection, "", " ");
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  const onVoltsUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }
    const data = base64
      .decode(characteristic.value)
      .replace(" ", "")
      .replace(",\n", "");
    console.log("BLE1:", data);
    // console.log("DATA GRADE ROTATION:", data.split(",")[0]);
    //console.log("DATA DISTANCE:", data.split(",")[1]);
    // console.log("DATA VELOCITY:", data.split(",")[2]);
    const object = {
      distance: Number(data.split(",")[1]),
      degree: Number(data.split(",")[0]),
    };
    setCurrentDegree(Number(data.split(",")[0]));
    setCurrentVelocity(Number(data.split(",")[2]));
    /* f (object.degree === 0) {
      console.log("reset", radarObject);
      setRadarObject([]);
    } */
    if (object.distance > 10 && object.distance < 400) {
      setRadarObject((prevState) => ({
        [object.degree]: object,
      }));
    }
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        BLE_HM_10_UUID,
        BLE_HM_10_CHARACTERISTIC,
        onVoltsUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  const sendData = async (device: Device | null, data: string) => {
    if (device) {
      const dataSend = base64.encode(data);
      await device.writeCharacteristicWithoutResponseForService(
        BLE_HM_10_UUID,
        BLE_HM_10_CHARACTERISTIC,
        dataSend
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    heartRate,
    sendData,
    currentDegree,
    currentVelocity,
    radarObject,
  };
}

export default useBLE;
