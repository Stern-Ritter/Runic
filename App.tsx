import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Preview from "./src/screens/preview";
import ActivityList from "./src/screens/activity-list";
import Map from "./src/screens/map";
import { store } from "./src/services/store/store";
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  const [backgroundStatus, requesBackgroundPermission] = Location.useBackgroundPermissions();

  useEffect(() => {
    getForPerm();
    getBackPerm();
    Location.enableNetworkProviderAsync();
  }, []);

  const getForPerm = async () => {
    const res = await requestForegroundPermission();
    console.log("for", res);
  };
  const getBackPerm = async () => {
    const res = await requesBackgroundPermission();
    console.log("back", res);
  };

  const onLoading = () => {
    const fontsToLoad = [Ionicons.font];
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    return Promise.all(fontsPromises);
  }
  const onFinish = () => {
    setLoading(false);
  }

  if(loading) {
    <AppLoading 
      startAsync={onLoading}
      onFinish={onFinish}
      onError={console.warn}
    />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Text style={styles.title}>Runic</Text>
      <Provider store={store}>
        {/* <ActivityList />
      <Preview /> */}
        <Map />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  title: {
    flex: 1,
    fontSize: 32,
  }
});
