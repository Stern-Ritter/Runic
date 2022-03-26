import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Platform, StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import MapMarker from "../components/map-marker/map-marker";
import Loading from "../components/loading/loading";
import Activity from "../models/activity/activity";
import { 
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
  createActivity 
} from "../services/actions";
import { State } from "../services/store/store";
import formatTime from "../utils/formatTime";

function Map() {
  const dispatch = useDispatch();
  const {
    isStarted,
    isPaused,
    indicators: { createdDate, duration, distance, calories },
    coords,
  } = useSelector((store: State) => store.map);

  const lastGeoPosition = useMemo(() => coords[coords.length ? coords.length - 1 : 0], [coords]);

  const updateGeoPosition = async () => {
    try {
      const geoPosition = await Location.getCurrentPositionAsync({
        accuracy: 6,
        distanceInterval: 5,
      });

      const currentCoords = geoPosition.coords;
      dispatch({ type: ADD_COORDINATE, payload: currentCoords });
    } catch (err) {
      Alert.alert("Невозможно определить местоположение.", "Ошибка.");
    }
  };

  useEffect(() => {
    updateGeoPosition();
    const interValId = setInterval(() => {
      updateGeoPosition();
    }, 3000);

    return () => clearInterval(interValId);
  }, []);

  const startHandler = useCallback(() => {
    dispatch({ type: START_ACTIVITY });
  }, [dispatch])

  const pauseHandler = useCallback(() => {
    dispatch({ type: PAUSE_ACTIVITY })
  }, [dispatch]);

  const resumeHandler = useCallback(() => {
    dispatch( {type: RESUME_ACTIVITY})
  }, [dispatch]);

  const finishHandler = useCallback((indicators, coords) => {
    const { createdDate, duration, distance, calories } = indicators;
    const activity =  new Activity({
      name: 'Бег',
      createdDate,
      duration,
      distance,
      calories,
      coords,
    })
    createActivity('testUID', activity);
  }, [createActivity]);

  return (
    <>
      <Text style={{ flex: 1, marginTop: 30, marginLeft: 40 }}>
        {`
        Количество координат: ${coords.length}
        Время: ${formatTime(duration)}
        Расстояние: ${distance.toFixed(2)}
        Калории: ${calories.toFixed(0)}
        `}
      </Text>
      {coords.length === 0 ? (
        <Loading />
      ) : (
        <MapView
          style={{ position: "relative", flex: 6 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: lastGeoPosition.latitude,
            longitude: lastGeoPosition.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
          }}
          // onRegionChangeComplete={}
        >
          <Marker
            coordinate={{
              latitude: coords[0].latitude,
              longitude: coords[0].longitude,
            }}
          >
            <MapMarker>Старт</MapMarker>
          </Marker>
          <Polyline coordinates={coords} strokeColor={"#4169E1"} strokeWidth={5} lineDashPattern={[1]} />
        </MapView>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          padding: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button onPress={startHandler} title="Старт"></Button>
        <Button onPress={pauseHandler} title="Пауза"></Button>
        <Button onPress={resumeHandler} title="Продолжить"></Button>
        <Button onPress={() => finishHandler({ createdDate, duration, distance, calories }, coords)}
        title="Завершить"></Button>
      </View>
    </>
  );
}

export default Map;
