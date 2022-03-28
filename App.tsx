import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import Preview from "./src/screens/preview";
import ActivityList from "./src/screens/activity-list";
import Map from "./src/screens/map";
import { store } from "./src/services/store/store";

export default function App() {
  const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requesBackgroundPermission] = Location.useBackgroundPermissions();

  useEffect(() => {
    getForPerm();
    getBackPerm();    
    Location.enableNetworkProviderAsync();
  }, []);

  const getForPerm = async () => {
    const res = await requestForegroundPermission();
    console.log('for', res);
  }
  const getBackPerm = async () => {
    const res = await requesBackgroundPermission()
    console.log('back', res);
  }

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
