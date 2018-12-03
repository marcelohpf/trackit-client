import { call, } from "../misc";

export const getUsages = (token, dates, accounts) => {
	const route = `/ri/discount?begin=${dates.startDate.format("YYYY-MM-DD")}&end=${dates.endDate.format("YYYY-MM-DD")}`
	return call(route, 'GET', null, token);
}


