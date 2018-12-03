import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from "react-spinkit";
import ReactTable from 'react-table';
import { formatPrice, formatNumber } from '../../../common/formatters';

export class UsagesComponent extends Component {

	render() {
    const loading = (!this.props.data.status ? (<Spinner className="spinner" name='circle'/>) : null);
    const error = (this.props.data.error ? (<div className="alert alert-warning" role="alert">Error while getting data ({this.props.data.error.message})</div>) : null);
		let list = null;
		if (this.props.data.hasOwnProperty("value") && this.props.data.value) {
			const instances = this.props.data.value.filter( item => item.family !== "");
			list = (!loading && !error ? (
				<ReactTable
					data={instances}
					noDataText="No instances available"
					filterable
					defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value)}
					columns={[
						{
							Header: "Family",
							accessor: "family",
						},
						{
							Header: "Usage",
							accessor: "normalizedUsage",
							Cell: row => (row.value > 0 && row.value < 0.01 ? '<0.01' : formatNumber(row.value)),
						},
						{
							Header: "Cost",
							accessor: "cost",
							Cell: row => formatPrice(row.value),
						},
						{
							Header: "Normalization Factor",
							accessor: "normalizationFactor",
							Cell: row => formatNumber(row.value),
						}
					]}
					defaultSorted={[{
						id: 'family'
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
					Machines Usage
				</h4>
        {loading}
        {error}
				{list}
			</div>
		);
	}
}


UsagesComponent.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    value: PropTypes.arrayOf(PropTypes.shape({
			    type: PropTypes.string.isRequired,
			    family: PropTypes.string.isRequired,
			    normalizationFactor: PropTypes.number.isRequired,
			    normalizedUsage: PropTypes.number.isRequired,
			    cost: PropTypes.number.isRequired,
					region: PropTypes.string,
		}))
  })
};

export default UsagesComponent;
