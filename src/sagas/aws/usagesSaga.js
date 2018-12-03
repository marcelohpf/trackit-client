import { put, call } from 'redux-saga/effects';
import API from '../../api';
import Constants from '../../constants';
import {getAWSAccounts, getToken} from '../misc';

export function* getUsagesReportSaga({dates}) {
	try {
    const token = yield getToken();
    const accounts = yield getAWSAccounts();
    const res = yield call(API.AWS.Usages.getUsages, token, dates, accounts);
    if (res.success && res.hasOwnProperty("data") && !res.data.hasOwnProperty("error"))
      yield put({ type: Constants.AWS_GET_USAGES_DATA_SUCCESS, report: res.data });
    else if (res.success && res.data.hasOwnProperty("error"))
      throw Error(res.data.error);
    else
      throw Error("Unable to retrieve report");
	} catch (error) {
    yield put({ type: Constants.AWS_GET_USAGES_DATA_ERROR, error });
	}
}
