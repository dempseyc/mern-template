import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import UserForm from 'features/user/UserForm'
import Home from './Home'

import { fetchUser } from '../features/user/userSlice'
import { myTodos } from '../features/todos/todosSlice'

class App extends Component {

	initialFetch () {
		this.props.dispatch(fetchUser())
	}

	componentDidMount() {
		this.initialFetch()
	}

	render () {
		return (
			<Router>
				<Switch>
					<Route path="/login" render={()=>
						this.props.user.loggedIn ?
						(<Redirect to="/home" />) :
						(<UserForm cMode={false}/>)
					}>
					</Route>
					<Route path="/home">
						{ this.props.user.loggedIn ?
						<Home /> :
						<Redirect to="/login" />
						}
					</Route>
					<Route path="/settings">
						{ this.props.user.loggedIn ?
						<UserForm cMode={true}/> :
						<Redirect to="/login" />
						}
					</Route>
					<Route path="/">
						{ this.props.user.loggedIn ?
						<Redirect to="/home" /> :
						<Redirect to="/login" />
						}
					</Route>
				</Switch>
			</Router>
		)
	}
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(App)