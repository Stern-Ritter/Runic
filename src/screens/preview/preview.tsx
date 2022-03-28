import React from "react";
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./preview.styles";

interface PreviewScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

function Preview({ navigation }: PreviewScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={require("../../assets/images/rune.png")}></Image>
        <Text style={styles.title}>Welcome to Runic.</Text>
        <Text style={styles.description}>The best app for running.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('CreateAccount');
      }}>
        <Text style={styles.buttonText}>Регистрация</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('Login');
      }}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Preview;
