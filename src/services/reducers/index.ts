import { combineReducers } from 'redux';
import activityReducer from './activity';

export const rootReducer = combineReducers({
    activity: activityReducer
});
