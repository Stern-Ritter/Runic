import * as Location from "expo-location";

const TASK_FETCH_CURRENT_LOCATION = "TASK_FETCH_CURRENT_LOCATION ";
const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";

const fetchCurrentLocationOptions = {
    accuracy: Location.Accuracy.High,
    distanceInterval: 5, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 3000, // minimum interval (in milliseconds) between updates
    foregroundService: {
      notificationTitle: "Используется геолокация.",
      notificationBody: "Геолокация необходима для отслеживания тренировки.",
    },
  };

const fetchLocationOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 3, // minimum change (in meters) betweens updates
  deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
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