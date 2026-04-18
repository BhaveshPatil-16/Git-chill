import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled, { keyframes } from "styled-components";
import { signInAPI } from "../action";

const fadeInUp = keyframes`
	from {
		opacity: 0;
		transform: translateY(24px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const Container = styled.div`
	min-height: 100vh;
	position: relative;
	overflow: hidden;
`;

/* Subtle radial glow behind hero area */
const BackgroundGlow = styled.div`
	position: absolute;
	top: 20%;
	right: 15%;
	width: 600px;
	height: 600px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(155, 79, 223, 0.08) 0%, transparent 70%);
	pointer-events: none;
	z-index: 0;
`;

const BackgroundGlow2 = styled.div`
	position: absolute;
	top: 40%;
	left: 5%;
	width: 400px;
	height: 400px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(54, 116, 224, 0.06) 0%, transparent 70%);
	pointer-events: none;
	z-index: 0;
`;

const Nav = styled.nav`
	max-width: 1128px;
	margin: auto;
	padding: 16px 24px 18px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	position: relative;
	z-index: 10;
`;

const NavInner = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const LogoWrap = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: transform var(--transition-fast);
	
	&:hover {
		transform: scale(1.03);
	}
`;

const LogoText = styled.span`
	font-size: 30px;
	font-weight: 700;
	color: #ffffff;
	letter-spacing: -1px;
`;

const LogoX = styled.span`
	font-size: 36px;
	font-weight: 800;
	background: linear-gradient(135deg, #b47aef 0%, #5b9cf5 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-left: -2px;
`;

const Join = styled.a`
	font-size: 15px;
	padding: 10px 22px;
	text-decoration: none;
	border-radius: var(--radius-sm);
	color: rgba(255, 255, 255, 0.7);
	font-weight: 500;
	transition: all var(--transition-fast);
	cursor: pointer;
	letter-spacing: -0.01em;

	&:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: #ffffff;
	}
`;

const SignIn = styled.a`
	border-radius: 24px;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	transition: all var(--transition-fast);
	padding: 10px 28px;
	text-align: center;
	background: var(--gradient-accent);
	box-shadow: 0 2px 16px rgba(155, 79, 223, 0.25), 0 0 0 1px rgba(155, 79, 223, 0.1);
	cursor: pointer;
	letter-spacing: -0.01em;
	display: inline-flex;
	align-items: center;
	
	&:hover {
		box-shadow: 0 6px 28px rgba(155, 79, 223, 0.4), 0 0 0 1px rgba(155, 79, 223, 0.2);
		transform: translateY(-2px);
	}
	
	&:active {
		transform: translateY(0) scale(0.98);
	}
`;

const Section = styled.section`
	display: flex;
	flex-wrap: wrap;
	align-content: start;
	min-height: 700px;
	padding-top: 72px;
	padding-bottom: 120px;
	position: relative;
	width: 100%;
	max-width: 1128px;
	align-items: center;
	margin: auto;
	z-index: 1;
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
	animation: ${fadeInUp} 0.7s ease-out both;
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 40px;
	}
`;

const Title = styled.h1`
	font-size: 54px;
	color: #ffffff;
	font-weight: 800;
	line-height: 1.1;
	margin-bottom: 20px;
	letter-spacing: -0.045em;
	
	span {
		font-weight: 800;
		background: linear-gradient(135deg, #c084fc 0%, #60a5fa 50%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	@media (max-width: 768px) {
		font-size: 36px;
	}
`;

const Subtitle = styled.p`
	font-size: 17px;
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: 36px;
	max-width: 430px;
	font-weight: 400;
	letter-spacing: -0.01em;
	@media (max-width: 768px) {
		margin: 0 auto 36px;
	}
`;

