import { combineReducers } from "redux";
import activitiesReducer from "./activities";
import mapReducer from "./map";
import authenticationReducer from "./authentication-from";
import createUserReducer from "./create-user-form";
import settingsReducer from "./settings";

export const rootReducer = combineReducers({
  createUserForm: createUserReducer,
  authenticationForm: authenticationReducer,
  map: mapReducer,
  activities: activitiesReducer,
  settings: settingsReducer,
});
