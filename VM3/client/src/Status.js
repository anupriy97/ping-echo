import React, { Component } from 'react';
import './App.css';

export default class Status extends Component {
	render() {
		let color = '#c05608';
		let label = 'Dead';
		if (this.props.isLive) {
			color = 'green';
			label = 'Alive';
		}
		let style = {
			backgroundColor: color,
		}
		return (
			<div className="status">
				<div className="label">
					{this.props.name}
				</div>
				<div className="box" style={style} />
				<div className="label">
					<strong>{label}</strong>
				</div>
			</div>
		);
	}
}