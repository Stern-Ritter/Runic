import { LocationObjectCoords } from "expo-location";
import getCurrentDistance from "../../utils/getCurrentDistance";

import {
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
} from "../actions";

interface ISTART_ACTIVITY {
  type: "START_ACTIVITY";
}

interface IPAUSE_ACTIVITY {
  type: "PAUSE_ACTIVITY";
}

interface IRESUME_ACTIVITY {
  type: "RESUME_ACTIVITY";
}

interface IADD_COORDINATE {
  type: "ADD_COORDINATE";
  payload: LocationObjectCoords;
}

type MAP_ACTION =
  | ISTART_ACTIVITY
  | IPAUSE_ACTIVITY
  | IRESUME_ACTIVITY
  | IADD_COORDINATE;

const mapInitialState = {
  isStarted: false,
  isPaused: false,
  indicators: {
    createdDate: Date.now(),
    duration: 0,
    distance: 0,
    calories: 0,
  },
  coords: [] as LocationObjectCoords[],
};

const mapReducer = (state = mapInitialState, action: MAP_ACTION) => {
  switch (action.type) {
    case START_ACTIVITY: {
      return {
        ...state,
        isStarted: true,
        indicators: {
          ...state.indicators,
          createdDate: Date.now(),
        },
      };
    }
    case PAUSE_ACTIVITY: {
      return {
        ...state,
        isPaused: true,
      };
    }
    case RESUME_ACTIVITY: {
      return {
        ...state,
        isPaused: false,
      };
    }
    case ADD_COORDINATE: {
      const coords = [...state.coords, action.payload];
      const distance =
        coords.length < 2
          ? 0
          : getCurrentDistance(
              state.indicators.distance,
              coords[coords.length - 2],
              coords[coords.length - 1]
            );
      const calories = distance * 70;
      return {
        ...state,
        indicators: {
          ...state.indicators,
          duration: Date.now() - state.indicators.createdDate,
          distance,
          calories,
        },
        coords,
      };
    }
    default: {
      return state;
    }
  }
};

export default mapReducer;
