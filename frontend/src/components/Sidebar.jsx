import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, ShoppingBag, Calendar, LayoutDashboard, ShieldCheck, Building2, Users, Zap, MessageSquare, User } from "lucide-react";

function Sidebar({ user, showJobs }) {
	const location = useLocation();
	const handleSidebarClick = () => {
		if (document.body.classList.contains('sidebar-closed')) {
			document.body.classList.remove('sidebar-closed');
		}
	};

	const closeSidebar = (e) => {
		e.stopPropagation();
		document.body.classList.add('sidebar-closed');
	};

	const mainMenu = [
		{ path: "/feed", icon: Home, label: "Feed & Opportunities" },
		{ path: "/investment-hub", icon: TrendingUp, label: "Investment Hub", highlight: true },
		{ path: "/marketplace", icon: ShoppingBag, label: "Opportunity Marketplace" },
		{ path: "/messages", icon: MessageSquare, label: "Messages" },
		{ path: "/events", icon: Calendar, label: "Events & Webinars" },
	];

	const businessMenu = [
		{ path: "/organizer", icon: LayoutDashboard, label: "Organizer Portal" },
		{ path: "/verify-founder", icon: ShieldCheck, label: "Verify Entity" },
		{ path: "/business", icon: Building2, label: "Business Exchange" },
		{ path: "/referrals", icon: Users, label: "Referral System" },
		{ path: "/promotions", icon: Zap, label: "Promoted Reach" },
	];

	return (
		<div 
			style={{
				background: "var(--bg-nav)",
				backdropFilter: "blur(20px) saturate(1.4)",
				WebkitBackdropFilter: "blur(20px) saturate(1.4)",
			}}
			className="fixed top-16 left-0 w-[280px] h-[calc(100vh-64px)] border-r border-white/5 flex flex-col px-4 py-6 gap-6 overflow-y-auto overflow-x-hidden z-50 transition-all duration-300 -translate-x-full md:translate-x-0 group"
		>
			
			<div className="flex flex-col items-center pb-5 border-b border-black/5 dark:border-white/5 duration-200">
				<div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a855f7] to-[#3b82f6] mb-3 border-4 border-bg-primary overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group-[.sidebar-closed]:w-12 group-[.sidebar-closed]:h-12">
					{user && user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <img src="/images/user.svg" alt="" className="w-full h-full object-cover" />}
				</div>
				<h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-1 whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">{user ? user.displayName : "Guest User"}</h2>
				<p className="text-[13px] text-[var(--text-secondary)] text-center whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">
					{user?.role === 'business_owner' ? 'Business Founder' : 'Verified Professional'}
				</p>
			</div>
			
			<nav className="flex flex-col gap-2">
				{mainMenu.map((item) => (
					<Link 
						key={item.path}
						to={item.path} 
						className={`flex items-center px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] ${location.pathname === item.path ? 'bg-[#a855f7]/15 text-[#a855f7]' : 'text-[var(--text-card-secondary)]'} ${item.highlight ? 'border border-[#a855f7]/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : ''}`}
					>
						<item.icon className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${location.pathname === item.path ? 'scale-110' : ''}`} />
						<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">{item.label}</span>
					</Link>
				))}

				{user?.role === 'business_owner' && (
					<div className="pt-4 mt-2 border-t border-white/5 space-y-2">
						<div className="px-4 py-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-[.sidebar-closed]:hidden">Business Portal</div>
						{businessMenu.map((item) => (
							<Link 
								key={item.path}
								to={item.path} 
								className={`flex items-center px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#3b82f6]/15 hover:text-[#3b82f6] ${location.pathname === item.path ? 'bg-[#3b82f6]/15 text-[#3b82f6]' : 'text-[var(--text-card-secondary)]'}`}
							>
								<item.icon className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${location.pathname === item.path ? 'scale-110' : ''}`} />
								<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">{item.label}</span>
							</Link>
						))}
					</div>
				)}

				{user?.role === 'individual' && (
					<Link to="/profile" className={`flex items-center px-4 py-3 rounded-xl text-[var(--text-card-secondary)] text-[14px] font-semibold transition-all duration-200 no-underline group-[.sidebar-closed]:justify-center group-[.sidebar-closed]:px-0 hover:bg-[#a855f7]/15 hover:text-[#a855f7] ${location.pathname === '/profile' ? 'bg-[#a855f7]/15 text-[#a855f7]' : ''}`}>
						<User className={`shrink-0 w-5 h-5 mr-[14px] transition-transform duration-200 group-[.sidebar-closed]:mr-0 group-[.sidebar-closed]:w-6 group-[.sidebar-closed]:h-6 text-current ${location.pathname === '/profile' ? 'scale-110' : ''}`} />
						<span className="whitespace-nowrap transition-opacity duration-200 group-[.sidebar-closed]:opacity-0 group-[.sidebar-closed]:invisible group-[.sidebar-closed]:hidden">My Profile</span>
					</Link>
				)}
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
