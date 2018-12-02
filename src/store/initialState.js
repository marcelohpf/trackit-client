import moment from "moment";

export default {
  aws: {
    accounts: {
      all: {
        status: false
      },
      creation: {
        status: true,
        value: null
      },
      billCreation: {
        status: true,
        value: null
      },
      billsStatus: {
        status: false
      },
      billEdition: {
        status: true,
        value: null
      },
      external: null,
      accountViewers: {status: true, value: null},
      addAccountViewer: {status: true, value: null},
      editAccountViewer: {status: true, value: null}
    },
    s3: {
      dates: {
        startDate: moment().subtract(1, 'months').startOf('month'),
        endDate: moment().subtract(1, 'months').endOf('month')
      },
      values: {}
    },
    map: {
      dates: {
        startDate: moment().subtract(1, 'months').startOf('month'),
        endDate: moment().subtract(1, 'months').endOf('month')
      },
      values: {},
      filter: "region"
    },
    costs: {
      charts: {},
      values: {},
      dates: {},
      interval: {},
      filter: {}
    },
    tags: {
      charts: {},
      dates: {},
      filters: {},
      keys: {},
      values: {}
    },
    reports: {
      account: '',
      download: {
        failed: false,
      },
      reportList: {
        status: false,
        values: []
      }
    },
    resources: {
      dates: {
        startDate: moment().startOf('months'),
        endDate: moment().endOf('months')
      },
      EC2: {
        status: true,
        value: null
				},
				RDS: {
        status: true,
        value: null
      }
    },
		reserves: {
      dates: {
        startDate: moment().startOf('months'),
        endDate: moment().endOf('months')
      },
			RI: {
				status: true,
				value: null
			}
		},
  },
  events: {
    dates: {
      startDate: moment().subtract(30, 'days'),
      endDate : moment(),
    },
    values: {}
  },
  gcp: {},
  dashboard: {
    items: {},
    values: {},
    intervals: {},
    filters: {},
    dates: {
      startDate: moment().subtract(1, 'month').startOf('month'),
      endDate: moment().subtract(1, 'month').endOf('month')
    }
  },
  highlevel: {
    dates: {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    },
    costs: {},
    events: {},
    tags: {
      keys: {},
      selected: null,
      costs: {}
    },
    unused: {
      ec2: {},
    },
  },
  auth: {
    token: null,
    mail: null,
    recoverStatus: {status: true, value: null},
    renewStatus: {status: true, value: null}
  },
};
