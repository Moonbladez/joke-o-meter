import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import { v4 as uuid } from "uuid";
import "./jokelist.css";

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
			jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
		}
		this.setState({ jokes: jokes });
	}

	handleVote(id, delta) {
		this.setState((oldState) => ({
			jokes: oldState.jokes.map((j) =>
				j.id === id ? { ...j, votes: j.votes + delta } : j
			),
		}));
	}

	render() {
		return (
			<div className='JokeList'>
				<div className='JokeList__sidebar'>
					<h1 className='JokeList__title'>Dad Jokes</h1>
					<img src='../smiley.svg' alt='' />
				</div>

				<div className='JokeList__jokes'>
					{this.state.jokes.map((j) => (
						<Joke
							votes={j.votes}
							text={j.text}
							key={j.id}
							upVote={() => {
								this.handleVote(j.id, 1);
							}}
							downVote={() => {
								this.handleVote(j.id, -1);
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
