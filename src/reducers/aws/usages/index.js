import { combineReducers } from 'redux';
import discounted from './discountedUsagesReducer';
import usage from './usagesReducer';
import dates from './datesReducer';

export default combineReducers({
	discounted,
	usage,
	dates,
});

