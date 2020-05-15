import React, { Component } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

class Joke extends Component {
	render() {
		return (
			<div className='Joke'>
				<div className='Joke__buttons'>
					<FiArrowUp onClick={this.props.upVote} />
					<span>{this.props.votes}</span>
					<FiArrowDown onClick={this.props.downVote} />
				</div>
				<div className='Joke__text'>{this.props.text}</div>
			</div>
		);
	}
}

export default Joke;
