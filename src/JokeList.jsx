import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import { v4 as uuid } from "uuid";
import "./jokelist.css";
import { FaRegLaughSquint } from "react-icons/fa";

class JokeList extends Component {
	static defaultProps = {
		amountOfJokes: 5,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
			loading: false,
		};
		this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	async getJokes() {
		try {
			let jokes = [];
			while (jokes.length < this.props.amountOfJokes) {
				let response = await axios.get("https://icanhazdadjoke.com/", {
					headers: { Accept: "application/json" },
				});
				let newJoke = response.data.joke;
				if (!this.seenJokes.has(newJoke)) {
					jokes.push({ id: uuid(), text: newJoke, votes: 0 });
				} else {
					console.log("duplicate joke", newJoke);
				}
			}
			this.setState(
				(oldState) => ({
					loading: false,
					jokes: [...oldState.jokes, ...jokes],
				}),
				() =>
					window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
			);
		} catch (error) {
			alert(error);
			this.setState({ loading: false });
		}
	}

	handleVote(id, delta) {
		this.setState(
			(oldState) => ({
				jokes: oldState.jokes.map((j) =>
					j.id === id ? { ...j, votes: j.votes + delta } : j
				),
			}),
			() =>
				window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
		);
	}

	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}

	render() {
		if (this.state.loading) {
			return (
				<div className='spinner'>
					<FaRegLaughSquint className='spin spinner__icon' />
					<h1 className='JokeList__title'>Loading...</h1>
				</div>
			);
		}
		return (
			<div className='JokeList'>
				<div className='JokeList__sidebar'>
					<h1 className='JokeList__title'>Dad Jokes</h1>
					<img src='../smiley.svg' alt='' />
					<button className='JokeList__button' onClick={this.handleClick}>
						New Jokes
					</button>
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
