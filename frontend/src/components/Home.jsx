import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Main from "./Main";

function Home({ showJobs }) {
	return <Main showJobs={showJobs} />;
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

export default connect(mapStateToProps)(Home);
