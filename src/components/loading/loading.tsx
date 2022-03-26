import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#DCDCDC",
  },
  text: {
    color: "#2C2C2C",
    fontSize: 30,
  },
});

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"></StatusBar>
      <Text style={styles.text}>Загрузка...</Text>
    </View>
  );
}
