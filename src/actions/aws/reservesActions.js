import Constants from '../../constants';

export default {
	get: {
		RI: (dates) => ({type: Constants.AWS_RESERVES_GET_RESERVED, dates}),
	},
	clear: {
		RI: () => ({type: Constants.AWS_RESERVES_GET_RESERVED_CLEAR}),
	},
	setDates: (startDate, endDate) => ({
		type: Constants.AWS_RESERVES_SET_DATES,
		dates: {startDate, endDate}
	}),
	clearDates: () => ({type: Constants.AWS_RESERVES_RESET_DATES}),
	resetDates: () => ({type: Constants.AWS_RESERVES_CLEAR_DATES}),
};
