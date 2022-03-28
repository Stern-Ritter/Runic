import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Preview from "../screens/preview/preview";
import Login from "../screens/login/login";
import CreateAccount from "../screens/create-account/create-account";

function LoggedOutNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false
      }}
    >
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Войти",
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: "Регистрация",
        }}
      />
    </Stack.Navigator>
  );
}

export default LoggedOutNavigation;
