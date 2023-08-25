import { useEffect } from 'react'

function Timer({ dispatch, timeRemaining }) {
	const min = Math.floor(timeRemaining / 60)
	const sec = timeRemaining % 60
	useEffect(
		function () {
			const id = setInterval(() => {
				dispatch({ type: 'tick' })
			}, 1000)
			return () => clearInterval(id)
		},
		[dispatch]
	)
	return (
		<div className="timer">
			{min < 10 && '0'}
			{min}:{sec < 10 && '0'}
			{sec}
		</div>
	)
}

export default Timer
