import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddTodo from 'features/todos/AddTodo'
import VisibleTodoList from 'features/todos/VisibleTodoList'
import Footer from 'features/filters/Footer'

// import Header from '../components/Header';
// import NavBar from './containers//NavBar';

// import { fetchUser, fetchTodos } from '../actions/userActions';

class App extends Component {

	// initialFetch () {
	// 	this.props.dispatch(fetchUser());
	// 	this.props.dispatch(fetchTodos());
	// }

	// componentDidMount() {
	// 	this.initialFetch();
	// }

	render () {
		return (
			<div>
				<AddTodo />
				<VisibleTodoList />
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);