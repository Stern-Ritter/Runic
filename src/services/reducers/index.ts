import { combineReducers } from 'redux';
import activityReducer from './map';

export const rootReducer = combineReducers({
    activity: activityReducer
});
