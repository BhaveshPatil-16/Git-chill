import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
	position: fixed;
	top: 64px; /* header height */
	left: 0;
	width: var(--sidebar-width);
	height: calc(100vh - 64px);
	background-color: var(--bg-nav);
	backdrop-filter: blur(10px);
	border-right: 1px solid var(--border-color);
	display: flex;
	flex-direction: column;
	padding: 24px 16px;
	gap: 24px;
	overflow-y: auto;
	overflow-x: hidden;
	z-index: 50;
	transition: all 0.3s ease;
	
	/* Hide scrollbar */
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
	
	@media (max-width: 768px) {
		transform: translateX(-100%);
	}
	
	.hide-on-close {
		transition: opacity 0.2s ease;
	}
	
	body.sidebar-closed & .hide-on-close {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		display: none;
	}
	/* Ensure container is clickable when closed */
	body.sidebar-closed & {
		cursor: pointer;
		
		&:hover {
			background-color: var(--input-bg);
		}
	}
`;

const SidebarControls = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: -12px;
	
	body.sidebar-closed & {
		display: none;
	}
`;

const CloseButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: var(--text-secondary);
	padding: 4px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	transition: background 0.2s, color 0.2s;
	
	&:hover {
		background: var(--bg-card);
		color: var(--text-primary);
	}
	
	svg {
		width: 20px;
		height: 20px;
		stroke-width: 2.5;
	}
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 1px solid var(--border-color);
	transition: transform 0.2s;
	
	&:hover {
		transform: scale(1.02);
	}
`;

const Avatar = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: var(--gradient-accent);
	margin-bottom: 12px;
	border: 4px solid var(--bg-primary);
	overflow: hidden;
	box-shadow: var(--card-shadow);
	transition: width 0.3s ease, height 0.3s ease;
	
	body.sidebar-closed & {
		width: 48px;
		height: 48px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Name = styled.h2`
	font-size: 18px;
	font-weight: 700;
	color: var(--text-primary);
	margin-bottom: 4px;
	white-space: nowrap;
`;

const Title = styled.p`
	font-size: 13px;
	color: var(--text-secondary);
	text-align: center;
	white-space: nowrap;
`;

const NavMenu = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const NavLink = styled.a`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-radius: 12px;
	color: var(--text-secondary);
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	transition: all 0.2s ease-in-out;
	
	&:hover, &.active {
		background: rgba(168, 85, 247, 0.15);
		color: var(--accent-purple);
		transform: translateX(4px);
	}
	svg {
		margin-right: 14px;
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		transition: transform 0.2s;
		color: var(--text-secondary);
	}
	
	&:hover svg, &.active svg {
		transform: scale(1.1);
		color: var(--accent-purple);
	}

	span {
		white-space: nowrap;
	}
	
	body.sidebar-closed & {
		justify-content: center;
		padding: 12px 0;
		
		svg {
			margin-right: 0;
			width: 24px;
			height: 24px;
		}
	}
`;

const AITipWidget = styled.div`
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
	border-left: 4px solid var(--accent-blue);
	border-radius: 12px;
	padding: 16px;
	margin-top: auto; /* pushes it down */
	transition: transform 0.2s, box-shadow 0.2s;
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0,0,0,0.1);
	}
`;

const WidgetHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	font-weight: 700;
	color: var(--accent-blue);
	margin-bottom: 8px;
	text-transform: uppercase;
`;

const TipText = styled.p`
	font-size: 13px;
	color: var(--text-primary);
	line-height: 1.5;
	font-weight: 500;
`;

const TipAction = styled.button`
	background: var(--accent-blue);
	color: white;
	border: none;
	padding: 8px 12px;
	border-radius: 8px;
	font-size: 12px;
	font-weight: 600;
	margin-top: 12px;
	cursor: pointer;
	box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
	transition: all 0.2s;
	width: 100%;
	
	&:hover {
		background: #2563eb;
		transform: scale(1.02);
	}
`;

const RewardWidget = styled.div`
	background: linear-gradient(135deg, #0f172a, #1e1b4b);
	border-radius: 12px;
	padding: 16px;
	color: white;
	transition: transform 0.2s, box-shadow 0.2s;
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0,0,0,0.2);
	}
`;

const RewardTitle = styled.h3`
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const RewardDesc = styled.p`
	font-size: 12px;
	color: rgba(255,255,255,0.7);
	line-height: 1.5;
	margin-bottom: 12px;
`;

const ReferralCodeBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(255, 255, 255, 0.1);
	border: 1px dashed rgba(255, 255, 255, 0.3);
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	transition: background 0.2s;
	
	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
	
	span {
		font-family: monospace;
		font-weight: bold;
		font-size: 14px;
	}
	
	button {
		background: transparent;
		color: #fff;
		border: none;
		font-size: 12px;
		font-weight: 700;
		cursor: pointer;
	}
`;

function Left(props) {
	const handleSidebarClick = () => {
		if (document.body.classList.contains('sidebar-closed')) {
			document.body.classList.remove('sidebar-closed');
		}
	};

	const closeSidebar = (e) => {
		e.stopPropagation();
		document.body.classList.add('sidebar-closed');
	};

	return (
		<Container onClick={handleSidebarClick}>
			<SidebarControls className="hide-on-close">
				<CloseButton onClick={closeSidebar}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</CloseButton>
			</SidebarControls>
			
			<UserInfo>
				<Avatar>
					{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
				</Avatar>
				<Name className="hide-on-close">{props.user ? props.user.displayName : "Guest User"}</Name>
				<Title className="hide-on-close">Software Engineer | Open to Opportunities</Title>
			</UserInfo>
			
			<NavMenu>
				<NavLink href="/feed" className={window.location.pathname === "/feed" ? "active" : ""}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
					<span className="hide-on-close">Feed & Opportunities</span>
				</NavLink>
				<NavLink href="/messages" className={window.location.pathname === "/messages" ? "active" : ""}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
					<span className="hide-on-close">Messages</span>
				</NavLink>
				<NavLink href="/profile" className={window.location.pathname === "/profile" ? "active" : ""}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
					<span className="hide-on-close">My Profile</span>
				</NavLink>
				<NavLink href="/events" className={window.location.pathname === "/events" ? "active" : ""}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
					<span className="hide-on-close">Events & Webinars</span>
				</NavLink>
			</NavMenu>
			
			<AITipWidget className="hide-on-close">
				<WidgetHeader>✨ AI SMART TIP</WidgetHeader>
				<TipText>Adding "Node.js" and "SQL" will increase your match rate with top startups by 42%.</TipText>
				<TipAction>Update Profile</TipAction>
			</AITipWidget>
			
			<RewardWidget className="hide-on-close">
				<RewardTitle>🎁 Invite & Earn</RewardTitle>
				<RewardDesc>Earn $50 platform credit when a referred professional gets verified.</RewardDesc>
				<ReferralCodeBox>
					<span>HIREX-X9</span>
					<button>Copy</button>
				</ReferralCodeBox>
			</RewardWidget>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Left);
