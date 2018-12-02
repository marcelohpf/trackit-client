import Constants from '../../../constants';

const defaultValue = {status: true, value: null};

export default (state=defaultValue, action) => {
  switch (action.type) {
    case Constants.AWS_RESERVES_GET_RESERVED_CLEAR:
      return defaultValue;
    case Constants.AWS_RESERVES_GET_RESERVED:
      return {status: false};
    case Constants.AWS_RESERVES_GET_RESERVED_SUCCESS:
      return {status: true, value: action.report};
    case Constants.AWS_RESERVES_GET_RESERVED_ERROR:
      return {status: true, error: action.error};
    default:
      return state;
  }
};
