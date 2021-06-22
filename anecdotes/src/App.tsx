import React, { MouseEventHandler, useState } from "react";

const Anecdote = ({ text, votes }: { text: string; votes: number }) => {
	return (
		<>
			<p>{text}</p>
			<p>{`has ${votes} votes`}</p>
		</>
	);
};

const Header = ({
	content,
	fontSize = "24px",
}: {
	content: string;
	fontSize?: string;
}) => <p style={{ fontSize: fontSize, fontWeight: "bold" }}>{content}</p>;

const Button = ({
	clickHandler,
	text,
}: {
	clickHandler: MouseEventHandler;
	text: string;
}) => <button onClick={clickHandler}>{text}</button>;

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
	];

	//                                      fill with zeroes
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
	const [selected, setSelected] = useState(0);
	const clickHandlerNext = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length));
	};
	const clickHandlerVote = () => {
		const nV = [...votes];
		nV[selected]++;
		setVotes(nV);
	};

	const maxVotesIndex = votes.indexOf(Math.max(...votes));

	return (
		<div>
			<Header content="Anecdote of the day" />
			<Anecdote votes={votes[selected]} text={anecdotes[selected]} />
			<Button clickHandler={clickHandlerVote} text={"Vote"} />
			<Button clickHandler={clickHandlerNext} text={"Next anecdtode"} />
			<Header content="Anecdote with most votes" />
			<Anecdote votes={votes[maxVotesIndex]} text={anecdotes[maxVotesIndex]} />
		</div>
	);
};

export default App;
