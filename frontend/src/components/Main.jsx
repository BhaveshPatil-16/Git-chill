import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   LIQUID MINIMAL NAV
   - Satisfying sliding/stretching motion
   - No gradients, glare, or reflections
───────────────────────────────────────────── */
function LiquidMinimalNav({ activeTab, setActiveTab, showJobs }) {
	const pillRef = useRef(null);
	const btnRefs = useRef({});
	const tabKeys = ["jobs", "market", "network"].filter(k => k !== 'jobs' || showJobs);

	const updatePill = useCallback((key, smooth = true) => {
		const btn = btnRefs.current[key];
		const pill = pillRef.current;
		if (!btn || !pill) return;
		
		pill.style.transition = smooth 
			? "transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.4, 0.64, 1)" 
			: "none";
		pill.style.width = `${btn.offsetWidth}px`;
		pill.style.transform = `translateX(${btn.offsetLeft}px)`;
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => updatePill(activeTab, false), 50);
		return () => clearTimeout(timer);
	}, []); // eslint-disable-line

	useEffect(() => {
		updatePill(activeTab, true);
	}, [activeTab, updatePill]);

	const tabLabels = {
		jobs:    { icon: "💼", label: "Jobs Board" },
		market:  { icon: "🤝", label: "Marketplace" },
		network: { icon: "🌐", label: "Network" },
	};

	return (
		<div
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				padding: "6px",
				borderRadius: "24px",
				background: "var(--bg-subtle)",
				border: "1px solid var(--border-subtle)",
				zIndex: 10,
				width: "100%",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			{/* Liquid Sliding active pill */}
			<div
				ref={pillRef}
				style={{
					position: "absolute",
					top: 6,
					left: 0,
					height: "calc(100% - 12px)",
					background: "var(--text-card-primary)",
					borderRadius: "18px",
					boxShadow: "var(--card-shadow)",
					zIndex: 1,
					willChange: "transform, width",
				}}
			/>

			{/* Tab buttons */}
			<div style={{ position: "relative", display: "flex", width: "100%", zIndex: 2 }}>
				{tabKeys.map((key) => (
					<button
						key={key}
						ref={(el) => (btnRefs.current[key] = el)}
						onClick={() => setActiveTab(key)}
						style={{
							flex: 1,
							background: "transparent",
							border: "none",
							padding: "12px 20px",
							fontSize: "13px",
							fontWeight: 800,
							color: activeTab === key ? "var(--bg-nav)" : "var(--text-secondary)",
							cursor: "pointer",
							transition: "color 0.4s ease",
							outline: "none",
							whiteSpace: "nowrap",
							fontFamily: "inherit",
							display: "flex",
							alignItems: "center",
							gap: "8px",
							justifyContent: "center",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
						}}
					>
						<span>{tabLabels[key].icon}</span>
						<span>{tabLabels[key].label}</span>
					</button>
				))}
			</div>
		</div>
	);
}

