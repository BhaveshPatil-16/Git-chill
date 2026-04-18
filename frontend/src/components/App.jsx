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
import Signup from "../pages/Signup";
import { useEffect } from "react";
import { getUserAuth } from "../action";
import { connect } from "react-redux";

// Shared layout for all authenticated pages
function AuthLayout({ children }) {
	return (
		<>
			<Header />
			<Sidebar />
			<div className="ml-0 md:ml-[280px] py-6 px-4 md:py-8 md:px-6 flex justify-center transition-[margin-left] duration-300">
				<div className="w-full max-w-[900px]">
					{children}
				</div>
			</div>
			<Footer />
		</>
	);
}

function App(props) {
	const { getUserAuth } = props;
	useEffect(() => {
		getUserAuth();
	}, [getUserAuth]);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<Signup />} />
					
					{/* Authenticated Routes — Header + Left sidebar shared */}
					<Route path="/feed" element={<AuthLayout><Home /></AuthLayout>} />
					<Route path="/messages" element={<AuthLayout><Messages /></AuthLayout>} />
					<Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
					<Route path="/events" element={<AuthLayout><Events /></AuthLayout>} />
				</Routes>
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
