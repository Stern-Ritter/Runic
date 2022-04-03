import * as Location from "expo-location";

const TASK_FETCH_CURRENT_LOCATION = "TASK_FETCH_CURRENT_LOCATION ";
const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";

const fetchCurrentLocationOptions = {
    accuracy: Location.Accuracy.High,
    distanceInterval: 5,
    deferredUpdatesInterval: 3000,
    foregroundService: {
      notificationTitle: "Используется геолокация.",
      notificationBody: "Геолокация необходима для отслеживания тренировки.",
    },
  };

const fetchLocationOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 3,
  deferredUpdatesInterval: 1000,
  foregroundService: {
    notificationTitle: "Используется геолокация.",
    notificationBody: "Геолокация необходима для отслеживания тренировки.",
  },
};

export { 
    TASK_FETCH_CURRENT_LOCATION,
    TASK_FETCH_LOCATION,
    fetchCurrentLocationOptions,
    fetchLocationOptions 
};