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
	backdrop-filter: blur(16px) saturate(1.3);
	-webkit-backdrop-filter: blur(16px) saturate(1.3);
	border-right: 1px solid var(--border-color);
	display: flex;
	flex-direction: column;
	padding: 20px 14px;
	gap: 20px;
	overflow-y: auto;
	overflow-x: hidden;
	z-index: 50;
	transition: all var(--transition-normal);
	
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
	margin-bottom: -8px;
	
	body.sidebar-closed & {
		display: none;
	}
`;

const CloseButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: var(--text-secondary);
	padding: 6px;
	border-radius: var(--radius-sm);
	display: flex;
	align-items: center;
	transition: all var(--transition-fast);
	
	&:hover {
		background: rgba(255, 255, 255, 0.06);
		color: var(--text-primary);
	}
	
	svg {
		width: 18px;
		height: 18px;
		stroke-width: 2.5;
	}
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px 0 20px;
	border-bottom: 1px solid var(--border-color);
	transition: transform var(--transition-fast);
	
	&:hover {
		transform: scale(1.01);
	}
`;

const Avatar = styled.div`
	width: 72px;
	height: 72px;
	border-radius: 50%;
	background: var(--gradient-accent);
	margin-bottom: 12px;
	border: 3px solid rgba(155, 79, 223, 0.2);
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(155, 79, 223, 0.15);
	transition: width var(--transition-normal), height var(--transition-normal);
	
	body.sidebar-closed & {
		width: 44px;
		height: 44px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Name = styled.h2`
	font-size: 16px;
	font-weight: 700;
	color: var(--text-primary);
	margin-bottom: 4px;
	white-space: nowrap;
	letter-spacing: -0.02em;
`;

const Title = styled.p`
	font-size: 12px;
	color: var(--text-secondary);
	text-align: center;
	white-space: nowrap;
	letter-spacing: -0.01em;
`;

const NavMenu = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const NavLink = styled.a`
	display: flex;
	align-items: center;
	padding: 10px 14px;
	border-radius: var(--radius-md);
	color: var(--text-secondary);
	text-decoration: none;
	font-size: 13.5px;
	font-weight: 500;
	transition: all var(--transition-fast);
	letter-spacing: -0.01em;
	
	&:hover, &.active {
		background: rgba(155, 79, 223, 0.1);
		color: var(--accent-purple);
		transform: translateX(2px);
	}
	svg {
		margin-right: 12px;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		transition: transform var(--transition-fast);
		color: var(--text-secondary);
		stroke-width: 2;
	}
	
	&:hover svg, &.active svg {
		transform: scale(1.08);
		color: var(--accent-purple);
	}

	span {
		white-space: nowrap;
	}
	
	body.sidebar-closed & {
		justify-content: center;
		padding: 10px 0;
		
		svg {
			margin-right: 0;
			width: 22px;
			height: 22px;
		}
	}
`;

const AITipWidget = styled.div`
	background: linear-gradient(135deg, rgba(54, 116, 224, 0.08), rgba(155, 79, 223, 0.08));
	border: 1px solid rgba(155, 79, 223, 0.12);
	border-radius: var(--radius-md);
	padding: 16px;
	margin-top: auto; /* pushes it down */
	transition: all var(--transition-normal);
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0,0,0,0.08);
		border-color: rgba(155, 79, 223, 0.2);
	}
`;

const WidgetHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 11px;
	font-weight: 700;
	color: var(--accent-blue);
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

const TipText = styled.p`
	font-size: 12.5px;
	color: var(--text-primary);
	line-height: 1.55;
	font-weight: 400;
	letter-spacing: -0.01em;
`;

const TipAction = styled.button`
	background: var(--gradient-accent);
	color: white;
	border: none;
	padding: 8px 12px;
	border-radius: var(--radius-sm);
	font-size: 12px;
	font-weight: 600;
	margin-top: 12px;
	cursor: pointer;
	box-shadow: 0 2px 8px rgba(155, 79, 223, 0.2);
	transition: all var(--transition-fast);
	width: 100%;
	letter-spacing: -0.01em;
	
	&:hover {
		box-shadow: 0 4px 16px rgba(155, 79, 223, 0.35);
		transform: translateY(-1px);
	}
	
	&:active {
		transform: translateY(0) scale(0.98);
	}
`;

const RewardWidget = styled.div`
	background: linear-gradient(145deg, #0e1425, #1a1540);
	border: 1px solid rgba(255, 255, 255, 0.06);
	border-radius: var(--radius-md);
	padding: 16px;
	color: white;
	transition: all var(--transition-normal);
	
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.15);
	}
`;

const RewardTitle = styled.h3`
	font-size: 13px;
	font-weight: 700;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	letter-spacing: -0.01em;
`;

const RewardDesc = styled.p`
	font-size: 11.5px;
	color: rgba(255,255,255,0.6);
	line-height: 1.55;
	margin-bottom: 12px;
`;

const ReferralCodeBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(255, 255, 255, 0.06);
	border: 1px dashed rgba(255, 255, 255, 0.2);
	padding: 8px 12px;
	border-radius: var(--radius-sm);
	cursor: pointer;
	transition: background var(--transition-fast);
	
	&:hover {
		background: rgba(255, 255, 255, 0.12);
	}
	
	span {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-weight: bold;
		font-size: 13px;
		letter-spacing: 0.05em;
	}
	
	button {
		background: transparent;
		color: rgba(255,255,255,0.8);
		border: none;
		font-size: 11px;
		font-weight: 700;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		transition: color var(--transition-fast);
		
		&:hover {
			color: #fff;
		}
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
				<WidgetHeader>✨ AI Smart Tip</WidgetHeader>
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
