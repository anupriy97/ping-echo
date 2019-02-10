import React, { Component } from 'react';
import Status from './Status';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pingFrequency: 2,
			toBePingFrequency: 2,
			isLive1: false,
			isLive2: false,
			isServiceUp1: false,
			isServiceUp2: false,
			api1: 'http://172.17.0.3:8080/api/getRandom',
			api2: 'http://172.17.0.4:8080/api/getRandom',
			num1: 0,
			num2: 0,
		};
	}

	componentDidMount() {
		this.callApis();
	}

	callApis = async () => {
		let isServiceUp1 = false, isServiceUp2 = false;
		let num1 = 0, num2 = 0;
		const resp = await this.pingApi();
		if (resp.isLive1) {
			console.log("vm1")
			const resp1 = await this.callApi(this.state.api1);
			if (resp1.num) {
				isServiceUp1 = true;
				num1 = resp1.num;
			}
		}
		if (resp.isLive2) {
			console.log("vm2")
			const resp2 = await this.callApi(this.state.api2);
			if (resp2.num) {
				isServiceUp2 = true;
				num2 = resp2.num;
			}
		}
		this.setState({
			isLive1: resp.isLive1,
			isLive2: resp.isLive2,
			isServiceUp1: isServiceUp1,
			isServiceUp2: isServiceUp2,
			num1: num1,
			num2: num2,
		});

		setTimeout(this.callApis, this.state.pingFrequency*1000);
	}

	callApi = async (api) => {
		try {
			const response = await fetch(api);
			const body = await response.json();
			console.log(body);
			return body;
		} catch (err) {
			console.log(api, err);
			return { num: 0 };
		}
	};

	pingApi = async () => {
		const response = await fetch('http://172.17.0.2:8080/api/ping');
		const body = await response.json();
		return body;
	}

	render() {
		return (
			<div className="App">
				<div className="appHeader">
					<strong>Dashboard</strong>
				</div>
				<div className="topHalf">
					<div className="leftRightHalf">
						<Status name="VM1" isLive={this.state.isLive1} />
						<Status name="VM1 Service" isLive={this.state.isServiceUp1} />
					</div>
					<div className="leftRightHalf">
						<Status name="VM2" isLive={this.state.isLive2} />
						<Status name="VM2 Service" isLive={this.state.isServiceUp2} />
					</div>
				</div>
				<div className="bottomHalf">
					<div className="num">{this.state.num1}</div>
					<div className="bottomHalfInner">
						<p>
							<strong>Update Ping Frequency</strong>
						</p>
						<input
							type="text"
							value={this.state.toBePingFrequency}
							onChange={e => this.setState({ toBePingFrequency: e.target.value })}
						/><br/>
						<button onClick={e => this.setState({ pingFrequency: this.state.toBePingFrequency })}>Update</button>
					</div>
					<div className="num">{this.state.num2}</div>
				</div>
			</div>
		);
	}
}

export default App;