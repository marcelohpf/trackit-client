import Constants from '../../constants';

export default {
	getData: (dates) => ({
		type: Constants.AWS_GET_USAGES_DATA,
		dates
	}),
	setDates: (startDate, endDate) => ({
		type: Constants.AWS_SET_USAGES_DATES,
		dates: {
			startDate,
      endDate
		}
	}),
	clearDates: () => ({type: Constants.AWS_CLEAR_S3_DATES})
};
