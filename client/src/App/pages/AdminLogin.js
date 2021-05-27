import React, { Component } from 'react';
import Auth from '../Auth';

class AdminLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.login = this.login.bind(this);
	}

	login() {
		Auth.authenticate();
		console.log(Auth.getAuth());
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/adminLogin', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				this.login();
				return this.props.history.push('/adminHome')
			} else {
				return this.props.history.push('/')
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<h1>Admin Login</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			        <div><label>username: <input type="text" name="username" value={this.state.email} onChange={this.handleChange} /></label></div>
			        <div><label>password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default AdminLogin;