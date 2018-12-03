import React, {Component} from 'react';
import NVD3Chart from 'react-nvd3';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import ChartsColors from "../../../styles/ChartsColors";

import {formatNumber, } from '../../../common/formatters';

/* istanbul ignore next */
const formatX = (d) => (d.key);

/* istanbul ignore next */
const formatY = (d) => (d.value);

class PieChartComponent extends Component {

	extractTotals = (items) => {
		const totals = items.reduce( (reduce, next) => {
			if (reduce[next.family]) {
				reduce[next.family] += next.cost;
			} else {
				reduce[next.family] = next.cost;
			}
			return reduce
		}, {})

		return Object.keys(totals).map( (family) => ({
			key: family,
			value: totals[family]
		}));
	}

	render() {
		/*
		const loading = (!this.props.usage && !this.props.discounted && (this.props.usage.status || this.props.discounted.status) ? (
			<Spinner className="spinner clearfix" name='circle'/>) : null
		);

		let error = null;
		if ((this.props.usage && this.props.usage.error) || (this.props.discounted && this.props.discounted.error)){
			error = (
				<div>
					<div className="alert alert-warning" role="alert">Error while getting data</div>
				</div>
			);
		}

		
		const icon = (
      <div className="dashboard-item-icon">
        <i className="fa fa-list"/>
        &nbsp;
        Summary
      </div>
		);

		*/
		let chart = null;
		if (this.props.data && this.props.data.hasOwnProperty("value") && this.props.data.value) {
			const totals = this.extractTotals(this.props.data.value);
			const total = totals.reduce( (reduce, next) => reduce+next.value, 0)
      chart = <NVD3Chart
          id={`pieChart-${this.props.name}`}
          type="pieChart"
          title={`$ ${formatNumber(total)}`}
          datum={totals}
          color={ChartsColors}
          x={formatX}
          y={formatY}
          showLabels={false}
          showLegend={false}
          donut={true}
          height={240}
			/>

			return (
      <div className="s3analytics piechart">
        <h2>{this.props.name}</h2>
					{chart}
				</div>
			);
		}
		return null

	}
}

class PieChartsComponent extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-6">
					<PieChartComponent name={"usage on demand value"} data={this.props.usage} />
				</div>
				<div className="col-md-6">
					<PieChartComponent name={"usage discounted value"} data={this.props.discounted} />
				</div>
			</div>
		);
	}
}

export default PieChartsComponent;
