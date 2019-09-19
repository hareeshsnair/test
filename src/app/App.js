import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(() => import('../hoc/Layout/Layout'));

// Pages
const Login = React.lazy(() => import('../containers/Login/Login'));

class App extends Component {

  	render() {
		let routes = (
			<Switch>
				<Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
				<Redirect to="/login" render={props => <Login {...props}/>} />
			</Switch>
		)
		if(localStorage.getItem('idToken')) {
			routes = (
				<Switch>
					<Route path="/" exact name="Dashboard" render={props => <DefaultLayout {...props}/>} />
					<Redirect to="/" render={props => <DefaultLayout {...props}/>} />
				</Switch>
			)
		}
		return (
			<BrowserRouter>
				<Suspense fallback={loading()}>
					{routes}
				</Suspense>
			</BrowserRouter>
		);
  	}
}

export default App;
