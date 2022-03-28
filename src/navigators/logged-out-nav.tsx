import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Preview from "../screens/preview/preview";
import Login from "../screens/login/login";
import CreateAccount from "../screens/create-account/create-account";

function LoggedOutNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Preview"
        component={Preview}
        options={{
          title: "Runic",
        }}
      />
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{
          title: "Аутентификация"
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: "Регистрация"
        }}
      />
    </Stack.Navigator>
  )
}

export default LoggedOutNavigation;