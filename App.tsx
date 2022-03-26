import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import Preview from "./src/screens/preview";
import ActivityList from "./src/screens/activity-list";
import Map from "./src/screens/map";
import { store } from "./src/services/store/store";

export default function App() {
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    requestPermission();
    Location.enableNetworkProviderAsync();
  }, []);

  return (
    <Provider store={store}>
      {/* <ActivityList />
      <Preview /> */}
      <Map />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
