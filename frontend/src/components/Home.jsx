import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Main from "./Main";

function Home(props) {
	if (!props.user) {
		return <Navigate to="/" />;
	}

	return <Main />;
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

export default connect(mapStateToProps)(Home);
