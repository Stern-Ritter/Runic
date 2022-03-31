type ActivityOptions = {
  id?: string;
  name: string;
  createdDate: Date;
  duration: number;
  distance: number;
  calories: number;
  coords: LocationObjectCoords[];
};

type SettingsOptions = {
  nickName: string;
  distanceGoal: number;
  caloriesGoal: number;
}

type ActivityIndicators = {
  createdDate: number;
  duration: number;
  distance: number;
  calories: 0;
};

type LineChartDataElement = {
  month: string;
  distance: number;
};
