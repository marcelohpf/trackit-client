import Accounts from './accountsTypes';
import S3 from './s3Types';
import Costs from './costsTypes';
import Reports from './reportsTypes';
import Map from './mapTypes';
import Resources from './resourcesTypes';
import Tags from './tagsTypes';
import Reserves from './reservesTypes';
import Usages from './usagesTypes';

export default {
	...Accounts,
	...S3,
	...Costs,
	...Reports,
  ...Resources,
  ...Map,
	...Tags,
	...Reserves,
	...Usages,
};
