import { settingsStorage } from "../../models/storage";
import Settings from "../../models/settings/Settings";
import { AppDispatch } from "../store/store";

export const GET_SETTINGS = "GET_SETTINGS";
export const GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS";
export const GET_SETTINGS_FAILED = "GET_SETTINGS_FAILED";
export const SETTINGS_FORM_SET_VALUE = "SETTINGS_FORM_SET_VALUE";

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const UPDATE_SETTINGS_FAILED = "UPDATE_SETTINGS_FAILED";

export const setSettingsFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | number
}) => ({
  type: SETTINGS_FORM_SET_VALUE,
  payload: { field, value },
} as const );

export type ISETTINGS_FORM_SET_VALUE = ReturnType<
  typeof setSettingsFormValue
>;

export function getSettings(userUID: string) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_SETTINGS });
    try {
      const settings: Settings | null = await settingsStorage.get(userUID);
      if (settings !== null) {
        dispatch({ type: GET_SETTINGS_SUCCESS, payload: settings });
      } else {
        dispatch({ type: GET_SETTINGS_FAILED });
      }
    } catch (err) {
      dispatch({ type: GET_SETTINGS_FAILED });
    }
  };
}

export function updateSettings(userUID: string, settings: Settings) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_SETTINGS });
    try {
      const success = await settingsStorage.update(userUID, settings);
      if (success) {
        dispatch({ type: UPDATE_SETTINGS_SUCCESS, payload: settings });
      } else {
        dispatch({ type: UPDATE_SETTINGS_FAILED });
      }
    } catch (err) {
      dispatch({ type: UPDATE_SETTINGS_FAILED });
    }
  };
}
