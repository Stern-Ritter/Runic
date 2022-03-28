import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Preview from "../screens/preview/preview";
import Login from "../screens/login/login";
import CreateAccount from "../screens/create-account/create-account";
import { MEDIUM_STATE_BLUE_COLOR } from "../constants/colors";

function LoggedOutNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Войти",
          headerTransparent: true,
          headerTintColor: MEDIUM_STATE_BLUE_COLOR,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: "Регистрация",
          headerTransparent: true,
          headerTintColor: MEDIUM_STATE_BLUE_COLOR,
        }}
      />
    </Stack.Navigator>
  );
}

export default LoggedOutNavigation;
