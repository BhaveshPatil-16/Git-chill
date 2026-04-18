import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../action";

const Container = styled.div`
	background: var(--bg-nav);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border-bottom: 1px solid var(--border-color);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;
	transition: background 0.3s ease;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	height: 64px;
	max-width: 1400px;
`;

const LogoWrap = styled.a`
	display: flex;
	align-items: center;
	text-decoration: none;
	margin-right: 24px;
	transition: transform 0.2s ease;
	&:hover {
		transform: scale(1.02);
	}
`;

const LogoText = styled.span`
	font-size: 26px;
	font-weight: 700;
	color: var(--nav-text-color);
	letter-spacing: -0.5px;
`;

const LogoX = styled.span`
	font-size: 30px;
	font-weight: 800;
	background: var(--gradient-accent);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-left: -2px;
`;


const Search = styled.div`
	opacity: 1;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	position: relative;
	margin: 0 24px;
	@media (max-width: 768px) {
		flex-grow: unset;
		margin: 0 8px;
	}
	& > div {
		max-width: 320px;
		input {
			border: none;
			box-shadow: none;
			background-color: var(--input-bg);
			border-radius: 8px;
			color: var(--input-text);
			width: 100%;
			padding: 0 8px 0 44px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 40px;
			vertical-align: text-top;
			transition: all 0.3s ease;
			&::placeholder {
				color: var(--text-secondary);
			}
			&:focus {
				background-color: var(--input-focus);
				outline: 1px solid var(--accent-purple);
			}
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	position: absolute;
	top: 12px;
	left: 8px;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		filter: var(--icon-filter);
		width: 16px;
	}
`;

const Nav = styled.nav`
	display: block;
	height: 100%;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 60px;
		background: var(--bg-nav);
		backdrop-filter: blur(10px);
		width: 100%;
		border-top: 1px solid var(--border-color);
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	margin: 0;
	
	.active {
		span {
			color: var(--nav-text-color);
			font-weight: 600;
		}
		img, .icon-svg {
			filter: var(--icon-hover);
			stroke: var(--nav-text-color);
		}
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 10%;
			width: 80%;
			height: 3px;
			background: var(--gradient-accent);
			border-radius: 3px 3px 0 0;
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	position: relative;
	height: 100%;
	margin: 0 4px;
	a, button {
		align-items: center;
		background: transparent;
		border: none;
		display: flex;
		flex-direction: column;
		font-size: 13px;
		font-weight: 500;
		justify-content: center;
		min-width: 90px;
		height: 100%;
		text-decoration: none;
		transition: all 0.2s ease;
		cursor: pointer;
		
		img, .icon-svg {
			width: 22px;
			height: 22px;
			filter: var(--icon-filter);
			stroke: var(--text-secondary);
			margin-bottom: 6px;
			transition: all 0.2s ease;
		}

		span {
			color: var(--text-secondary);
			transition: all 0.2s ease;
		}

		&:hover {
			span { color: var(--nav-text-color); }
			img, .icon-svg { filter: var(--icon-hover); stroke: var(--nav-text-color); transform: translateY(-2px); }
		}

		@media (max-width: 768px) {
			min-width: 80px;
			font-size: 11px;
			img, .icon-svg {
				width: 20px;
				height: 20px;
				margin-bottom: 4px;
			}
		}
	}
`;

const SignOut = styled.div`
	position: absolute;
	top: 68px;
	background: var(--bg-card);
	border: 1px solid var(--border-card);
	border-radius: 8px;
	width: 120px;
	height: 44px;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	display: none;
	z-index: 15;
	box-shadow: var(--card-shadow);
	a {
		color: var(--text-card-primary);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 40px;
		&:hover {
			background: rgba(0,0,0,0.05);
			border-radius: 8px;
			color: var(--accent-purple);
		}
	}
`;

const User = styled(NavList)`
	a {
		flex-direction: row;
		padding: 0 12px;
	}
	a > img {
		border-radius: 50%;
		width: 32px;
		height: 32px;
		filter: none !important;
		margin-bottom: 0;
		margin-right: 8px;
		border: 2px solid transparent;
		transition: all 0.3s ease;
		transform: none !important;
	}
	a > span {
		font-weight: 600;
	}
	&:hover {
		a > img {
			border-color: var(--accent-purple);
		}
		${SignOut} {
			@media (min-width: 768px) {
				display: flex;
			}
		}
	}
`;

function Header(props) {
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark';
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return (
		<Container>
			<Content>
				<LogoWrap href="/feed">
					<LogoText>hire</LogoText>
					<LogoX>X</LogoX>
				</LogoWrap>
				<Search>
					<div>
						<input type="text" placeholder="Search jobs, companies, skills..." />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="" />
					</SearchIcon>
				</Search>
				
				<Nav>
					<NavListWrap>
						{/* Theme Toggle Button Replacing Home */}
						<NavList>
							<button onClick={toggleTheme}>
								{theme === 'dark' ? (
									<svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
								) : (
									<svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
								)}
								<span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
							</button>
						</NavList>
						
						<NavList className={window.location.pathname === "/messages" ? "active" : ""}>
							<a href="/messages">
								<img src="/images/nav-messaging.svg" alt="" />
								<span>Messages</span>
							</a>
						</NavList>
						
						<User className={window.location.pathname === "/profile" ? "active" : ""}>
							<a href="/profile">
								{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>Profile</span>
							</a>
							<SignOut onClick={() => props.signOut()}>
								<a href="#!">Sign Out</a>
							</SignOut>
						</User>
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
