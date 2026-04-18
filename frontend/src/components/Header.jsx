import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOutAPI } from "../action";

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
		<div
			className="border-b border-white/5 px-6 sticky top-0 left-0 z-[100] transition-colors duration-300"
			style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)" }}
		>
			<div className="flex items-center justify-between mx-auto h-16 max-w-[1400px]">
				{/* Logo */}
				<Link to="/feed" className="flex items-center no-underline mr-6 flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]">
					<span className="text-[24px] font-bold tracking-[-0.5px]" style={{ color: "var(--nav-text-color)" }}>hire</span>
					<span className="text-[28px] font-extrabold ml-[-2px]" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>X</span>
				</Link>

				{/* Search Bar — grows in the middle */}
				<div className="flex-1 flex justify-center max-w-[320px] relative mx-6">
					<div className="relative w-full">
						<div className="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none">
							<img src="/images/search-icon.svg" alt="" className="w-4 h-4 opacity-50" style={{ filter: "var(--icon-filter)" }} />
						</div>
						<input
							type="text"
							placeholder="Search jobs, companies, skills..."
							className="w-full h-10 pl-9 pr-3 rounded-lg text-sm font-normal transition-all duration-300 border-none outline-none"
							style={{
								background: "var(--input-bg)",
								color: "var(--input-text)",
							}}
							onFocus={(e) => { e.currentTarget.style.background = "var(--input-focus)"; e.currentTarget.style.outline = "1px solid rgba(155,79,223,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(155,79,223,0.08)"; }}
							onBlur={(e) => { e.currentTarget.style.background = "var(--input-bg)"; e.currentTarget.style.outline = "none"; e.currentTarget.style.boxShadow = "none"; }}
						/>
					</div>
				</div>

				{/* Nav Items */}
				<nav className="flex items-center h-full flex-shrink-0">
					<ul className="flex items-center h-full list-none m-0 gap-1">
						{/* Theme Toggle */}
						<li className="flex items-center h-full">
							<button
								onClick={toggleTheme}
								className="flex flex-col items-center justify-center min-w-[80px] h-full text-[12px] font-medium transition-all duration-200 cursor-pointer bg-transparent border-none px-2"
								style={{ color: "var(--text-secondary)" }}
								onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nav-text-color)"; }}
								onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
							>
								{theme === 'dark' ? (
									<svg className="w-5 h-5 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
									</svg>
								) : (
									<svg className="w-5 h-5 mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
									</svg>
								)}
								<span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
							</button>
						</li>

						{/* Messages */}
						<li className={`flex items-center h-full relative ${window.location.pathname === '/messages' ? 'after:content-[""] after:absolute after:bottom-0 after:left-[10%] after:w-[80%] after:h-[2px] after:rounded-t-[2px] after:[background:var(--gradient-accent)]' : ''}`}>
							<Link
								to="/messages"
								className="flex flex-col items-center justify-center min-w-[80px] h-full text-[12px] font-medium no-underline transition-all duration-200 px-2"
								style={{ color: window.location.pathname === '/messages' ? "var(--nav-text-color)" : "var(--text-secondary)" }}
								onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nav-text-color)"; }}
								onMouseLeave={(e) => { e.currentTarget.style.color = window.location.pathname === '/messages' ? "var(--nav-text-color)" : "var(--text-secondary)"; }}
							>
								<img src="/images/nav-messaging.svg" alt="" className="w-5 h-5 mb-1" style={{ filter: "var(--icon-filter)" }} />
								<span>Messages</span>
							</Link>
						</li>

						{/* Profile with sign out dropdown */}
						<li className={`flex items-center h-full relative group ${window.location.pathname === '/profile' ? 'after:content-[""] after:absolute after:bottom-0 after:left-[10%] after:w-[80%] after:h-[2px] after:rounded-t-[2px] after:[background:var(--gradient-accent)]' : ''}`}>
							<Link
								to="/profile"
								className="flex flex-row items-center justify-center min-w-[80px] h-full text-[12px] font-semibold no-underline transition-all duration-200 px-3"
								style={{ color: window.location.pathname === '/profile' ? "var(--nav-text-color)" : "var(--text-secondary)" }}
								onMouseEnter={(e) => { e.currentTarget.style.color = "var(--nav-text-color)"; }}
								onMouseLeave={(e) => { e.currentTarget.style.color = window.location.pathname === '/profile' ? "var(--nav-text-color)" : "var(--text-secondary)"; }}
							>
								{props.user && props.user.photoURL
									? <img src={props.user.photoURL} alt="" className="w-7 h-7 rounded-full mr-2 border-2 border-transparent transition-all duration-300 group-hover:border-[var(--accent-purple)]" />
									: <img src="/images/user.svg" alt="" className="w-7 h-7 rounded-full mr-2 border-2 border-transparent transition-all duration-300 group-hover:border-[var(--accent-purple)]" style={{ filter: "var(--icon-filter)" }} />
								}
								<span>Profile</span>
							</Link>
							{/* Sign Out Dropdown */}
							<div className="absolute top-[68px] right-0 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl w-[130px] py-1 hidden group-hover:flex flex-col z-[200] shadow-[var(--card-shadow-hover)]">
								<button
									onClick={() => props.signOut()}
									className="w-full px-4 py-2.5 text-[13px] font-semibold text-left cursor-pointer bg-transparent border-none transition-all duration-[180ms] rounded-xl"
									style={{ color: "var(--text-card-primary)" }}
									onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--accent-purple)"; }}
									onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-card-primary)"; }}
								>
									Sign Out
								</button>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
