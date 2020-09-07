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

// import LogoutButton from 'features/user/LogoutButton'
// import TodoForm from 'features/todos/TodoForm'
// import VisibleTodoList from 'features/todos/VisibleTodoList'
// import Footer from 'features/filters/Footer'

import { fetchUser } from '../features/user/userSlice'
import { myTodos } from '../features/todos/todosSlice'

class App extends Component {

	initialFetch () {
		this.props.dispatch(fetchUser())
		console.log(JSON.stringify(this.props))
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
						(<UserForm/>)
					}>
					</Route>
					<Route path="/home">
						{ this.props.user.loggedIn ?
						<Home /> :
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