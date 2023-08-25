import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Questions from './components/Question'
import NestButton from './components/NestButton'
import Progress from './components/Progress'
import FinishedS from './components/FinishedS'

//
const intialState = {
	questions: [],
	//loading, error, ready , active, finished
	status: 'loading',
	index: 0,
	answer: null,
	point: 0,
}
function reducer(state, action) {
	switch (action.type) {
		case 'recieveData':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			}
		case 'faild':
			return {
				...state,
				status: 'error',
			}
		case 'start':
			return {
				...state,
				status: 'active',
			}
		case 'newAnswer':
			const question = state.questions.at(state.index)
			return {
				...state,
				answer: action.payload,
				point:
					action.payload === question.correctOption ? state.point + question.points : state.point,
			}
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			}
		case 'finishedScreen':
			return {
				...state,
				status: 'finished',
			}
		case 'restart':
			return {
				...intialState,
				questions: state.questions,
				status: 'ready',
			}
		default:
			throw new Error('action unknown')
	}
}
//

function App() {
	const [state, dispatch] = useReducer(reducer, intialState)
	const { questions, status, index, answer, point } = state

	const numOfQuestion = questions.length
	const maxpossiblePoint = questions.reduce((pre, cur) => pre + cur.points, 0)
	useEffect(function () {
		fetch('http://localhost:9000/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'recieveData', payload: data }))
			.catch(error => dispatch({ type: 'faild' }))
	}, [])
	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen numOfQuestion={numOfQuestion} dispatch={dispatch} />}
				{status === 'active' && (
					<>
						<Progress
							numOfQuestion={numOfQuestion}
							index={index}
							point={point}
							maxpossiblePoint={maxpossiblePoint}
						/>
						<Questions question={questions[index]} dispatch={dispatch} answer={answer} />
						<NestButton
							dispatch={dispatch}
							answer={answer}
							index={index}
							numOfQuestion={numOfQuestion}
						/>
					</>
				)}
				{status === 'finished' && <FinishedS dispatch={dispatch} point={point} />}
			</Main>
		</div>
	)
}

export default App
