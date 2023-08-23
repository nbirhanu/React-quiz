import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
//
const intialState = {
	questions: [],
	//loading, error, ready , active, finished
	status: 'loading',
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
		default:
			throw new Error('action unknown')
	}
}

function App() {
	const [{ questions, status }, dispatch] = useReducer(reducer, intialState)
	const numOfQuestion = questions.length
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
				{status === 'ready' && <StartScreen numOfQuestion={numOfQuestion} />}
			</Main>
		</div>
	)
}

export default App
