function NestButton({ dispatch, answer, index, numOfQuestion }) {
	if (answer === null) return null
	if (index < numOfQuestion - 1)
		return (
			<div>
				<button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
					Next
				</button>
			</div>
		)
	if (index === numOfQuestion - 1)
		return (
			<div>
				<button className="btn btn-ui" onClick={() => dispatch({ type: 'finishedScreen' })}>
					Finished
				</button>
			</div>
		)
}

export default NestButton
