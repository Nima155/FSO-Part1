import React from "react";
interface IPartType {
	part?: string;
	exercises: number;
	name?: string;
}

const Total = ({ parts }: { parts: IPartType[] }) => (
	<p>
		Number of exercises {parts.reduce((prev, cur) => prev + cur.exercises, 0)}
	</p>
);
const Part = ({ part, exercises }: IPartType) => {
	return (
		<p>
			{part} {exercises}
		</p>
	);
};
const Content = ({ parts }: { parts: IPartType[] }) => {
	return (
		<>
			{parts.map((ele, indx) => (
				<Part part={ele.name} exercises={ele.exercises} key={indx} />
			))}
		</>
	);
};

const Header = ({ course }: { course: string }) => <h1>{course}</h1>;

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
