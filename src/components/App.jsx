import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import Events from "./Events";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";

function App(props) {
	const { getUserAuth } = props;
	useEffect(() => {
		getUserAuth();
	}, [getUserAuth]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					
					{/* Main Feed Route */}
					<Route path="/feed">
						<Header />
						<Home />
					</Route>

					{/* New Dummy Routes */}
					<Route path="/messages">
						<Header />
						<Messages />
					</Route>
					
					<Route path="/profile">
						<Header />
						<Profile />
					</Route>
					
					<Route path="/events">
						<Header />
						<Events />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
