import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import styles from "./login.styles";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

function Login({ navigation }: LoginScreenProps) {
  return (
    <View>
      <Text>Вход в аккаунт</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("CreateAccount");
        }}
      >
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
