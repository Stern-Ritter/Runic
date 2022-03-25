import { LocationObjectCoords } from "expo-location";

class Activity {
  id: string;
  name: string;
  time: number;
  distance: number;
  date: number;
  coords: LocationObjectCoords[];

  constructor(option: ActivityOptions) {
    const { id, name, time, distance, date, coords } = option;
    this.id = typeof id !== "undefined" ? id : "";
    this.name = name;
    this.time = time;
    this.distance = distance;
    this.date = date;
    this.coords = coords;
  }
}

export default Activity;
