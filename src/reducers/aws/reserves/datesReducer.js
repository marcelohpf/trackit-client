import Constants from '../../../constants';
import moment from "moment/moment";

const defaultValue = {
  startDate: moment().startOf('months'),
  endDate: moment().endOf('months')
};

export default (state=defaultValue, action) => {
  switch (action.type) {
    case Constants.AWS_RESERVES_SET_DATES:
      return action.dates;
    case Constants.AWS_RESERVES_RESET_DATES:
      return defaultValue;
    case Constants.AWS_RESERVES_CLEAR_DATES:
      return {};
    default:
      return state;
  }
};
