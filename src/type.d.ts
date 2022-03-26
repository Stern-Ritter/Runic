type ActivityOptions = {
  id?: string;
  name: string;
  createdDate: number;
  duration: number;
  distance: number;
  calories: number;
  coords: LocationObjectCoords[];
};

type ActivityIndicators = {
  createdDate: number;
  duration: number;
  distance: number;
  calories: 0;
};
