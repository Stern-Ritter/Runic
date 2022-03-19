import React, { useEffect, useState, useMemo} from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Loading from "../loading/loading";

function Map() {
  const [coords, setCoords] = useState([] as Location.LocationObjectCoords[]);
  const lastPostion = useMemo(() => {
    return coords[0];
  }, [coords]);

  const getCurrentCoords = async () => {
    try {
      const res = await Location.getCurrentPositionAsync();
      const currentCoords = res.coords;
      console.log('до', coords.length);
      const newCoords = [...coords];
      newCoords.push(currentCoords);
      console.log('после', newCoords.length);
      
      setCoords(newCoords);
    } catch (err) {
      Alert.alert("Невозможно определить местоположение.", "Ошибка.");
    }
  }

  useEffect(() => {
    getCurrentCoords();
    const interValId = setInterval(() => { getCurrentCoords() }, 7000);
    return () => clearInterval(interValId);
  }, []);

  return (
    <>
      {coords.length === 0 ? (
        <Loading />
      ) : (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: lastPostion.latitude,
            longitude: lastPostion.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
          }}
        />
      )}
    </>
  );
}

export default Map;