const HeroImage = styled.div`
	width: 45%;
	display: flex;
	justify-content: center;
	position: relative;
	animation: ${fadeInUp} 0.7s ease-out 0.2s both;
	
	/* Glow behind illustration */
	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 80%;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(155, 79, 223, 0.12) 0%, rgba(54, 116, 224, 0.06) 40%, transparent 70%);
		filter: blur(40px);
		z-index: -1;
	}
	
	img {
		width: 100%;
		max-width: 480px;
		filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
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
	background: #ffffff;
	height: 56px;
	width: 100%;
	border-radius: 28px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	vertical-align: middle;
	transition: all var(--transition-normal);
	font-size: 15px;
	color: #1a1a2e;
	font-weight: 600;
	cursor: pointer;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05);
	letter-spacing: -0.01em;
	
	&:hover {
		background: #f8f9fc;
		transform: translateY(-3px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 40px rgba(155, 79, 223, 0.08);
	}
	
	&:active {
		transform: translateY(-1px) scale(0.99);
	}
	
	img {
		margin-right: 14px;
		width: 20px;
		height: 20px;
	}
`;

/* ── Notice Card: Dark glass with high contrast ── */
const NoticeCard = styled.div`
	background: rgba(255, 255, 255, 0.04);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	padding: 18px 20px;
	border-radius: var(--radius-lg);
	margin-bottom: 28px;
	border: 1px solid rgba(155, 79, 223, 0.18);
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.04);
	transition: all var(--transition-normal);
	
	&:hover {
		border-color: rgba(155, 79, 223, 0.3);
		box-shadow: 0 6px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(155, 79, 223, 0.06);
	}
`;

const NoticeHeading = styled.h4`
	color: #EDE9FE;
	font-size: 14px;
	margin-bottom: 6px;
	font-weight: 700;
	letter-spacing: -0.02em;
	display: flex;
	align-items: center;
	gap: 6px;
`;

const NoticeIcon = styled.span`
	font-size: 16px;
	filter: brightness(1.2) saturate(1.3);
	line-height: 1;
`;

const NoticeText = styled.p`
	color: #D1D5DB;
	font-size: 13px;
	line-height: 1.6;
	font-weight: 400;
	letter-spacing: -0.01em;
`;

/* Divider line or subtle separator */
const Divider = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 28px;
	
	&::before,
	&::after {
		content: '';
		flex: 1;
		height: 1px;
		background: rgba(255, 255, 255, 0.08);
	}
	
	span {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.35);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		white-space: nowrap;
	}
`;

/* Trust badges row */
const TrustRow = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-top: 28px;
	animation: ${fadeInUp} 0.7s ease-out 0.4s both;
`;

const TrustItem = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
	font-weight: 500;
	letter-spacing: -0.01em;
	
	span.icon {
		font-size: 14px;
		opacity: 0.7;
	}
`;

function Login(props) {
	return (
		<Container>
			{props.user && <Redirect to="/feed" />}
			<BackgroundGlow />
			<BackgroundGlow2 />
			<Nav>
				<LogoWrap href="/">
					<LogoText>hire</LogoText>
					<LogoX>X</LogoX>
				</LogoWrap>
				<NavInner>
					<Join>Join now</Join>
					<SignIn onClick={() => props.signIn()}>Sign in</SignIn>
				</NavInner>
			</Nav>
			<Section>
				<Hero>
					<HeroText>
						<Title>Find your next<br/><span>great opportunity</span></Title>
						<Subtitle>Join hireX to connect, share, and discover the world's most innovative professionals. A dedicated ecosystem for quality hiring and role matching.</Subtitle>
						
						<NoticeCard>
							<NoticeHeading>
								<NoticeIcon>⚠️</NoticeIcon>
								Experienced Professionals Only
							</NoticeHeading>
							<NoticeText>
								Only verified businesses and working professionals (3+ Yrs) are allowed to sign up. Freshers are currently out of scope for this platform version.
							</NoticeText>
						</NoticeCard>

						<Divider>
							<span>Get started</span>
						</Divider>

						<Form>
							<Google onClick={() => props.signIn()}>
								<img src="/images/google.svg" alt="Google" />
								Sign in with Google
							</Google>
						</Form>
						
						<TrustRow>
							<TrustItem><span className="icon">🔒</span> Enterprise-grade security</TrustItem>
							<TrustItem><span className="icon">✓</span> 50k+ verified professionals</TrustItem>
						</TrustRow>
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
