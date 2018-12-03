import Constants from '../../../constants';

const defaultValue = {status: true, value: null};

export default (state=defaultValue, action) => {
	switch (action.type) {
		case Constants.AWS_GET_USAGES_DATA_CLEAR:
			return defaultValue
		case Constants.AWS_GET_USAGES_DATA:
			return {status: false}
		case Constants.AWS_GET_USAGES_DATA_SUCCESS:
			return {status: true, value: action.report.DiscountedUsage}
		case Constants.AWS_GET_USAGES_DATA_ERROR:
			return {status:true, error: action.error}
		default:
			return state
	}
}
