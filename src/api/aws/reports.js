import { call, download } from "../misc";

export const getReports = (token, accountId) => {
  let route = `/reports?account-id=${accountId}`;
  return call(route, 'GET', null, token);
};

export const getReport = (token, accountId, reportType, fileName) => {
  let route = `/report?account-id=${accountId}&report-type=${reportType}&file-name=${fileName}`;
  return download(route, 'GET', null, token, 'application/vnd.ms-excel');
};
