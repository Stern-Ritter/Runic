import { LocationObjectCoords } from "expo-location";

class Activity {
  id: string;
  name: string;
  createdDate: number;
  duration: number;
  distance: number;
  calories: number;
  coords: LocationObjectCoords[];

  constructor(option: ActivityOptions) {
    const { id, name, createdDate, duration, distance, calories, coords } =
      option;
    this.id = typeof id !== "undefined" ? id : "";
    this.name = name;
    this.createdDate = createdDate;
    this.duration = duration;
    this.distance = distance;
    this.calories = calories;
    this.coords = coords;
  }
}

export default Activity;
