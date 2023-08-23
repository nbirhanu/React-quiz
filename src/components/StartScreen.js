function StartScreen({ numOfQuestion }) {
	return (
		<div className="start">
			<h2>Welcome to the react quize</h2>
			<h3>{numOfQuestion} Question to test your React mastery</h3>
			<button className="btn btn-ui">Let Start</button>
		</div>
	)
}

export default StartScreen
