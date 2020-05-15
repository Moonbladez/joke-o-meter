import React, { Component } from "react";
import axios from "axios";

class JokeList extends Component {
	static defaultProps = {
		amountOfJokes: 10,
	};

	constructor(props) {
		super(props);
		this.state = { jokes: [] };
	}
	async componentDidMount() {
		let jokes = [];
		while (jokes.length < this.props.amountOfJokes) {
			let response = await axios.get("https://icanhazdadjoke.com/", {
				headers: { Accept: "application/json" },
			});
			jokes.push(response.data.joke);
		}
		this.setState({ jokes: jokes });
	}

	render() {
		return (
			<div className='JokeList'>
				<h1>Dad Jokes</h1>
				<div className='JokeList-jokes'>
					{this.state.jokes.map((j) => (
						<div>{j}</div>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
