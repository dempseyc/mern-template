import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Header from '../components/Header';
// import NavBar from './containers//NavBar';

// import { fetchUsers, fetchUser } from '../actions/userActions';

class App extends Component {

	// initialFetch () {
	// 	this.props.dispatch(fetchUsers());
	// 	this.props.dispatch(fetchUser());
	// }

	// componentDidMount() {
	// 	this.initialFetch();
	// }

	render () {
		return <div className="App">mern app, RTK</div>
	}
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);