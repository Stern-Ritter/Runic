import { combineReducers } from "redux";
import activitiesReducer from "./activities";
import mapReducer from "./map";
import authenticationReducer from "./authentication-from";
import createUserReducer from "./create-user-form";

export const rootReducer = combineReducers({
  createUserForm: createUserReducer,
  authenticationForm: authenticationReducer,
  map: mapReducer,
  activities: activitiesReducer,
});
