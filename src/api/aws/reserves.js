import { call } from "../misc";

export const getRI = (token, dates, accounts=undefined) => {
  let route = `/ri?begin=${dates.startDate.format("YYYY-MM-DD")}&end=${dates.endDate.format("YYYY-MM-DD")}`;
  if (accounts && accounts.length)
    route += `&accounts=${accounts.join(',')}`;
  return call(route, 'GET', null, token);
};
