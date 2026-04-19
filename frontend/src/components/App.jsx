import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignIn from "../pages/SignIn";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import Events from "./Events";
import Referrals from "./Referrals";
import BusinessExchange from "./BusinessExchange";
import Promotions from "./Promotions";
import Marketplace from "./Marketplace";
import Signup from "../pages/Signup";
import AIAssistant from "./AIAssistant";
import CustomCursor from "./CustomCursor";
import { getUserAuth } from "../action";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function AuthLayout({ children, showJobs, setShowJobs }) {
	const location = useLocation();
	return (
		<div className="min-h-screen bg-[var(--bg-primary)]">
			<Header />
			<Sidebar showJobs={showJobs} />
			<main className="ml-0 md:ml-[280px] py-6 px-4 md:py-8 md:px-6 flex justify-center transition-[margin-left] duration-300">
				<div className="w-full max-w-[900px] animate-fadeIn">
					{React.Children.map(children, child => {
						if (React.isValidElement(child)) {
							return React.cloneElement(child, { showJobs, setShowJobs });
						}
						return child;
					})}
				</div>
			</main>
			<AIAssistant currentPage={location.pathname} />
			<Footer />
		</div>
	);
}

// Route Protection Wrapper
function PrivateRoute({ children, user, isLoading }) {
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#0a0618]">
				<div className="animate-pulse flex flex-col items-center gap-4">
					<div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
					<span className="text-white/40 text-sm font-medium">Authenticating...</span>
				</div>
			</div>
		);
	}
	return user ? children : <Navigate to="/" />;
}

function App(props) {
	const { getUserAuth } = props;
	const [showJobs, setShowJobs] = useState(localStorage.getItem('hirex_show_jobs') !== 'false');

	useEffect(() => {
		getUserAuth();
	}, [getUserAuth]);

	useEffect(() => {
		localStorage.setItem('hirex_show_jobs', showJobs);
	}, [showJobs]);

	return (
		<div className="App">
			<Router>
				<CustomCursor />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<Signup />} />
					
					{/* Authenticated Routes — Header + Left sidebar shared */}
					<Route path="/feed" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Home /></AuthLayout></PrivateRoute>} />
					<Route path="/messages" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Messages /></AuthLayout></PrivateRoute>} />
					<Route path="/profile" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Profile /></AuthLayout></PrivateRoute>} />
					<Route path="/events" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Events /></AuthLayout></PrivateRoute>} />
					<Route path="/referrals" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Referrals /></AuthLayout></PrivateRoute>} />
					<Route path="/business" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><BusinessExchange /></AuthLayout></PrivateRoute>} />
					<Route path="/promotions" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Promotions /></AuthLayout></PrivateRoute>} />
					<Route path="/marketplace" element={<PrivateRoute user={props.user}><AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}><Marketplace /></AuthLayout></PrivateRoute>} />
				</Routes>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
