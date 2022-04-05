import { FINISH_ACTIVITY } from "./map";
import { activitiesStorage } from "../../models/storage";
import Activity from "../../models/activity/Activity";
import { AppDispatch } from "../store/store";

export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_ACTIVITIES_SUCCESS = "GET_ACTIVITIES_SUCCESS";
export const GET_ACTIVITIES_FAILED = "GET_ACTIVITIES_FAILED";
export const SET_ACTIVITIES_FILTERS = "GET_ACTIVITIES_FILTERS";

export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CREATE_ACTIVITY_SUCCESS = "CREATE_ACTIVITY_SUCCESS";
export const CREATE_ACTIVITY_FAILED = "CREATE_ACTIVITY_FAILED";

export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const DELETE_ACTIVITY_SUCCESS = "DELETE_ACTIVITY_SUCCESS";
export const DELETE_ACTIVITY_FAILED = "DELETE_ACTIVITY_FAILED";

export function getActivities(userUID: string) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_ACTIVITIES });
    try {
      const activities: Activity[] | null = await activitiesStorage.getAll(
        userUID
      );
      if (activities !== null) {
        dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: activities });
      } else {
        dispatch({ type: GET_ACTIVITIES_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_ACTIVITIES_FAILED });
    }
  };
}

export function createActivity(userUID: string, activity: Activity) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: CREATE_ACTIVITY });
    try {
      const id = await activitiesStorage.create(userUID, activity);
      if (id !== null) {
        activity.id = id;
        dispatch({ type: CREATE_ACTIVITY_SUCCESS, payload: activity });
        dispatch({ type: FINISH_ACTIVITY });
      } else {
        dispatch({ type: CREATE_ACTIVITY_FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_ACTIVITY_FAILED });
    }
  };
}

export function deleteActivity(userUID: string, id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: DELETE_ACTIVITY });
    try {
      const success = await activitiesStorage.delete(userUID, id);
      if (success) {
        dispatch({ type: DELETE_ACTIVITY_SUCCESS, payload: id });
      } else {
        dispatch({ type: DELETE_ACTIVITY_FAILED });
      }
    } catch (err) {
      dispatch({ type: DELETE_ACTIVITY_FAILED });
    }
  };
}
