import Activity from "../../models/activity/activity";
import { getDateWithoutTimeWithShift } from "../../utils/date";

import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAILED,
  SET_ACTIVITIES_FILTERS,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILED,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAILED,
} from "../actions";

type IGET_ACTIVITIES = {
  type: "GET_ACTIVITIES";
};

type IGET_ACTIVITIES_SUCCESS = {
  type: "GET_ACTIVITIES_SUCCESS";
  payload: Activity[];
};

type IGET_ACTIVITIES_FAILED = {
  type: "GET_ACTIVITIES_FAILED";
};

type IGET_ACTIVITIES_FILTERS = {
  type: "GET_ACTIVITIES_FILTERS";
  payload: {
    startDate?: Date;
    endDate?: Date;
  };
};

type ICREATE_ACTIVITY = {
  type: "CREATE_ACTIVITY";
};

type ICREATE_ACTIVITY_SUCCESS = {
  type: "CREATE_ACTIVITY_SUCCESS";
  payload: Activity;
};

type ICREATE_ACTIVITY_FAILED = {
  type: "CREATE_ACTIVITY_FAILED";
};

type IDELETE_ACTIVITY = {
  type: "DELETE_ACTIVITY";
};

type IDELETE_ACTIVITY_SUCCESS = {
  type: "DELETE_ACTIVITY_SUCCESS";
  payload: string;
};

type IDELETE_ACTIVITY_FAILED = {
  type: "DELETE_ACTIVITY_FAILED";
};

type ACTIVITIES_ACTION =
  | IGET_ACTIVITIES
  | IGET_ACTIVITIES_SUCCESS
  | IGET_ACTIVITIES_FAILED
  | IGET_ACTIVITIES_FILTERS
  | ICREATE_ACTIVITY
  | ICREATE_ACTIVITY_SUCCESS
  | ICREATE_ACTIVITY_FAILED
  | IDELETE_ACTIVITY
  | IDELETE_ACTIVITY_SUCCESS
  | IDELETE_ACTIVITY_FAILED;

const activitiesInitialState = {
  activities: {
    loading: false,
    hasError: false,
    data: [] as Activity[],
  },
  filters: {
    startDate: getDateWithoutTimeWithShift(-7),
    endDate: getDateWithoutTimeWithShift(0),
  },
  createActivityRequest: false,
  createActivityFailed: false,
  deleteActivityRequest: false,
  deleteActivityFailed: false,
};

const activitiesReducer = (
  state = activitiesInitialState,
  action: ACTIVITIES_ACTION
) => {
  switch (action.type) {
    case GET_ACTIVITIES: {
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: true,
          hasError: false,
        },
      };
    }
    case GET_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: false,
          data: action.payload.reverse(),
        },
      };
    }
    case GET_ACTIVITIES_FAILED: {
      return {
        ...state,
        activities: {
          ...state.activities,
          loading: false,
          hasError: true,
        },
      };
    }
    case SET_ACTIVITIES_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }
    case CREATE_ACTIVITY: {
      return {
        ...state,
        createActivityRequest: true,
        createActivityFailed: false,
      };
    }
    case CREATE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        createActivityRequest: false,
        activities: {
          ...state.activities,
          data: [...state.activities.data, action.payload],
        },
      };
    }
    case CREATE_ACTIVITY_FAILED: {
      return {
        ...state,
        createActivityRequest: false,
        createActivityFailed: true,
      };
    }
    case DELETE_ACTIVITY: {
      return {
        ...state,
        deleteActivityRequest: true,
        deleteActivityFailed: false,
      };
    }
    case DELETE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        deleteActivityRequest: false,
        activities: {
          ...state.activities,
          data: [...state.activities.data].filter(
            (activity) => activity.id !== action.payload
          ),
        },
      };
    }
    case DELETE_ACTIVITY_FAILED: {
      return {
        ...state,
        deleteActivityRequest: false,
        deleteActivityFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default activitiesReducer;
