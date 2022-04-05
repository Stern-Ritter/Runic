import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedInNavigation from "./src/navigators/logged-in-nav";
import LoggedOutNavigation from "./src/navigators/logged-out-nav";
import { store } from "./src/services/store/store";
import { auth } from "./src/models/storage";
import "intl";
import "intl/locale-data/jsonp/ru";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <LoggedInNavigation /> : <LoggedOutNavigation />}
      </NavigationContainer>
    </Provider>
  );
}
