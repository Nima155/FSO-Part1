import React, { MouseEventHandler, useState } from "react";
//  we can use colgroups to apply styles to specific columns
// colspan and rowspan are also available
interface IObjectType {
	text: string;
	votes: number;
	symbol?: string;
}
const Statistic = ({ text, votes, symbol = "" }: IObjectType) => (
	// tr: table row, th: table header
	<tr>
		{/* table data = td */}
		<td>{text}</td>
		<td>{votes}</td>
		<td>{symbol}</td>
	</tr>
);
const Statistics = ({ list }: { list: IObjectType[] }) => (
	<table style={{ border: "1px solid black" }}>
		{/* all statistics go inside the table body.. tbody allows us to 
     style our table bodies */}
		<tbody>
			{list.map((ele, indx) => (
				<Statistic
					text={ele.text}
					votes={ele.votes}
					symbol={ele.symbol}
					key={indx}
				/>
			))}
		</tbody>
		{/* we also have <tfoot> and <thead> */}
	</table>
);

const Button = ({
	text,
	clickHandler,
}: {
	text: string;
	clickHandler: MouseEventHandler;
}) => <button onClick={clickHandler}>{text}</button>;

const Header = ({
	content,
	fontSize = "24px",
}: {
	content: string;
	fontSize?: string;
}) => <p style={{ fontSize: fontSize, fontWeight: "bold" }}>{content}</p>;

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const total = good + bad + neutral;
	const stats: IObjectType[] = [
		{
			text: "good",
			votes: good,
		},
		{
			text: "neutral",
			votes: neutral,
		},
		{
			text: "bad",
			votes: bad,
		},
		{
			text: "all",
			votes: total,
		},
		{
			text: "average",
			votes: (good - bad) / total,
		},
		{
			text: "positive",
			votes: (good * 100) / total,
			symbol: "%",
		},
	];
	// function returning function
	const stateUpdater =
		(updater: React.Dispatch<React.SetStateAction<number>>) => () =>
			updater((val) => val + 1);

	return (
		<div>
			<Header content="give feedback" />
			<Button text="good" clickHandler={stateUpdater(setGood)} />
			<Button text="neutral" clickHandler={stateUpdater(setNeutral)} />
			<Button text="bad" clickHandler={stateUpdater(setBad)} />
			<Header content="statistics" />
			{good || neutral || bad ? (
				<Statistics list={stats} />
			) : (
				<p>{"No feedback given"}</p>
			)}
		</div>
	);
};

export default App;
