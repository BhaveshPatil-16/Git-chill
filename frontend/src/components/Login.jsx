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
				<a href="/" className="flex items-center no-underline transition-transform duration-[180ms] hover:scale-[1.03]">
					<span className="text-[30px] font-bold text-white tracking-[-1px]">hire</span>
					<span className="text-[36px] font-extrabold ml-[-2px]" style={{ background: "linear-gradient(135deg, #b47aef 0%, #5b9cf5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>X</span>
				</a>
				<div className="flex items-center gap-2">
					<button
						onClick={() => navigate('/signup')}
						className="text-[15px] px-[22px] py-[10px] rounded-lg text-white/70 font-medium transition-all duration-[180ms] cursor-pointer hover:bg-white/[0.08] hover:text-white tracking-[-0.01em]"
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
						onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(155,79,223,0.4), 0 0 0 1px rgba(155,79,223,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
						onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(155,79,223,0.25), 0 0 0 1px rgba(155,79,223,0.1)"; e.currentTarget.style.transform = ""; }}
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
						<h1 className="text-[36px] md:text-[54px] text-white font-extrabold leading-[1.1] mb-5 tracking-[-0.045em]">
							Find your next<br/>
							<span style={{ background: "linear-gradient(135deg, #c084fc 0%, #60a5fa 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
								great opportunity
							</span>
						</h1>
						<p className="text-[17px] leading-[1.65] text-white/65 mb-9 max-w-[430px] font-normal tracking-[-0.01em]">
							Join hireX to connect, share, and discover the world's most innovative professionals. A dedicated ecosystem for quality hiring and role matching.
						</p>

						{/* Glass Notice Card */}
						<div
							className="mb-7 w-full max-w-[430px] p-[18px_20px] rounded-2xl border transition-all duration-[260ms]"
							style={{
								background: "rgba(255,255,255,0.04)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								border: "1px solid rgba(155,79,223,0.18)",
								boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
							}}
						>
							<h4 className="text-[#ede9fe] text-[14px] mb-1.5 font-bold tracking-[-0.02em] flex items-center gap-1.5">
								<span className="text-[16px]">⚠️</span>
								Experienced Professionals Only
							</h4>
							<p className="text-[#d1d5db] text-[13px] leading-[1.6] font-normal tracking-[-0.01em]">
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
								onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(155,79,223,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
								onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(155,79,223,0.25)"; e.currentTarget.style.transform = ""; }}
							>
								Get Started
							</button>
						</div>

						{/* Trust Row */}
						<div className="flex items-center gap-5 mt-7" style={{ animation: "slideUp 0.7s ease-out 0.4s both" }}>
							<div className="flex items-center gap-1.5 text-[12px] text-white/40 font-medium tracking-[-0.01em]">
								<span className="text-[14px] opacity-70">🔒</span> Enterprise-grade security
							</div>
							<div className="flex items-center gap-1.5 text-[12px] text-white/40 font-medium tracking-[-0.01em]">
								<span className="text-[14px] opacity-70">✓</span> 50k+ verified professionals
							</div>
						</div>
					</div>

					{/* Right: Hero Image */}
					<div className="w-full flex justify-center md:w-[45%]" style={{ animation: "slideUp 0.7s ease-out 0.2s both" }}>
						<div className="relative w-full max-w-[480px]">
							{/* Glow behind image */}
							<div
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full -z-10"
								style={{ background: "radial-gradient(circle, rgba(155,79,223,0.12) 0%, rgba(54,116,224,0.06) 40%, transparent 70%)", filter: "blur(40px)" }}
							/>
							<img
								src="/images/login-hero.svg"
								alt="Professionals connecting"
								className="w-full"
								style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))" }}
							/>
						</div>
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
