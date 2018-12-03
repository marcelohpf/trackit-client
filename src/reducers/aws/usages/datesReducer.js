import Constants from '../../../constants';

export default (state={}, action) => {
  switch (action.type) {
    case Constants.AWS_SET_USAGES_DATES:
      return action.dates;
    case Constants.AWS_CLEAR_USAGES_DATES:
      return {};
    default:
      return state;
  }
};
