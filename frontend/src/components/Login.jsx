import React from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Login(props) {
	const navigate = useNavigate();

	if (props.user) {
		return <Navigate to="/feed" />;
	}

	return (
		<div className="min-h-screen relative overflow-hidden pt-[10px]">
			{/* Radial glows */}
			<div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(155,79,223,0.08) 0%, transparent 70%)" }} />
			<div className="absolute top-[40%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(54,116,224,0.06) 0%, transparent 70%)" }} />

			{/* Nav */}
			<nav className="max-w-[1128px] mx-auto py-4 px-6 flex flex-nowrap items-center justify-between relative z-10">
				<a href="/" className="flex items-center no-underline duration-[180ms]">
					<span className="text-[30px] font-extrabold" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>H</span>
					<span className="text-[30px] font-bold tracking-[-1px]" style={{ color: "var(--nav-text-color)" }}>ire</span>
					<span className="text-[36px] font-extrabold ml-[-2px]" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>X</span>
				</a>
				<div className="flex items-center gap-2">
					<button
						onClick={() => navigate('/signup')}
						className="text-[15px] px-[22px] py-[10px] rounded-lg font-medium transition-all duration-[180ms] cursor-pointer hover:bg-black/5 dark:hover:bg-white/[0.08] tracking-[-0.01em]"
						style={{ color: "var(--text-secondary)" }}
					>
						Join now
					</button>
					<button
						onClick={() => navigate('/signin')}
						className="rounded-[24px] text-white text-[14px] font-semibold transition-all duration-[180ms] px-7 py-[10px] text-center cursor-pointer tracking-[-0.01em] inline-flex items-center"
						style={{
							background: "var(--gradient-accent)",
							boxShadow: "0 2px 16px rgba(155,79,223,0.25), 0 0 0 1px rgba(155,79,223,0.1)",
						}}
						onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(155,79,223,0.4), 0 0 0 1px rgba(155,79,223,0.2)"; }}
						onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(155,79,223,0.25), 0 0 0 1px rgba(155,79,223,0.1)"; }}
					>
						Sign in
					</button>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="flex flex-col min-h-0 pt-[40px] pb-[138px] relative w-full max-w-[1128px] items-center mx-auto md:flex-row md:min-h-[700px] md:pt-[80px] z-[1]">
				<div className="w-full flex flex-col items-center px-6 text-center md:flex-row md:justify-between md:text-left">

					{/* Left: Text + CTA */}
					<div className="w-full mb-10 md:w-1/2 md:mb-0 flex flex-col items-center md:items-start" style={{ animation: "slideUp 0.7s ease-out both" }}>
						<h1 className="text-[36px] md:text-[64px] font-black leading-[1.05] mb-6 tracking-[-0.05em]" style={{ color: "var(--text-primary)" }}>
							Connect with<br/>
							<span style={{ background: "linear-gradient(135deg, #c084fc 0%, #6366f1 50%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
								Top Talent
							</span>
						</h1>
						<p className="text-[18px] leading-[1.65] mb-9 max-w-[480px] font-medium tracking-tight" style={{ color: "var(--text-secondary)" }}>
							The exclusive ecosystem where the world's most innovative professionals and businesses discover, verify, and hire each other.
						</p>

						{/* Glass Notice Card */}
						<div
							className="mb-7 w-full max-w-[430px] p-[18px_20px] rounded-2xl border transition-all duration-[260ms]"
							style={{
								background: "var(--bg-card)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								border: "1px solid var(--border-color)",
								boxShadow: "var(--card-shadow)",
							}}
						>
							<h4 className="text-[14px] mb-1.5 font-bold tracking-[-0.02em] flex items-center gap-1.5" style={{ color: "var(--text-card-primary)" }}>
								<span className="text-[16px]">⚠️</span>
								Experienced Professionals Only
							</h4>
							<p className="text-[13px] leading-[1.6] font-normal tracking-[-0.01em]" style={{ color: "var(--text-card-secondary)" }}>
								Only verified businesses and working professionals (3+ Yrs) are allowed to sign up. Freshers are currently out of scope for this platform version.
							</p>
						</div>

						{/* Get Started Button */}
						<div className="w-full max-w-[400px] flex gap-4">
							<button
								onClick={() => navigate('/signup')}
								className="flex-1 flex justify-center items-center h-14 rounded-[32px] transition-all duration-300 text-[18px] text-white font-semibold cursor-pointer tracking-[-0.01em]"
								style={{
									background: "var(--gradient-accent)",
									boxShadow: "0 2px 16px rgba(155,79,223,0.25)",
								}}
								onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(155,79,223,0.4)"; }}
								onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(155,79,223,0.25)"; }}
							>
								Get Started
							</button>
						</div>

						{/* Trust Row */}
						<div className="flex flex-col gap-6 mt-12 w-full" style={{ animation: "slideUp 0.7s ease-out 0.4s both" }}>
							<div className="flex items-center gap-8">
								<div className="flex flex-col">
									<span className="text-[24px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>50k+</span>
									<span className="text-[12px] uppercase tracking-widest font-bold" style={{ color: "var(--text-card-muted)" }}>Professionals</span>
								</div>
								<div className="w-[1px] h-8" style={{ background: "var(--border-color)" }} />
								<div className="flex flex-col">
									<span className="text-[24px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>12k+</span>
									<span className="text-[12px] uppercase tracking-widest font-bold" style={{ color: "var(--text-card-muted)" }}>Verified Orgs</span>
								</div>
								<div className="w-[1px] h-8" style={{ background: "var(--border-color)" }} />
								<div className="flex flex-col">
									<span className="text-[24px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>98%</span>
									<span className="text-[12px] uppercase tracking-widest font-bold" style={{ color: "var(--text-card-muted)" }}>Match Rate</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Hero Image Container */}
					<div className="w-full flex justify-center md:w-[50%]" style={{ animation: "slideUp 0.7s ease-out 0.2s both" }}>
						<div className="relative w-full max-w-[540px]">
							<div
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full -z-10"
								style={{ background: "radial-gradient(circle, rgba(155,79,223,0.15) 0%, rgba(54,116,224,0.08) 40%, transparent 70%)", filter: "blur(60px)" }}
							/>
							<div className="relative animate-subtlePulse">
								<img
									src="/images/login-hero.svg"
									alt="Professionals connecting"
									className="w-full h-auto drop-shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
								/>
								{/* Floating badges */}
								<div className="absolute -top-4 -right-4 backdrop-blur-xl border p-4 rounded-2xl shadow-2xl animate-bounce" style={{ animationDuration: '4s', background: "var(--bg-nav)", borderColor: "var(--border-color)" }}>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white text-[20px]">✓</div>
										<div>
											<div className="text-[12px] font-bold" style={{ color: "var(--text-primary)" }}>Identity Verified</div>
											<div className="text-[10px]" style={{ color: "var(--text-card-muted)" }}>Secure Professional Network</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Expansion: Features Section */}
			<section className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-[120px]">
				<div className="text-center mb-16">
					<h2 className="text-[32px] md:text-[42px] font-black tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>Built for the Modern Professional</h2>
					<p className="max-w-[600px] mx-auto" style={{ color: "var(--text-secondary)" }}>Experience a platform that prioritizes authenticity, security, and quality connections over noise.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{ title: "Smart Matching", icon: "🧠", desc: "Our AI-driven engine connects you with roles that truly match your verified skill set and experience level." },
						{ title: "Direct Networking", icon: "🤝", desc: "Skip the middlemen. Connect directly with hiring managers and founders in a high-signal environment." },
						{ title: "Identity Guard", icon: "🛡️", desc: "Every profile undergoes a mandatory identity verification process to ensure zero spam and 100% authenticity." }
					].map((feature, i) => (
						<div 
							key={i} 
							className="p-8 rounded-[32px] transition-all duration-300 group border"
							style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
						>
							<div className="text-[40px] mb-6 inline-block">{feature.icon}</div>
							<h3 className="text-[20px] font-bold mb-3 tracking-tight" style={{ color: "var(--text-card-primary)" }}>{feature.title}</h3>
							<p className="leading-relaxed text-[14px]" style={{ color: "var(--text-card-secondary)" }}>{feature.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Final CTA */}
			<section className="relative z-10 w-full max-w-[1128px] mx-auto px-6 pb-[160px]">
				<div className="bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] border border-white/5 rounded-[48px] p-12 md:p-20 text-center overflow-hidden relative">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,79,223,0.1)_0%,transparent_70%)]" />
					<div className="relative z-10">
						<h2 className="text-[36px] md:text-[52px] font-black text-white tracking-tighter mb-6">Ready to elevate your career?</h2>
						<p className="text-white/70 text-[18px] mb-10 max-w-[500px] mx-auto">Join thousands of verified professionals already on the platform.</p>
						<button 
							onClick={() => navigate('/signup')}
							className="h-16 px-12 rounded-full bg-white text-black font-black text-[18px] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
						>
							Create Free Account
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.userState.user,
});

export default connect(mapStateToProps)(Login);
