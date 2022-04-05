import React from "react";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "./preview.styles";

function Preview() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/rune.png")}
        />
        <Text style={styles.title}>Runic</Text>
        <Text style={styles.description}>The best app for running.</Text>
        <TouchableOpacity style={styles.button} onPress={goToCreateAccount}>
          <Text style={styles.buttonText}>Регистрация</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Preview;
