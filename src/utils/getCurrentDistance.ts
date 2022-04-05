import { getDistance } from "geolib";
import { LocationObjectCoords } from "expo-location";

function getCurrentDistance(
  distance: number,
  prevCoords: LocationObjectCoords,
  currentCoords: LocationObjectCoords
) {
  const currentDistance =
    distance +
    getDistance(
      {
        latitude: prevCoords.latitude,
        longitude: prevCoords.longitude,
      },
      {
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
      }
    ) /
      1000;
  return currentDistance;
}

export default getCurrentDistance;
