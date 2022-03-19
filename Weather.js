// import React from "react";
// import { StyleSheet, Text, View, StatusBar } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const weatherOptions = {
//   Thunderstorm: {
//     iconName: "thunderstorm-outline",
//     gradient: ["#141E30", "#243B55"],
//   },
//   Drizzle: {
//     iconName: "rainy-outline",
//     gradient: ["#3a7bd5", "#3a6073"],
//   },
//   Rain: {
//     iconName: "weather-pouring",
//     gradient: ["#000046", "#1CB5E0"],
//   },
//   Snow: {
//     iconName: "snowflake",
//     gradient: ["#83a4d4", "#b6fbff"],
//   },
//   Dust: {
//     iconName: "weather-windy-variant",
//     gradient: ["#B79891", "#94716B"],
//   },
//   Smoke: {
//     iconName: "weather-windy",
//     gradient: ["#56CCF2", "#2F80ED"],
//   },
//   Haze: {
//     iconName: "weather-hazy",
//     gradient: ["#3E5151", "#DECBA4"],
//   },
//   Mist: {
//     iconName: "weather-fog",
//     gradient: ["#606c88", "#3f4c6b"],
//   },
//   Clear: {
//     iconName: "weather-sunny",
//     gradient: ["#56CCF2", "#2F80ED"],
//   },
//   Clouds: {
//     iconName: "weather-cloudy",
//     gradient: ["#757F9A", "#D7DDE8"],
//   },
// };

// export default function Weather({ temp, condition }) {
//   console.log(condition);
//   return (
//     <LinearGradient style={styles.container} colors={weatherOptions[condition].gradient}>
//       <StatusBar barStyle="light-content"></StatusBar>
//       <View style={styles.halfContainer}>
//         <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={92} color="white" />
//         <Text style={styles.temp}>{temp}°</Text>
//       </View>
//       <View style={{...styles.halfContainer, ...styles.textContainer}}>
//         <Text style={styles.title}>Заголовок</Text>
//         <Text style={styles.subtitle}>Подзаголовок</Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   halfContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   textContainer: {
//     paddingHorizontal: 20,
//     alignItems: "flex-start"
//   },
//   temp: {
//     fontSize: 32,
//     color: "white",
//   },
//   title: {
//     color: "white",
//     fontSize: 44,
//     fontWeight: "300",
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 24,
//   },
// });
