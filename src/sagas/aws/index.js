import { takeEvery, takeLatest, fork, cancel } from 'redux-saga/effects';
import * as AccountsSaga from './accountsSaga';
import * as BillsSaga from './billsSaga';
import * as AccountViewersSaga from './accountViewersSaga';
import { getCostsSaga, saveChartsSaga, loadChartsSaga, initChartsSaga, clearChartsSaga } from "./costsSaga";
import { getS3DataSaga, saveS3DatesSaga, loadS3DatesSaga, cleanS3DatesSaga } from './s3Saga';
import { getReportsSaga, clearReportsSaga, downloadReportSaga } from './reportsSaga';
import { getEC2ReportSaga, getRDSReportSaga } from './resourcesSaga';
import { getRIReportSaga, } from './reservesSaga';
import { getUsagesReportSaga, } from './usagesSaga';
import { getMapCostsSaga } from './mapSaga';
import { getTagsKeysSaga, getTagsValuesSaga, initTagsChartsSaga, loadTagsChartsSaga, saveTagsChartsSaga, cleanTagsChartsSaga } from './tagsSaga';
import Constants from '../../constants';

export function* watchGetAccounts() {
  yield takeLatest(Constants.AWS_GET_ACCOUNTS, AccountsSaga.getAccountsSaga);
  yield takeLatest(Constants.AWS_GET_ACCOUNTS, clearReportsSaga);
}

export function* watchGetAccountBills() {
  yield takeLatest(Constants.AWS_GET_ACCOUNT_BILLS, BillsSaga.getAccountBillsSaga);
}

export function* watchNewAccount() {
  yield takeLatest(Constants.AWS_NEW_ACCOUNT, AccountsSaga.newAccountSaga);
}

export function* watchNewAccountBill() {
  yield takeLatest(Constants.AWS_NEW_ACCOUNT_BILL, BillsSaga.newAccountBillSaga);
}

export function* watchEditAccount() {
  yield takeLatest(Constants.AWS_EDIT_ACCOUNT, AccountsSaga.editAccountSaga);
}

export function* watchEditAccountBill() {
  yield takeLatest(Constants.AWS_EDIT_ACCOUNT_BILL, BillsSaga.editAccountBillSaga);
}

export function* watchDeleteAccount() {
  yield takeLatest(Constants.AWS_DELETE_ACCOUNT, AccountsSaga.deleteAccountSaga);
}

export function* watchDeleteAccountBill() {
  yield takeLatest(Constants.AWS_DELETE_ACCOUNT_BILL, BillsSaga.deleteAccountBillSaga);
}

export function* watchNewExternal() {
  yield takeLatest(Constants.AWS_NEW_EXTERNAL, AccountsSaga.newExternalSaga);
}

export function* watchSaveSelectedAccounts() {
  yield takeEvery(Constants.AWS_SELECT_ACCOUNT, AccountsSaga.saveSelectedAccountSaga);
  yield takeEvery(Constants.AWS_CLEAR_ACCOUNT_SELECTION, AccountsSaga.saveSelectedAccountSaga);
}

export function* watchLoadSelectedAccounts() {
  yield takeLatest(Constants.AWS_LOAD_SELECTED_ACCOUNTS, AccountsSaga.loadSelectedAccountSaga);
}

export function* watchGetCosts() {
  yield takeEvery(Constants.AWS_GET_COSTS, accumulateGetCostsSaga);
}

// To manage concurrency when multiple calls are fired for the same id
let tasks = {};

function* accumulateGetCostsSaga(action) {
  const {id, type} = action;
  if (!tasks[type]) tasks[type] = {};

  if (tasks[type][id]) {
    yield cancel(tasks[type][id]);
  }
  tasks[type][id] = yield fork(getCostsSaga, action);
}

export function* watchSaveCharts() {
  yield takeEvery(Constants.AWS_ADD_CHART, saveChartsSaga);
  yield takeEvery(Constants.AWS_REMOVE_CHART, saveChartsSaga);
  yield takeEvery(Constants.AWS_SET_COSTS_DATES, saveChartsSaga);
  yield takeEvery(Constants.AWS_RESET_COSTS_DATES, saveChartsSaga);
  yield takeEvery(Constants.AWS_SET_COSTS_INTERVAL, saveChartsSaga);
  yield takeEvery(Constants.AWS_RESET_COSTS_INTERVAL, saveChartsSaga);
  yield takeEvery(Constants.AWS_SET_COSTS_FILTER, saveChartsSaga);
  yield takeEvery(Constants.AWS_RESET_COSTS_FILTER, saveChartsSaga);
}

