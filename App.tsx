import React, { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInNavigation from "./src/navigators/logged-in-nav";
import LoggedOutNavigation from "./src/navigators/logged-out-nav";
import { store } from "./src/services/store/store";
import { auth } from "./src/models/storage";
import "intl";
import "intl/locale-data/jsonp/ru";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  const onLoading = async () => {
    const fontsToLoad = [FontAwesome5.font];
    const imagesToLoad = [require("./src/assets/images/rune.png")];
    const fontsPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesPromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all([...fontsPromises, ...imagesPromises]);
  };
  const onFinish = () => {
    setLoading(false);
  };

  return loading ? (
    <AppLoading
      startAsync={onLoading}
      onFinish={onFinish}
      onError={console.warn}
    />
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <LoggedInNavigation /> : <LoggedOutNavigation />}
      </NavigationContainer>
    </Provider>
  );
}
