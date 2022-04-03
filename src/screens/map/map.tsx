import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Alert,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
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
import { auth } from "../../models/storage";
import {
  TASK_FETCH_CURRENT_LOCATION,
  TASK_FETCH_LOCATION,
  fetchCurrentLocationOptions,
  fetchLocationOptions,
} from "../../utils/location";
import { formatTime } from "../../utils/date";
import { MEDIUM_STATE_BLUE_COLOR } from "../../utils/colors";
import styles from "./map.styles";

const timerUpdateInterval = 1000;

function Map() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [foregroundStatus, requestForegroundPermission] =
    Location.useForegroundPermissions();
  const [backgroundStatus, requesBackgroundPermission] =
    Location.useBackgroundPermissions();

  const [duration, setDuration] = useState(0);
  const [startGeoPosition, setStartGeoPosition] =
    useState<Location.LocationObjectCoords>();
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();

  TaskManager.defineTask(
    TASK_FETCH_CURRENT_LOCATION,
    async ({ data, error }) => {
      if (error) return;
      const [location] = (
        data as { locations: { coords: Location.LocationObjectCoords }[] }
      ).locations;
      setStartGeoPosition(location.coords);
    }
  );

  TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data, error }) => {
    if (error) return;
    const [location] = (
      data as { locations: { coords: Location.LocationObjectCoords }[] }
    ).locations;
    dispatch({ type: ADD_COORDINATE, payload: location.coords });
  });

  const getForegroundPermissions = async () => {
    await requestForegroundPermission();
  };
  const getBackgroundPermissions = async () => {
    await requesBackgroundPermission();
  };

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
    getForegroundPermissions();
    getBackgroundPermissions();
    Location.enableNetworkProviderAsync();
    getStartGeoPosition();
    Location.startLocationUpdatesAsync(
      TASK_FETCH_CURRENT_LOCATION,
      fetchCurrentLocationOptions
    );
  }, []);

  const {
    isStarted,
    isPaused,
    indicators: { createdDate, distance, calories },
    coords,
  } = useSelector((store: State) => store.map);

  const lastGeoPosition = useMemo(() => coords[coords.length - 1], [coords]);

  const updateTimer = () => {
    setDuration((prevState) => prevState + timerUpdateInterval);
  };

  const startHandler = async () => {
    dispatch({ type: START_ACTIVITY });
    dispatch({ type: ADD_COORDINATE, payload: startGeoPosition });
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_CURRENT_LOCATION).then(
      (task) => {
        if (task)
          Location.stopLocationUpdatesAsync(TASK_FETCH_CURRENT_LOCATION);
      }
    );
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
        if (task) Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
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
        if (task) Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
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
    if (user?.uid) {
      dispatch(createActivity(user.uid, activity));
      setDuration(0);
      Location.startLocationUpdatesAsync(
        TASK_FETCH_CURRENT_LOCATION,
        fetchCurrentLocationOptions
      );
    }
  };

  return !(foregroundStatus?.granted && backgroundStatus?.granted) ? (
    <View style={styles.errorContainer}>
      <Text style={styles.error}>
        Для работы с картой предоставьте приложению доступ к геопозиции.
      </Text>
    </View>
  ) : (
    <View style={styles.main}>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <View style={styles.indicatorContainer}>
            <FontAwesome5
              name="stopwatch"
              size={24}
              color={MEDIUM_STATE_BLUE_COLOR}
              style={styles.indicatorIcon}
            />
            <Text style={styles.indicator}>{formatTime(duration)}</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <FontAwesome5
              name="map-marker-alt"
              size={24}
              color={MEDIUM_STATE_BLUE_COLOR}
              style={styles.indicatorIcon}
            />
            <Text style={styles.indicator}>{`${distance.toFixed(2)} km`}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.indicatorContainer}>
            <FontAwesome5
              name="running"
              size={24}
              color={MEDIUM_STATE_BLUE_COLOR}
              style={styles.indicatorIcon}
            />
            <Text style={styles.indicator}>
              {`${(distance / (duration / 3600000) || 0).toFixed(2)} km/h`}
            </Text>
          </View>
          <View style={styles.indicatorContainer}>
            <FontAwesome5
              name="burn"
              size={24}
              color={MEDIUM_STATE_BLUE_COLOR}
              style={styles.indicatorIcon}
            />
            <Text style={styles.indicator}>{`${calories.toFixed(0)} cal`}</Text>
          </View>
        </View>
      </View>

      {startGeoPosition ? (
        <>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={{
                latitude:
                  lastGeoPosition?.latitude || startGeoPosition.latitude,
                longitude:
                  lastGeoPosition?.longitude || startGeoPosition.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
              }}
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
                strokeColor={MEDIUM_STATE_BLUE_COLOR}
                strokeWidth={10}
                lineCap="butt"
                lineJoin="bevel"
              />
            </MapView>
          </View>

          <View style={styles.buttons}>
            {!isStarted && (
              <TouchableOpacity onPress={startHandler} style={styles.button}>
                <Text style={styles.buttonText}>Начать</Text>
              </TouchableOpacity>
            )}

            {isStarted && !isPaused && (
              <TouchableOpacity onPress={pauseHandler} style={styles.button}>
                <Text style={styles.buttonText}>Пауза</Text>
              </TouchableOpacity>
            )}

            {isPaused && (
              <TouchableOpacity onPress={resumeHandler} style={styles.button}>
                <Text style={styles.buttonText}>Продолжить</Text>
              </TouchableOpacity>
            )}

            {isStarted && (
              <TouchableOpacity onPress={finishHandler} style={styles.button}>
                <Text style={styles.buttonText}>Завершить</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={MEDIUM_STATE_BLUE_COLOR}
        />
      )}
    </View>
  );
}

export default Map;
