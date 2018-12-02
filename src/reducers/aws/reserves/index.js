import { combineReducers } from 'redux';
import RI from './riReducer';
import dates from './datesReducer';

export default combineReducers({
	dates,
	RI,
})
