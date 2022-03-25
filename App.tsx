import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import Preview from "./src/screens/preview";
import ActivityList from "./src/screens/activity-list";
import Map from "./src/components/map/map";
import store from "./src/services/store/store";

export default function App() {
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Provider store={store}>
      {/* <Preview />
      <Activity /> 
      <Map /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
