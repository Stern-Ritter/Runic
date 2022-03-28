import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Platform, StyleSheet, Text, View, Button } from "react-native";
import {
  watchPositionAsync,
  getCurrentPositionAsync,
  LocationObjectCoords,
  LocationSubscription,
} from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapMarker from "../components/map-marker/map-marker";
import Activity from "../models/activity/Activity";
import {
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
  createActivity,
} from "../services/actions";
import { State } from "../services/store/store";
import formatTime from "../utils/formatTime";

const geoPositionUpdateInterval = 1000;

function Map() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [startGeoPosition, setStartGeoPosition] =
    useState<LocationObjectCoords>();
  const [locationSubscription, setLocationSubscription] =
    useState<LocationSubscription>();
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();

  const getStartGeoPosition = useCallback(async () => {
    try {
      const geoPosition = await getCurrentPositionAsync({ accuracy: 4 });
      setStartGeoPosition(geoPosition.coords);
    } catch (err) {
      Alert.alert("Ошибка.", "Невозможно определить местоположение.");
    }
  }, [dispatch, getCurrentPositionAsync]);

  useEffect(() => {
    getStartGeoPosition();
  }, []);

  const {
    isStarted,
    isPaused,
    indicators: { createdDate, distance, calories },
    coords,
  } = useSelector((store: State) => store.map);

  const lastGeoPosition = useMemo(() => coords[coords.length - 1], [coords]);

  // const updateGeoPosition = useCallback(async () => {
  //   try {
  //     const geoPosition = await getCurrentPositionAsync({
  //       accuracy: 5,
  //       distanceInterval: 3,
  //     });
  //     dispatch({ type: ADD_COORDINATE, payload: geoPosition.coords});
  //   }
  //   catch (err) {
  //     Alert.alert("Ошибка.", "Невозможно определить местоположение.");
  //   }
  // }, [dispatch, getCurrentPositionAsync]);

  const updateTimer = useCallback(() => {
    setDuration((prevState) => prevState + geoPositionUpdateInterval);
  }, [setDuration]);

  const startHandler = useCallback(async () => {
    dispatch({ type: START_ACTIVITY });
    dispatch({ type: ADD_COORDINATE, payload: startGeoPosition });
    const timerIntervalId = setInterval(updateTimer, 1000);
    setTimerInterval(timerIntervalId);
    const subscription = watchPositionAsync({ accuracy: 5 }, (geoPosition) => {
      dispatch({ type: ADD_COORDINATE, payload: geoPosition.coords });
    });
    const subscriptionObject = await subscription;
    setLocationSubscription(subscriptionObject);
  }, [
    dispatch,
    startGeoPosition,
    setTimerInterval,
    watchPositionAsync,
    setLocationSubscription,
  ]);

  const pauseHandler = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    if (locationSubscription) {
      locationSubscription.remove();
    }
    dispatch({ type: PAUSE_ACTIVITY });
  }, [dispatch, locationSubscription]);

  const resumeHandler = useCallback(async () => {
    dispatch({ type: RESUME_ACTIVITY });
    const timerIntervalId = setInterval(updateTimer, 1000);
    setTimerInterval(timerIntervalId);
    const subscription = watchPositionAsync({ accuracy: 5 }, (geoPosition) => {
      dispatch({ type: ADD_COORDINATE, payload: geoPosition.coords });
    });
    const subscriptionObject = await subscription;
    setLocationSubscription(subscriptionObject);
  }, [dispatch, setTimerInterval, watchPositionAsync, setLocationSubscription]);

  const finishHandler = useCallback(
    (indicators, coords) => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      if (locationSubscription) {
        locationSubscription.remove();
      }
      const { createdDate, duration, distance, calories } = indicators;
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
    },
    [dispatch, createActivity, timerInterval, locationSubscription]
  );

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
            {isStarted && (
              <Button
                onPress={() =>
                  finishHandler(
                    { createdDate, duration, distance, calories },
                    coords
                  )
                }
                title="Завершить"
              />
            )}
          </View>
        </>
      )}
    </>
  );
}

export default Map;
