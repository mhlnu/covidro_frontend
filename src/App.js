import React, { Component } from 'react'
import './styles.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Evolution from './components/Evolution'
import Tests from './components/Tests'
import Commited from './components/Commited'
import Loading from './components/Layout/Loading'
import axios from 'axios'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
		};
		this.getData()
	}

	async getData() {
		axios.get('/api', {
		  }).then(res => {
			const data = res.data
			this.setState({ data: data, isLoading: false })
		})
		.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getData()
	}

	render() {

		const { data, isLoading } = this.state

		if ( isLoading ) {
			return <Loading />
		} else {
			return (
				<Router>
					<Route exact path='/' component={ () => <Home data={ data } /> }  />
					<Route exact path='/evolutie' component={ () => <Evolution data={ data } /> } />
					<Route exact path='/teste' component={ () => <Tests data={ data } /> } />
					<Route exact path='/spital' component={ () => <Commited data={ data } /> } />
				</Router>
			)
		}
	}
}

export default App