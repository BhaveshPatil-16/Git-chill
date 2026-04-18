import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import { signInAPI } from "../action";

const Container = styled.div`
	padding-top: 10px;
`;

const Nav = styled.nav`
	max-width: 1128px;
	margin: auto;
	padding: 12px 24px 16px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

const LogoWrap = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
`;

const LogoText = styled.span`
	font-size: 32px;
	font-weight: 700;
	color: var(--text-primary);
	letter-spacing: -1px;
`;

const LogoX = styled.span`
	font-size: 38px;
	font-weight: 800;
	background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-left: -2px;
`;

const Join = styled.a`
	font-size: 16px;
	padding: 12px 24px;
	text-decoration: none;
	border-radius: 8px;
	color: var(--text-secondary);
	margin-right: 12px;
	font-weight: 600;
	transition: background-color 0.2s ease, color 0.2s ease;
	cursor: pointer;

	&:hover {
		background-color: var(--input-bg);
		color: var(--text-primary);
	}
`;

const SignIn = styled.a`
	border-radius: 24px;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	transition: all 0.2s ease;
	line-height: 40px;
	padding: 12px 32px;
	text-align: center;
	background: linear-gradient(135deg, #a855f7, #3b82f6);
	box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
	cursor: pointer;
	
	&:hover {
		background: linear-gradient(135deg, #9333ea, #2563eb);
		box-shadow: 0 6px 16px rgba(168, 85, 247, 0.5);
		transform: translateY(-2px);
	}
`;

const Section = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-content: start;
	min-height: 700px;
	padding-top: 80px;
	padding-bottom: 138px;
	position: relative;
	width: 100%;
	max-width: 1128px;
	align-items: center;
	margin: auto;
	@media (max-width: 768px) {
		min-height: 0;
		padding-top: 40px;
		flex-direction: column;
	}
`;

const Hero = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	@media (max-width: 768px) {
		flex-direction: column;
		text-align: center;
	}
`;

const HeroText = styled.div`
	width: 50%;
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 40px;
	}
`;

const Title = styled.h1`
	font-size: 56px;
	color: var(--text-primary);
	font-weight: 800;
	line-height: 1.2;
	margin-bottom: 16px;
	span {
		font-weight: 800;
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	@media (max-width: 768px) {
		font-size: 36px;
	}
`;

const Subtitle = styled.p`
	font-size: 18px;
	line-height: 1.5;
	color: var(--text-secondary);
	margin-bottom: 40px;
	max-width: 440px;
	font-weight: 500;
	@media (max-width: 768px) {
		margin: 0 auto 40px;
	}
`;

const HeroImage = styled.div`
	width: 45%;
	display: flex;
	justify-content: center;
	img {
		width: 100%;
		max-width: 500px;
		filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Form = styled.div`
	width: 100%;
	max-width: 400px;
	@media (max-width: 768px) {
		margin: 0 auto;
	}
`;

const Google = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--bg-card);
	height: 64px;
	width: 100%;
	border-radius: 32px;
	border: 1px solid var(--border-color);
	vertical-align: middle;
	transition: all 0.3s ease;
	font-size: 20px;
	color: var(--text-primary);
	font-weight: 600;
	cursor: pointer;
	box-shadow: var(--card-shadow);
	
	&:hover {
		background-color: var(--bg-nav);
		border-color: var(--accent-purple);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.1);
	}
	img {
		margin-right: 25px;
	}
`;

function Login(props) {
	return (
		<Container>
			{props.user && <Redirect to="/feed" />}
			<Nav>
				<LogoWrap href="/">
					<LogoText>hire</LogoText>
					<LogoX>X</LogoX>
				</LogoWrap>
				<div>
					<Join>Join now</Join>
					<SignIn onClick={() => props.signIn()}>Sign in</SignIn>
				</div>
			</Nav>
			<Section>
				<Hero>
					<HeroText>
						<Title>Find your next<br/><span>great opportunity</span></Title>
						<Subtitle>Join hireX to connect, share, and discover the world's most innovative professionals. A dedicated ecosystem for quality hiring and role matching.</Subtitle>
						
						<div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '4px solid var(--accent-purple)', boxShadow: 'var(--card-shadow)' }}>
							<h4 style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '4px' }}>⚠️ Experienced Professionals Only</h4>
							<p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5', fontWeight: '500' }}>
								Only verified businesses and working professionals (3+ Yrs) are allowed to sign up. Freshers are currently out of scope for this platform version.
							</p>
						</div>

						<Form>
							<Google onClick={() => props.signIn()}>
								<img src="/images/google.svg" alt="Google" />
								Sign in with Google
							</Google>
						</Form>
					</HeroText>
					<HeroImage>
						<img src="/images/login-hero.svg" alt="Professionals connecting" />
					</HeroImage>
				</Hero>
			</Section>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
