import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MultiSelector extends Component {
	constructor(props) {
		super(props);
		this.handleValueSelection = this.handleValueSelection.bind(this);
		this.filterValues = this.filterValues.bind(this);
		this.state = {
			s: []
		};
	}

	componentWillMount = () => {
		if (this.props.selected) {
			const s = this.props.selected.split(',');
			this.setState({s});
		}
	}

	componentWillReceiveProps = (nextProp) => {
		if (this.state.s.length == 0 && this.props.selected !== nextProp.selected) {
			const s = nextProp.selected.split(',');
			this.setState({s});
		}
	}

	handleValueSelection = (event) => {
		const value = event.target.value;
    this.setState((state, props) => {
    	state.s.push(value);
			this.props.selectValue(state.s.join(','));
      return state;
    });
  }

  onClick = (event, key) => {
		if (this.state.s.length > 1) {
			this.setState( (state, props) => {
				const s = state.s.filter(i => i !== key);
				this.props.selectValue(s.join(','));
				return {...state, s,};
			});
		}
  }

  filterValues = (values) => {
		if (values) {
			const keys = Object.keys(values);
			return keys.filter( key => values.hasOwnProperty(key) &&
				this.state.s.indexOf(values[key]) === -1
			).map( key => values[key]);
		}
		else {
			return [];
		}
  }

  render() {
		const tags = this.state.s.map( (key, index) => (
					<span key={index} onClick={(event) => this.onClick(event, key)}>
						{key}
					</span>
				));
		const options = this.filterValues(this.props.values).map( (value, index) => (
			<option key={index} value={value}>{value}</option>
		));
    return (
			<div>
				{tags}
			<select onChange={this.handleValueSelection} value='def' >
				<option disabled value='def' >-</option>
				{options}
			</select> </div>);
	}
}

MultiSelector.propTypes = {
  values: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectValue: PropTypes.func.isRequired
};

export default MultiSelector;
