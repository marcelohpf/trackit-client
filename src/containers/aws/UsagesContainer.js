import React, { Component } from 'react';
import {connect} from 'react-redux';
import Components from '../../components';
import PropTypes from "prop-types";
import Actions from "../../actions";

const Panel = Components.Misc.Panel;
const TimerangeSelector = Components.Misc.TimerangeSelector;
const DiscountedUsages = Components.AWS.Usages.DiscountedUsages;
const Usages = Components.AWS.Usages.Usages;
const PieCharts = Components.AWS.Usages.PieCharts;
const Infos = Components.AWS.Usages.Infos;

export class UsagesContainer extends Component {

	componentWillMount = () => {
		this.props.getData(this.props.dates);
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.dates !== this.props.dates) {
			this.props.getData(nextProps.dates);
		}
	}

	render() {
		const timerange = (this.props.dates ?  (
			<TimerangeSelector
				startDate={this.props.dates.startDate}
				endDate={this.props.dates.endDate}
				setDatesFunc={this.props.setDates}
			/>
			) : null);
		return (
      <Panel>
        <div className="clearfix">
          <h3 className="white-box-title no-padding inline-block">
						<i className="fa fa-list-alt" />
						&nbsp;
            Resources
          </h3>
          <div className="inline-block pull-right">
						{timerange}
          </div>
        </div>
				<Infos usage={this.props.usages.usage} discounted={this.props.usages.discounted} />
				<PieCharts usage={this.props.usages.usage} discounted={this.props.usages.discounted} />
				<Usages data={this.props.usages.usage} />
				<DiscountedUsages data={this.props.usages.discounted} />
      </Panel>
		);
	}
}

UsagesContainer.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  dates: PropTypes.object,
  setDates: PropTypes.func.isRequired,
  resetDates: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({aws}) => ({
  dates: aws.usages.dates,
  accounts: aws.accounts.selection,
	usages: aws.usages,
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  getData: (dates) => {
    dispatch(Actions.AWS.Usages.getData(dates))
  },
  setDates: (start, end) => {
    dispatch(Actions.AWS.Usages.setDates(start, end));
  },
  resetDates: () => {
    dispatch(Actions.AWS.Usages.resetDates());
  },
  clearDates: () => {
    dispatch(Actions.AWS.Usages.clearDates());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsagesContainer);