export function* watchLoadCharts() {
  yield takeLatest(Constants.AWS_LOAD_CHARTS, loadChartsSaga);
}

export function* watchInitCharts() {
  yield takeLatest(Constants.AWS_INIT_CHARTS, initChartsSaga);
}

export function* watchClearCharts() {
  yield takeEvery(Constants.AWS_CLEAR_CHARTS, clearChartsSaga);
}

export function* watchGetAwsS3Data() {
  yield takeLatest(Constants.AWS_GET_S3_DATA, getS3DataSaga);
}

export function* watchSaveS3Dates() {
  yield takeEvery(Constants.AWS_SET_S3_DATES, saveS3DatesSaga);
}

export function* watchCleanS3Dates() {
  yield takeEvery(Constants.AWS_CLEAR_S3_DATES, cleanS3DatesSaga);
}

export function* watchLoadS3Data() {
  yield takeLatest(Constants.AWS_LOAD_S3_DATES, loadS3DatesSaga);
}

export function* watchGetReports() {
  yield takeLatest(Constants.AWS_GET_REPORTS_REQUESTED, getReportsSaga);
}

export function* watchSelectReports() {
  yield takeLatest(Constants.AWS_REPORTS_ACCOUNT_SELECTION, clearReportsSaga);
}

export function* watchDownloadReport() {
  yield takeLatest(Constants.AWS_DOWNLOAD_REPORT_REQUESTED, downloadReportSaga);
}

export function* watchGetEC2Report() {
  yield takeLatest(Constants.AWS_RESOURCES_GET_EC2, getEC2ReportSaga);
}

export function* watchGetRDSReport() {
  yield takeLatest(Constants.AWS_RESOURCES_GET_RDS, getRDSReportSaga);
}

export function* watchGetRIReport() {
	yield takeLatest(Constants.AWS_RESERVES_GET_RESERVED, getRIReportSaga);
}

export function* watchGetUsageReport() {
	yield takeLatest(Constants.AWS_GET_USAGES_DATA, getUsagesReportSaga);
}

export function* watchGetMapCosts() {
  yield takeLatest(Constants.AWS_MAP_GET_COSTS, getMapCostsSaga);
}

export function* watchGetTagsKeys() {
  yield takeEvery(Constants.AWS_TAGS_GET_KEYS, getTagsKeysSaga);
}

export function* watchGetTagsValues() {
  yield takeEvery(Constants.AWS_TAGS_GET_VALUES, getTagsValuesSaga);
}

export function* watchInitTagsCharts() {
  yield takeLatest(Constants.AWS_TAGS_INIT_CHARTS, initTagsChartsSaga);
}

export function* watchLoadTagsCharts() {
  yield takeLatest(Constants.AWS_TAGS_LOAD_CHARTS, loadTagsChartsSaga);
}

export function* watchSaveTagsCharts() {
  yield takeEvery(Constants.AWS_TAGS_ADD_CHART, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_REMOVE_CHART, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_SET_DATES, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_RESET_DATES, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_SET_FILTER, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_RESET_FILTERS, saveTagsChartsSaga);
  yield takeEvery(Constants.AWS_TAGS_CLEAR_FILTERS, saveTagsChartsSaga);
}

export function* watchCleanTagsCharts() {
  yield takeEvery(Constants.AWS_TAGS_CLEAN_CHARTS, cleanTagsChartsSaga);
}

export function* watchGetAccountBillStatus() {
  yield takeLatest(Constants.AWS_GET_ACCOUNT_BILL_STATUS, BillsSaga.getAccountBillStatusSaga)
}

export function* getAccountViewers() {
  yield takeLatest(Constants.AWS_GET_ACCOUNT_VIEWERS, AccountViewersSaga.getAccountViewers)
}

export function* addAccountViewer() {
  yield takeLatest(Constants.AWS_ADD_ACCOUNT_VIEWER, AccountViewersSaga.addAccountViewer)
}

export function* editAccountViewer() {
  yield takeLatest(Constants.AWS_EDIT_ACCOUNT_VIEWER, AccountViewersSaga.editAccountViewer)
}

export function* deleteAccountViewer() {
  yield takeLatest(Constants.AWS_DELETE_ACCOUNT_VIEWER, AccountViewersSaga.deleteAccountViewer)
}