/* ─────────────────────────────────────────────
   JOBS FEED
───────────────────────────────────────────── */
function JobsFeed() {
	const jobs = [
		{
			company: "Stripe",
			logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
			title: "Senior Payment Platform Engineer",
			location: "Remote (US)",
			salary: "$180k – $240k",
			type: "Full-time",
			exp: "Experienced (5+ Yrs)",
			isFresher: false,
			skills: ["Go", "React", "Distributed Systems"],
			posted: "2h ago",
		},
		{
			company: "Netflix",
			logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
			title: "Frontend Developer (UI Foundations)",
			location: "Los Gatos, CA",
			salary: "$120k – $160k",
			type: "Full-time",
			exp: "Fresher Friendly",
			isFresher: true,
			skills: ["React", "JavaScript", "CSS Architecture"],
			posted: "5h ago",
		},
	];

	return (
		<>
			{/* Sponsored Banner — High Visibility */}
			<div className="relative overflow-hidden bg-gradient-to-r from-[#3674e0]/15 via-[#9b4fdf]/20 to-[#3674e0]/15 border border-white/10 rounded-2xl p-6 flex items-center justify-between mb-6 shadow-[0_8px_32px_rgba(155,79,223,0.12)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(155,79,223,0.2)] group cursor-default">
				{/* Background Glow */}
				<div className="absolute top-[-50%] left-[-20%] w-[140%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(155,79,223,0.15)_0%,transparent_70%)] animate-subtlePulse pointer-events-none" />
				
				<div className="relative z-10 flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="bg-gradient-to-r from-[#9b4fdf] to-[#3674e0] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Sponsored</span>
						<span className="text-white/40 text-[11px] font-medium tracking-tight">Verified Partner</span>
					</div>
					<p className="text-[16px] text-white font-bold tracking-tight leading-tight max-w-[500px]">
						Scale your startup with <span className="text-[#9b4fdf]">AWS Activate</span>. Get up to $100k in credits and expert support.
					</p>
				</div>
				<button className="relative z-10 bg-white text-[#0f172a] border-none py-3 px-6 rounded-xl font-bold text-[13px] cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.3)] active:scale-95 whitespace-nowrap">
					Claim Credits
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{jobs.map((job, idx) => (
					<div
						key={idx}
						className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] flex flex-col transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1"
						style={{ boxShadow: "var(--card-shadow)" }}
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-contain p-1.5 bg-[#f8f9fb] border border-[var(--border-card)] duration-[180ms]" />
								<div className="flex flex-col gap-0.5">
									<div className="text-[14px] font-semibold text-[var(--text-card-primary)] flex items-center gap-1.5 tracking-[-0.02em]">
										{job.company}
										<span className="bg-[#eef0ff] text-[#4338ca] text-[10px] px-1.5 py-0.5 rounded-[10px] font-semibold">✓</span>
									</div>
									<span className="text-[11px] text-[var(--text-card-muted)]">Posted {job.posted}</span>
								</div>
							</div>
							<span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${job.isFresher ? "bg-[rgba(13,147,98,0.08)] text-[#0d7c52] border-[rgba(13,147,98,0.15)]" : "bg-[rgba(217,154,28,0.08)] text-[#96680a] border-[rgba(217,154,28,0.15)]"}`}>
								{job.isFresher ? "Entry" : "Senior"}
							</span>
						</div>

						<h3 className="text-[17px] font-bold text-[var(--text-card-primary)] mb-3 tracking-[-0.03em] leading-[1.3] min-h-[44px] line-clamp-2">{job.title}</h3>

						<div className="flex flex-col gap-2 mb-4 text-[12px] text-[var(--text-card-secondary)] font-medium">
							<div className="flex items-center gap-2">
								<span className="opacity-60 text-[14px]">📍</span> {job.location}
							</div>
							<div className="flex items-center gap-2">
								<span className="opacity-60 text-[14px]">💰</span> <strong className="text-[var(--accent-green)] font-bold">{job.salary}</strong>
							</div>
						</div>

						<div className="flex gap-1.5 flex-wrap mb-6 flex-1">
							{job.skills.map((s, i) => (
								<span
									key={i}
									className="bg-[var(--bg-subtle)] text-[var(--text-card-secondary)] px-3 py-0.5 rounded-full text-[11px] font-medium border border-[var(--border-subtle)]"
								>
									{s}
								</span>
							))}
						</div>

						<div className="flex gap-2 pt-4 border-t border-[var(--border-subtle)]">
							<button className="flex-1 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white border-none py-2.5 px-4 rounded-xl font-bold text-[12px] cursor-pointer shadow-md transition-all duration-[180ms] hover:shadow-lg hover:-translate-y-0.5 active:scale-95">Easy Apply</button>
							<button className="bg-transparent border border-[var(--border-card)] text-[var(--text-card-secondary)] rounded-xl px-4 font-bold text-[12px] cursor-pointer transition-all duration-[180ms] hover:border-[var(--text-card-secondary)] hover:bg-[var(--bg-subtle-hover)]">Save</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

/* ─────────────────────────────────────────────
   MARKETPLACE FEED
───────────────────────────────────────────── */
function MarketplaceFeed() {
	const opps = [
		{
			type: "Seeking Investment",
			title: "Seed Round – AI Healthcare Startup",
			author: "Dr. Sarah Chen, CEO at MedAI",
			desc: "We are raising $1.5M to scale our generative AI diagnostic tool. Currently at $20k MRR with 5 hospital pilot programs. Looking for strategic healthcare investors.",
		},
		{
			type: "Partnership",
			title: "B2B SaaS seeking Marketing Agency",
			author: "Growth at Acme Corp",
			desc: "Expanding to European markets. We need a performance marketing agency with a proven track record in enterprise SaaS software. Budget: $20k/mo.",
		},
	];

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{opps.map((opp, idx) => (
					<div
						key={idx}
						className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] flex flex-col transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1"
						style={{ boxShadow: "var(--card-shadow)" }}
					>
						<span className="bg-[rgba(155,79,223,0.06)] text-[#7c2dbd] px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase mb-4 inline-block border border-[rgba(155,79,223,0.1)] tracking-[0.05em] self-start">
							{opp.type}
						</span>
						<h3 className="text-[17px] font-bold text-[var(--text-card-primary)] mb-2 tracking-[-0.03em] leading-[1.3] line-clamp-2 min-h-[44px]">{opp.title}</h3>
						<div className="text-[12px] text-[var(--text-card-secondary)] mb-4 font-semibold tracking-[-0.01em]">{opp.author}</div>
						<p className="text-[13px] text-[var(--text-card-primary)] leading-[1.6] mb-6 tracking-[-0.01em] line-clamp-3 flex-1">{opp.desc}</p>
						<button className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white border-none py-2.5 px-6 rounded-xl font-bold text-[12px] cursor-pointer tracking-[-0.01em] transition-all duration-[180ms] hover:shadow-lg hover:-translate-y-0.5 active:scale-95">Contact Privately</button>
					</div>
				))}
			</div>
		</>
	);
}

/* ─────────────────────────────────────────────
   NETWORKING FEED
───────────────────────────────────────────── */
function NetworkingFeed() {
	return (
		<div
			className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5"
			style={{ boxShadow: "var(--card-shadow)" }}
		>
			<div className="flex gap-3.5 mb-3.5">
				<img src="/images/user.svg" alt="" className="w-11 h-11 rounded-full border border-[var(--border-card)]" />
				<div>
					<div className="font-bold text-[var(--text-card-primary)] text-[14px] tracking-[-0.02em]">Alex Rivera</div>
					<div className="text-[12px] text-[var(--text-card-muted)] tracking-[-0.01em] mt-0.5">Principal Engineer @ Vercel</div>
				</div>
			</div>
			<p className="text-[14px] text-[var(--text-card-primary)] leading-[1.65] tracking-[-0.01em]">
				Just published a deep dive on React Server Components and how they fundamentally shift our mental model for rendering. We moved 80% of our client-side logic to the server resulting in a 40% performance gain on mobile. Link in the comments! 🚀
			</p>
			<div className="mt-3.5 flex gap-1.5">
				{["#React", "#WebDev"].map((tag) => (
					<span key={tag} className="bg-[var(--bg-subtle)] text-[var(--text-card-secondary)] px-3.5 py-1 rounded-full text-[12px] font-medium border border-[var(--border-subtle)] tracking-[-0.01em] hover:bg-[rgba(155,79,223,0.06)] hover:border-[rgba(155,79,223,0.2)] hover:text-[var(--accent-purple)] transition-all duration-[180ms] cursor-default">
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
function Main({ showJobs }) {
	const [activeTab, setActiveTab] = useState(showJobs ? "jobs" : "market");

	useEffect(() => {
		if (!showJobs && activeTab === 'jobs') {
			setActiveTab('market');
		}
	}, [showJobs, activeTab]);

	return (
		<div className="[grid-area:main] flex flex-col gap-5">
			<LiquidMinimalNav activeTab={activeTab} setActiveTab={setActiveTab} showJobs={showJobs} />
			{activeTab === "jobs" && showJobs && <JobsFeed />}
			{activeTab === "market" && <MarketplaceFeed />}
			{activeTab === "network" && <NetworkingFeed />}
		</div>
	);
}

export default Main;
