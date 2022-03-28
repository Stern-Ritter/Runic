import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNavigation from "./src/navigators/logged-out-nav";
import LoggedInNavigation from "./src/navigators/logged-in-nav";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { store } from "./src/services/store/store";

// import * as Location from "expo-location";

export default function App() {
  const [loading, setLoading] = useState(true);
  // const [foregroundStatus, requestForegroundPermission] = Location.useForegroundPermissions();
  // const [backgroundStatus, requesBackgroundPermission] = Location.useBackgroundPermissions();

  // useEffect(() => {
  //   getForPerm();
  //   getBackPerm();
  //   Location.enableNetworkProviderAsync();
  // }, []);

  // const getForPerm = async () => {
  //   const res = await requestForegroundPermission();
  //   console.log("for", res);
  // };
  // const getBackPerm = async () => {
  //   const res = await requesBackgroundPermission();
  //   console.log("back", res);
  // };

  const onLoading = () => {
    const fontsToLoad = [FontAwesome5.font];
    const imagesToLoad = [require("./src/assets/images/rune.png")];
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontsPromises, ...imagesPromises]);
  };
  const onFinish = () => {
    setLoading(false);
  };

  return loading ? (
    <AppLoading 
      // @ts-ignore
      startAsync={onLoading}
      onFinish={onFinish}
      onError={console.warn} 
    />
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        {/* <LoggedOutNavigation /> */}
        <LoggedInNavigation />
      </NavigationContainer>
    </Provider>
  );
}
