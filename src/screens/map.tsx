import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { getDistance, getPreciseDistance } from "geolib";
import Loading from "../components/loading/loading";
import {
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
  SET_INDICATORS,
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

  const lastPostion = useMemo(() => coords[0], [coords]);

  const updateIndicators = async () => {
    try {
      const res = await Location.getCurrentPositionAsync({
        accuracy: 6,
        distanceInterval: 5,
      });

      const currentCoords = res.coords;
      dispatch({ type: ADD_COORDINATE, payload: currentCoords });
      const updatedDuration = Date.now() - createdDate;
      const updatedDistance =
        distance +
        (coords.length < 2
          ? 0
          : getDistance(
              {
                latitude: coords[coords.length - 1].latitude,
                longitude: coords[coords.length - 1].longitude,
              },
              {
                latitude: coords[coords.length - 2].latitude,
                longitude: coords[coords.length - 2].longitude,
              }
            ));
      const updatedCalories = updatedDistance * 70;

      dispatch({
        type: SET_INDICATORS,
        payload: {
          createdDate,
          duration: updatedDuration,
          distance: updatedDistance,
          calories: updatedCalories,
        },
      });
    } catch (err) {
      Alert.alert("Невозможно определить местоположение.", "Ошибка.");
    }
  };

  useEffect(() => {
    updateIndicators();
    const interValId = setInterval(() => {
      updateIndicators();
    }, 5000);
    return () => clearInterval(interValId);
  }, []);

  return (
    <>
      <Text style={{ flex: 1, marginTop: 30, marginLeft: 40 }}>
        {`
        Количество координат: ${coords.length}
        Время: ${formatTime(duration)}
        Расстояние: ${distance}
        Калории: ${calories}
        `}
      </Text>
      {coords.length === 0 ? (
        <Loading />
      ) : (
        <MapView
          style={{ flex: 6 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: lastPostion.latitude,
            longitude: lastPostion.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
          }}
        >
          <Marker
            pinColor="green"
            coordinate={{
              latitude: coords[0].latitude,
              longitude: coords[0].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
          {coords.map(
            (coord, idx, arr) =>
              idx > 1 && (
                <Polyline
                  key={idx}
                  coordinates={[
                    { latitude: coord.latitude, longitude: coord.longitude },
                    {
                      latitude: arr[idx - 1].latitude,
                      longitude: arr[idx - 1].longitude,
                    },
                  ]}
                  strokeColor={"#000"}
                  strokeWidth={3}
                  lineDashPattern={[1]}
                />
              )
          )}
        </MapView>
      )}
    </>
  );
}

export default Map;
