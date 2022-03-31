import Settings from "../../models/settings/Settings";

import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILED,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILED,
} from "../actions";

type IGET_SETTINGS = {
  type: "GET_SETTINGS";
};

type IGET_SETTINGS_SUCCESS = {
  type: "GET_SETTINGS_SUCCESS";
  payload: Settings;
};

type IGET_SETTINGS_FAILED = {
  type: "GET_SETTINGS_FAILED";
};

type IUPDATE_SETTINGS = {
  type: "UPDATE_SETTINGS";
};

type IUPDATE_SETTINGS_SUCCESS = {
  type: "UPDATE_SETTINGS_SUCCESS";
  payload: Settings;
};

type IUPDATE_SETTINGS_FAILED = {
  type: "UPDATE_SETTINGS_FAILED";
};

type SETTINGS_ACTION =
  | IGET_SETTINGS
  | IGET_SETTINGS_SUCCESS
  | IGET_SETTINGS_FAILED
  | IUPDATE_SETTINGS
  | IUPDATE_SETTINGS_SUCCESS
  | IUPDATE_SETTINGS_FAILED;

const settingsInitialState = {
  settings: {
    loading: false,
    hasError: false,
    data: {} as Settings,
  },
  updateSettingsRequest: false,
  updateSettingsFailed: false,
};

const settingsReducer = (
    state = settingsInitialState,
    action: SETTINGS_ACTION
) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: true,
          hasError: false,
        },
      };
    }
    case GET_SETTINGS_SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          data: action.payload,
        },
      };
    }
    case GET_SETTINGS_FAILED: {
      return {
        ...state,
        settings: {
          ...state.settings,
          loading: false,
          hasError: true,
        },
      };
    }
    case UPDATE_SETTINGS: {
      return {
        ...state,
        updateSettingsRequest: true,
        updateSettingsFailed: false,
      };
    }
    case UPDATE_SETTINGS_SUCCESS: {
      return {
        ...state,
        updateSettingsRequest: false,
        settings: {
          ...state.settings,
          data: action.payload,
        },
      };
    }
    case UPDATE_SETTINGS_FAILED: {
      return {
        ...state,
        updateSettingsRequest: false,
        updateSettingsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default settingsReducer;
