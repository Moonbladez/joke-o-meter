import React, { Component } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "./joke.css";

class Joke extends Component {
	render() {
		return (
			<div className='Joke'>
				<div className='Joke__buttons'>
					<FiArrowUp onClick={this.props.upVote} className='Joke__button--up' />
					<span className='Joke__votes'>{this.props.votes}</span>
					<FiArrowDown
						onClick={this.props.downVote}
						className='Joke__button--down'
					/>
				</div>
				<div className='Joke__text'>{this.props.text}</div>
				<div className='Joke__emoji'>
					<i
						class='em em-rolling_on_the_floor_laughing'
						aria-role='presentation'
						aria-label='ROLLING ON THE FLOOR LAUGHING'
					></i>
				</div>
			</div>
		);
	}
}

export default Joke;
