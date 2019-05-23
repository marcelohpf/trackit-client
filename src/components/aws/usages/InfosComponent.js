import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import {formatNumber, formatPrice} from '../../../common/formatters';

// S3AnalyticsInfosComponent Component
class InfosComponent extends Component {

	extractTotal = (values, state) => {
		if (!values || !values.value || !values.value.length) {
      return null;
		}
		return values.value.reduce( (reduce, next) => {
			reduce.totalCost += next.cost
			reduce.totalUsage += next.normalizedUsage
			return reduce;
    }, state);
	}

  extractTotals = () => {
		const resUsage = this.extractTotal(this.props.usage, { totalCost: 0, totalUsage: 0, })
		const resDiscount = this.extractTotal(this.props.discounted, { totalCost: 0, totalUsage: 0, })
		if (!resUsage || !resDiscount) {
			return null
		}
		return {totalUsage: resUsage.totalUsage, totalCost: resUsage.totalCost,
			totalDiscountUsage: resDiscount.totalUsage, totalDiscountCost: resDiscount.totalCost}
	}

  render() {
    if (!this.props.usage || !this.props.usage.status || !this.props.discounted || !this.props.discounted.status)
      return (<Spinner className="spinner clearfix" name='circle'/>);

    if (this.props.usage && this.props.usage.status && this.props.usage.hasOwnProperty("error"))
      return (<div className="alert alert-warning" role="alert">Data not available ({this.props.usage.error.message})</div>);

    if (this.props.discounted && this.props.discounted.status && this.props.discounted.hasOwnProperty("error"))
      return (<div className="alert alert-warning" role="alert">Data not available ({this.props.discounted.error.message})</div>);

    const totals = this.extractTotals();

    if (!totals)
      return (<h4 className="no-data">No data available.</h4>);

		const total = (totals.totalUsage + totals.totalDiscountUsage) || 1

    /* istanbul ignore next */
    return (
      <div>
        <div className="s3-card">
					<h3 className="no-margin no-padding font-light">
						{formatPrice(totals.totalCost)}
					</h3>
          <h4 className="card-label p-l-10 m-b-0">
            total value
          </h4>
        </div>
        <div className="s3-card">
					<h3 className="no-margin no-padding font-light">
						<i className="menu-icon fa fa-tachometer red-color"/>
						{formatNumber(100*totals.totalUsage/total)}%
					</h3>
          <h4 className="card-label p-l-10 m-b-0">
            total noramlized usage
          </h4>
        </div>
				<div className="s3-card" />
        <div className="s3-card">
					<h3 className="no-margin no-padding font-light">
						{formatPrice(totals.totalDiscountCost)}
					</h3>
          <h4 className="card-label p-l-10 m-b-0">
            total discount value
          </h4>
        </div>
        <div className="s3-card">
					<h3 className="no-margin no-padding font-light">
						<i className="menu-icon fa fa-tachometer blue-color"/>
						{formatNumber(100*totals.totalDiscountUsage/total)}%
					</h3>
          <h4 className="card-label p-l-10 m-b-0">
            total discount usage
          </h4>
        </div>
        <span className="clearfix"></span>
      </div>
    );
  }

}

InfosComponent.propTypes = {
  data: PropTypes.object,
};

export default InfosComponent;
