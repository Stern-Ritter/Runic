import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import Preview from "./src/screens/preview";
import Activity from "./src/screens/activity-list";
import Map from "./src/components/map/map";

export default function App() {
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    // <Preview />
    // <Activity />
    <Map />
  );
}

const styles = StyleSheet.create({
  container: {},
});
