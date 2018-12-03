import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Actions from "../../../actions";
import Spinner from "react-spinkit";
import ReactTable from 'react-table';
import moment from 'moment';
import { formatRemainDuration, formatPrice } from '../../../common/formatters';

export class ReservedInstancesComponent extends Component {
	componentWillMount = () => {
		this.props.getData(this.props.dates);
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.accounts !== this.props.accounts || nextProps.dates !== this.props.dates)
      nextProps.getData(nextProps.dates);
  }


	render() {
    const loading = (!this.props.data.status ? (<Spinner className="spinner" name='circle'/>) : null);
    const error = (this.props.data.error ? (<div className="alert alert-warning" role="alert">Error while getting data ({this.props.data.error.message})</div>) : null);
		let list = null;
		if (this.props.data.hasOwnProperty("value") && this.props.data.value) {
			list = (!loading && !error ? (
				<ReactTable
					data={this.props.data.value}
					noDataText="No instances available"
					filterable
					defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value)}
					columns={[
						{
							Header: "ID",
							accessor: "reservedInstancesId",
						},
						{
							Header: "Remaining",
							id: "remain",
							accessor: row => (moment.duration(moment(row.endDate).diff(moment()))),
							sortMethod: (a, b) => (a.asSeconds() > b.asSeconds() ? 1: -1),
							Cell: row => formatRemainDuration(row.value),
						},
						{
							Header: "State",
							accessor:  "state",
						},
						{
							Header: "startDate",
							accessor:  "startDate",
							Cell: row => (row.value ? moment(row.value).format("YYYY-MM-DD"): "")
						},
						{
							Header: "Price",
							id:  "fixedPrice",
							accessor: row => (row.instanceCount * row.fixedPrice),
							Cell: row => (row.value ? formatPrice(row.value): "0,00")
						},
						{
							Header: "family",
							accessor:  "family",
						},
						{
							Header: "Instances",
							accessor:  "instanceCount",
						},
						{
							Header: "Computation units",
							id:  "computationUnits",
							accessor: (row) => row.normalizationFactor * row.instanceCount,
						},
						{
							Header: "Scope",
							accessor:  "scope",
						},
						{
							Header: "Region",
							accessor:  "region",
						},
						{
							Header: "Normalization Factor",
							accessor: "normalizationFactor",
						}
					]}
					defaultSorted={[{
						id: 'reservedInstancesId'
					}]}
					defaultPageSize={10}
					className=" -highlight"
				/>
			) : null);
		}

		return (
			<div className="clearfix reservations">
				<h4 className="white-box-title no-padding inline-block">
					<i className="menu-icon fa fa-desktop" />
					&nbsp;
					Reserved Instances
				</h4>
        {loading}
        {error}
				{list}
			</div>
		);
	}
}

ReservedInstancesComponent.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    value: PropTypes.arrayOf(PropTypes.shape({
			    reservedInstancesId: PropTypes.string.isRequired,
			    offeringType: PropTypes.string.isRequired,
			    endDate: PropTypes.string.isRequired,
			    scope: PropTypes.string.isRequired,
			    usagePrice: PropTypes.number.isRequired,
			    startDate: PropTypes.string.isRequired,
			    state: PropTypes.string.isRequired,
			    productDescription: PropTypes.string.isRequired,
			    currencyCode: PropTypes.string.isRequired,
			    duration: PropTypes.number.isRequired,
			    instanceType: PropTypes.string.isRequired,
			    instanceCount: PropTypes.number.isRequired,
			    availabilityZone: PropTypes.string,
			    fixedPrice: PropTypes.number.isRequired,
			    offeringClass: PropTypes.string,
			    family: PropTypes.string.isRequired,
			    normalizationFactor: PropTypes.number.isRequred,
			    region: PropTypes.string.isRequired,
		}))
  }),
  getData: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  dates: PropTypes.object.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({aws}) => ({
  accounts: aws.accounts.selection,
  dates: aws.reserves.dates,
  data: aws.reserves.RI
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  getData: (date) => {
    dispatch(Actions.AWS.Reserves.get.RI(date));
  },
  clear: () => {
    dispatch(Actions.AWS.Reserves.clear.RI());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ReservedInstancesComponent);
