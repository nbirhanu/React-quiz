function FinishedS({ point, dispatch }) {
	return (
		<>
			<div className="result">
				<p>
					You Scored <strong>{point}</strong> Out Of 280
				</p>
			</div>
			<button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
				Restart
			</button>
		</>
	)
}

export default FinishedS
