import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Platform, StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapMarker from "../../components/map-marker/map-marker";
import Activity from "../../models/activity/Activity";
import {
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
  createActivity,
} from "../../services/actions";
import { State } from "../../services/store/store";
import formatTime from "../../utils/formatTime";

const geoPositionUpdateInterval = 1000;
const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";
const fetchLocationOptions = {
  accuracy: Location.Accuracy.Highest,
  distanceInterval: 1, // minimum change (in meters) betweens updates
  deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
  foregroundService: {
    notificationTitle: "Using your location",
    notificationBody:
      "To turn off, go back to the app and switch something off.",
  },
};

function Map() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [startGeoPosition, setStartGeoPosition] =
    useState<Location.LocationObjectCoords>();
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();

  const getStartGeoPosition = async () => {
    try {
      const geoPosition = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });
      setStartGeoPosition(geoPosition.coords);
    } catch (err) {
      Alert.alert("Ошибка.", "Невозможно определить местоположение.");
    }
  };

  useEffect(() => {
    getStartGeoPosition();
  }, []);

  TaskManager.defineTask(
    TASK_FETCH_LOCATION,
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(locations);
      const [location] = locations;
      dispatch({ type: ADD_COORDINATE, payload: location });
    }
  );

  const {
    isStarted,
    isPaused,
    indicators: { createdDate, distance, calories },
    coords,
  } = useSelector((store: State) => store.map);

  const lastGeoPosition = useMemo(() => coords[coords.length - 1], [coords]);

  const updateTimer = () => {
    setDuration((prevState) => prevState + geoPositionUpdateInterval);
  };

  const startHandler = async () => {
    dispatch({ type: START_ACTIVITY });
    dispatch({ type: ADD_COORDINATE, payload: startGeoPosition });
    Location.startLocationUpdatesAsync(
      TASK_FETCH_LOCATION,
      fetchLocationOptions
    );
    const timerIntervalId = setInterval(updateTimer, 1000);
    setTimerInterval(timerIntervalId);
  };

  const pauseHandler = () => {
    dispatch({ type: PAUSE_ACTIVITY });
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then(
      (task) => {
        if (task) {
          Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
        }
      }
    );
    if (timerInterval) clearInterval(timerInterval);
  };

  const resumeHandler = async () => {
    dispatch({ type: RESUME_ACTIVITY });
    Location.startLocationUpdatesAsync(
      TASK_FETCH_LOCATION,
      fetchLocationOptions
    );
    const timerIntervalId = setInterval(updateTimer, 1000);
    setTimerInterval(timerIntervalId);
  };

  const finishHandler = () => {
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then(
      (task) => {
        if (task) {
          Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
        }
      }
    );
    if (timerInterval) clearInterval(timerInterval);
    const activity = new Activity({
      name: "Бег",
      createdDate,
      duration,
      distance,
      calories,
      coords,
    });
    dispatch(createActivity("testUID", activity));
    setDuration(0);
  };

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
      {startGeoPosition && (
        <>
          <MapView
            style={{ position: "relative", flex: 6 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: lastGeoPosition?.latitude || startGeoPosition.latitude,
              longitude:
                lastGeoPosition?.longitude || startGeoPosition.longitude,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0015,
            }}
            // onRegionChangeComplete={}
          >
            {isStarted && coords.length > 0 && (
              <Marker
                coordinate={{
                  latitude: coords[0].latitude,
                  longitude: coords[0].longitude,
                }}
              >
                <MapMarker>Старт</MapMarker>
              </Marker>
            )}

            {!isStarted && coords.length > 0 && (
              <Marker
                coordinate={{
                  latitude: coords[coords.length - 1].latitude,
                  longitude: coords[coords.length - 1].longitude,
                }}
              >
                <MapMarker>Финиш</MapMarker>
              </Marker>
            )}

            <Polyline
              coordinates={coords}
              strokeColor={"#4169E1"}
              strokeWidth={10}
              lineDashPattern={[1]}
            />
          </MapView>

          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 0,
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isStarted && <Button onPress={startHandler} title="Старт" />}
            {isStarted && !isPaused && (
              <Button onPress={pauseHandler} title="Пауза" />
            )}
            {isPaused && <Button onPress={resumeHandler} title="Продолжить" />}
            {isStarted && <Button onPress={finishHandler} title="Завершить" />}
          </View>
        </>
      )}
    </>
  );
}

export default Map;