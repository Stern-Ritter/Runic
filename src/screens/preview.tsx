import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./preview.styles";

function Preview() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={require("../assets/images/rune.png")}></Image>
        <Text style={styles.title}>Welcome to Runic.</Text>
        <Text style={styles.description}>The best app for running.</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Начать</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Preview;
