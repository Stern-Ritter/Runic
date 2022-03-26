import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { weatherApiKey } from "./constants";
import Loading from "./Loading";
import Weather from "./Weather";

export default function App() {
  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [status, requestPermission] = Location.useForegroundPermissions();

  async function getWeather(latitude, longitude) {
    const { data } =
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
    &lon=${longitude}&appid=${weatherApiKey}&units=metric`);
    setWeather(data);
    setIsLoading(false);
  }

  async function getCurrentCoords() {
    try {
      await requestPermission();
      const { coords } = await Location.getCurrentPositionAsync();
      getWeather(coords.latitude, coords.longitude);
    } catch (err) {
      Alert.alert("Не могу определить местоположение.", "Очень грустно...");
    }
  }

  useEffect(() => {
    getCurrentCoords();
  }, []);

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <Weather
      temp={Math.round(weather.main.temp)}
      condition={weather.weather[0].main}
    ></Weather>
  );
}

const styles = StyleSheet.create({
  container: {},
});
