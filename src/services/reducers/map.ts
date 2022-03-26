import { LocationObjectCoords } from "expo-location";

import {
  START_ACTIVITY,
  PAUSE_ACTIVITY,
  RESUME_ACTIVITY,
  ADD_COORDINATE,
  SET_INDICATORS,
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

interface ISET_INDICATORS {
  type: "SET_INDICATORS";
  payload: ActivityIndicators;
}

type MAP_ACTION =
  | ISTART_ACTIVITY
  | IPAUSE_ACTIVITY
  | IRESUME_ACTIVITY
  | IADD_COORDINATE
  | ISET_INDICATORS;

const mapInitialState = {
  isStarted: false,
  isPaused: false,
  indicators: {
    createdDate: 0,
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
      return {
        ...state,
        coords: [...state.coords, action.payload],
      };
    }
    case SET_INDICATORS: {
      return {
        ...state,
        indicators: {
          ...state.indicators,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default mapReducer;
