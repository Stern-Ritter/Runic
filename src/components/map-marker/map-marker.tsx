import React from "react";
import { View, Text, StyleSheet } from "react-native";

function MapMarker({children} : {children: string}) {
  return (
    <View style={styles.marker}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#007bff",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    color: "#fff",
  },
});

export default MapMarker;
