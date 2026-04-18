import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";

const Container = styled.div`
	max-width: 100%;
	min-height: 100vh;
	background: var(--bg-primary);
`;

const Content = styled.div`
	margin-left: var(--sidebar-width); /* Push past fixed sidebar */
	padding: 28px 24px;
	display: flex;
	justify-content: center;
	transition: margin-left var(--transition-normal);
	
	@media (max-width: 768px) {
		margin-left: 0;
		padding: 20px 16px;
	}
`;

const Layout = styled.div`
	width: 100%;
	max-width: 1100px; /* Wider to accommodate right panel */
	
	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

function Home(props) {
	return (
		<Container>
			{!props.user && <Redirect to="/" />}
			<Content>
				<Layout>
					<Left />
					<Main />
				</Layout>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Home);
