import { combineReducers } from "redux";
import activitiesReducer from "./activities";
import mapReducer from "./map";
import authenticationReducer from "./login";
import createUserReducer from "./create-account";
import settingsReducer from "./profile";

export const rootReducer = combineReducers({
  createUserForm: createUserReducer,
  authenticationForm: authenticationReducer,
  map: mapReducer,
  activities: activitiesReducer,
  settings: settingsReducer,
});
