import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, Easing } from "react-native";
import { Animated } from "react-native";
import styles from "./preview.styles";

interface PreviewScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

function Preview({ navigation }: PreviewScreenProps) {
  const spinValue = new Animated.Value(0);

  Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.sin,
    useNativeDriver: true,
  }).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
      <Animated.Image 
        style={{...styles.image, transform: [{rotate: spin}]}} 
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
