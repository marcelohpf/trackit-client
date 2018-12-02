import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Actions from "../../actions";
import Components from '../../components';

const RIs = Components.AWS.Reserves.RIs;
const Panel = Components.Misc.Panel;
const TimerangeSelector = Components.Misc.TimerangeSelector;

export class ReservesContainer extends Component {
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
						Reservations
					</h3>
					<div className="inline-block pull-right">
						{timerange}
					</div>
				</div>
				<RIs />
			</Panel>);
	}
}

ReservesContainer.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  dates: PropTypes.object,
  setDates: PropTypes.func.isRequired,
  resetDates: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({aws}) => ({
  dates: aws.reserves.dates,
  accounts: aws.accounts.selection
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  setDates: (start, end) => {
    dispatch(Actions.AWS.Reserves.setDates(start, end));
  },
  resetDates: () => {
    dispatch(Actions.AWS.Reserves.resetDates());
  },
  clearDates: () => {
    dispatch(Actions.AWS.Reserves.clearDates());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ReservesContainer);
