import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar(props) {
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
		<div 
			style={{
				background: "var(--bg-nav)",
				backdropFilter: "blur(20px) saturate(1.4)",
				WebkitBackdropFilter: "blur(20px) saturate(1.4)",
			}}
			className="fixed top-16 left-0 w-[280px] h-[calc(100vh-64px)] border-r border-white/5 flex flex-col px-4 py-6 gap-6 overflow-y-auto overflow-x-hidden z-50 transition-all duration-300 -translate-x-full md:translate-x-0"
		>
			
			<div className="flex flex-col items-center pb-5 border-b border-white/5 transition-transform duration-200 hover:scale-[1.02]">
				<div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] mb-3 border-4 border-bg-primary overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group-[.sidebar-closed]:w-12 group-[.sidebar-closed]:h-12">
					{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" className="w-full h-full object-cover" /> : <img src="/images/user.svg" alt="" className="w-full h-full object-cover" />}
				</div>
				<h2 className="text-[18px] font-bold text-white mb-1 whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">{props.user ? props.user.displayName : "Guest User"}</h2>
				<p className="text-[13px] text-white/60 text-center whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">Software Engineer | Open to Opportunities</p>
			</div>
			
			<nav className="flex flex-col gap-2">
				<Link to="/feed" className={`flex items-center px-4 py-3 rounded-xl text-white/60 text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] hover:translate-x-1 ${window.location.pathname === '/feed' ? 'bg-[#a855f7]/15 text-[#a855f7] translate-x-1' : ''}`}>
					<svg className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${window.location.pathname === '/feed' ? 'scale-110' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
					<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">Feed & Opportunities</span>
				</Link>
				<Link to="/messages" className={`flex items-center px-4 py-3 rounded-xl text-white/60 text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] hover:translate-x-1 ${window.location.pathname === '/messages' ? 'bg-[#a855f7]/15 text-[#a855f7] translate-x-1' : ''}`}>
					<svg className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${window.location.pathname === '/messages' ? 'scale-110' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
					<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">Messages</span>
				</Link>
				<Link to="/profile" className={`flex items-center px-4 py-3 rounded-xl text-white/60 text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] hover:translate-x-1 ${window.location.pathname === '/profile' ? 'bg-[#a855f7]/15 text-[#a855f7] translate-x-1' : ''}`}>
					<svg className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${window.location.pathname === '/profile' ? 'scale-110' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
					<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">My Profile</span>
				</Link>
				<Link to="/events" className={`flex items-center px-4 py-3 rounded-xl text-white/60 text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] hover:translate-x-1 ${window.location.pathname === '/events' ? 'bg-[#a855f7]/15 text-[#a855f7] translate-x-1' : ''}`}>
					<svg className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${window.location.pathname === '/events' ? 'scale-110' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
					<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">Events & Webinars</span>
				</Link>
			</nav>
			
			<div className="bg-gradient-to-br from-[#3b82f6]/10 to-[#a855f7]/10 border-l-4 border-[#3b82f6] rounded-xl p-4 mt-auto transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">
				<div className="flex items-center gap-2 text-[12px] font-bold text-[#3b82f6] mb-2 uppercase">✨ AI SMART TIP</div>
				<p className="text-[13px] text-white leading-[1.5] font-medium">Adding "Node.js" and "SQL" will increase your match rate with top startups by 42%.</p>
				<button className="bg-[#3b82f6] text-white border-none px-3 py-2 rounded-lg text-[12px] font-semibold mt-3 cursor-pointer shadow-[0_2px_8px_rgba(59,130,246,0.3)] transition-all duration-200 w-full hover:bg-[#2563eb] hover:scale-[1.02]">Update Profile</button>
			</div>
			
			<div className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] rounded-xl p-4 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">
				<h3 className="text-[14px] font-bold mb-2 flex items-center gap-2">🎁 Invite & Earn</h3>
				<p className="text-[12px] text-white/70 leading-[1.5] mb-3">Earn $50 platform credit when a referred professional gets verified.</p>
				<div className="flex items-center justify-between bg-white/10 border border-dashed border-white/30 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/20">
					<span className="font-mono font-bold text-[14px]">HIREX-X9</span>
					<button className="bg-transparent text-white border-none text-[12px] font-bold cursor-pointer">Copy</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Sidebar);
