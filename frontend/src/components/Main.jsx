import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   LIQUID GLASS NAV — Tailwind + inline styles
───────────────────────────────────────────── */
function LiquidGlassNav({ activeTab, setActiveTab }) {
	const navRef = useRef(null);
	const pillRef = useRef(null);
	const glareInnerRef = useRef(null);
	const btnRefs = useRef({});
	const tabKeys = ["jobs", "market", "network"];

	const updatePill = useCallback((key, smooth = true) => {
		const btn = btnRefs.current[key];
		const pill = pillRef.current;
		if (!btn || !pill) return;
		if (!smooth) {
			pill.style.transition = "none";
		} else {
			pill.style.transition =
				"transform 0.5s cubic-bezier(0.34,1.2,0.64,1), width 0.5s cubic-bezier(0.34,1.2,0.64,1)";
		}
		pill.style.width = `${btn.offsetWidth}px`;
		pill.style.transform = `translateX(${btn.offsetLeft}px)`;
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			updatePill(activeTab, false);
			if (pillRef.current) void pillRef.current.offsetWidth;
		}, 50);
		return () => clearTimeout(timer);
	}, []); // eslint-disable-line

	useEffect(() => {
		updatePill(activeTab, true);
	}, [activeTab, updatePill]);

	useEffect(() => {
		const handleResize = () => updatePill(activeTab, false);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [activeTab, updatePill]);

	const handleMouseMove = (e) => {
		const nav = navRef.current;
		const glare = glareInnerRef.current;
		if (!nav || !glare) return;
		const rect = nav.getBoundingClientRect();
		glare.style.setProperty("--gx", `${e.clientX - rect.left}px`);
		glare.style.setProperty("--gy", `${e.clientY - rect.top}px`);
		glare.style.opacity = "1";
	};

	const handleMouseLeave = () => {
		if (glareInnerRef.current) glareInnerRef.current.style.opacity = "0";
	};

	const tabLabels = {
		jobs:    { icon: "💼", label: "Jobs Board" },
		market:  { icon: "🤝", label: "Marketplace" },
		network: { icon: "🌐", label: "Network" },
	};

	return (
		<div
			ref={navRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				padding: "6px",
				borderRadius: "99px",
				background: "rgba(255,255,255,0.12)",
				backdropFilter: "blur(40px) saturate(180%)",
				WebkitBackdropFilter: "blur(40px) saturate(180%)",
				boxShadow:
					"0 20px 50px -15px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.1), inset 0 1.5px 2px -0.5px rgba(255,255,255,0.5), inset 0 -1px 3px -1px rgba(255,255,255,0.15), inset 0 0 0 0.5px rgba(255,255,255,0.25)",
				overflow: "hidden",
				zIndex: 10,
			}}
		>
			{/* Top reflection */}
			<div
				style={{
					position: "absolute",
					top: 1, left: 1, right: 1,
					height: "50%",
					borderRadius: "99px 99px 20px 20px",
					background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)",
					pointerEvents: "none",
					zIndex: 6,
				}}
			/>

			{/* Mouse-tracking glare */}
			<div style={{ position: "absolute", inset: 0, borderRadius: "99px", overflow: "hidden", pointerEvents: "none", zIndex: 5 }}>
				<div
					ref={glareInnerRef}
					style={{
						position: "absolute",
						inset: 0,
						opacity: 0,
						transition: "opacity 0.3s ease",
						background: "radial-gradient(circle 80px at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.35) 0%, transparent 100%)",
						mixBlendMode: "overlay",
					}}
				/>
			</div>

			{/* Sliding active pill */}
			<div
				ref={pillRef}
				style={{
					position: "absolute",
					top: 6, left: 6,
					height: "calc(100% - 12px)",
					background: "rgba(255,255,255,0.55)",
					borderRadius: "99px",
					boxShadow: "0 4px 14px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 1px rgba(255,255,255,0.7)",
					zIndex: 1,
					willChange: "transform, width",
				}}
			/>

			{/* Tab buttons */}
			<div style={{ position: "relative", display: "flex", gap: 2, zIndex: 3, width: "100%" }}>
				{tabKeys.map((key) => (
					<button
						key={key}
						ref={(el) => (btnRefs.current[key] = el)}
						onClick={() => setActiveTab(key)}
						style={{
							flex: 1,
							background: "transparent",
							border: "none",
							padding: "0 20px",
							height: 44,
							borderRadius: "99px",
							fontSize: "13.5px",
							fontWeight: 600,
							color: activeTab === key ? "var(--text-card-primary)" : "rgba(255,255,255,0.5)",
							cursor: "pointer",
							transition: "color 0.3s ease",
							outline: "none",
							zIndex: 2,
							letterSpacing: "-0.01em",
							whiteSpace: "nowrap",
							fontFamily: "inherit",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "center", pointerEvents: "none" }}>
							<span>{tabLabels[key].icon}</span>
							<span>{tabLabels[key].label}</span>
						</div>
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
			{/* Sponsored Banner */}
			<div className="bg-gradient-to-r from-[#3674e0]/10 to-[#9b4fdf]/10 border-l-[3px] border-[#9b4fdf] rounded-lg p-4 flex items-center justify-between mb-1">
				<div className="flex flex-col gap-1">
					<span className="text-[10px] font-bold text-[#9b4fdf] uppercase tracking-widest">Sponsored</span>
					<p className="text-[14px] text-[#0f172a] font-medium tracking-tight">Scale your startup with AWS Activate. Get up to $100k in credits.</p>
				</div>
				<button className="bg-gradient-to-br from-[#9b4fdf] to-[#3674e0] text-white border-none py-2 px-4 rounded-full font-bold text-[12px] cursor-pointer shadow-[0_2px_8px_rgba(155,79,223,0.2)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(155,79,223,0.35)] whitespace-nowrap">Apply Now</button>
			</div>

			{jobs.map((job, idx) => (
				<div
					key={idx}
					className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] mb-1 transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5"
					style={{ boxShadow: "var(--card-shadow)" }}
				>
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center gap-3">
							<img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-contain p-1.5 bg-[#f8f9fb] border border-[var(--border-card)] transition-transform duration-[180ms] hover:scale-105" />
							<div className="flex flex-col gap-0.5">
								<div className="text-[14px] font-semibold text-[var(--text-card-primary)] flex items-center gap-1.5 tracking-[-0.02em]">
									{job.company}
									<span className="bg-[#eef0ff] text-[#4338ca] text-[10px] px-1.5 py-0.5 rounded-[10px] font-semibold">✓ Verified</span>
								</div>
								<span className="text-[11.5px] text-[var(--text-card-muted)] tracking-[-0.01em]">Posted {job.posted}</span>
							</div>
						</div>
						<span className={`text-[11px] font-semibold px-3 py-1 rounded-full border tracking-[-0.01em] ${job.isFresher ? "bg-[rgba(13,147,98,0.08)] text-[#0d7c52] border-[rgba(13,147,98,0.15)]" : "bg-[rgba(217,154,28,0.08)] text-[#96680a] border-[rgba(217,154,28,0.15)]"}`}>
							{job.exp}
						</span>
					</div>

					<h3 className="text-[18px] font-bold text-[var(--text-card-primary)] mb-3 tracking-[-0.03em] leading-[1.35]">{job.title}</h3>

					<div className="flex flex-wrap gap-3 mb-4 text-[13px] text-[var(--text-card-secondary)] font-normal tracking-[-0.01em]">
						<span>📍 {job.location}</span>
						<span>💼 {job.type}</span>
						<span>💰 <strong className="text-[var(--accent-green)] font-bold">{job.salary}</strong></span>
					</div>

					<div className="flex gap-1.5 flex-wrap mb-4">
						{job.skills.map((s, i) => (
							<span
								key={i}
								className="bg-black/[0.03] text-[var(--text-card-secondary)] px-3.5 py-1 rounded-full text-[12px] font-medium border border-[var(--border-card)] tracking-[-0.01em] transition-all duration-[180ms] cursor-default hover:bg-[rgba(155,79,223,0.06)] hover:border-[rgba(155,79,223,0.2)] hover:text-[var(--accent-purple)] hover:-translate-y-px"
							>
								{s}
							</span>
						))}
					</div>

					<div className="flex gap-2 mt-5 pt-4 border-t border-black/[0.04]">
						<button className="flex-1 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white border-none py-2.5 px-6 rounded-lg font-semibold text-[13px] cursor-pointer shadow-[0_2px_8px_rgba(155,79,223,0.15)] tracking-[-0.01em] transition-all duration-[180ms] hover:shadow-[0_4px_20px_rgba(155,79,223,0.3)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]">Easy Apply</button>
						<button className="bg-transparent border border-[var(--border-card)] text-[var(--text-card-secondary)] rounded-lg px-5 font-semibold text-[13px] cursor-pointer tracking-[-0.01em] transition-all duration-[180ms] hover:border-[var(--text-card-secondary)] hover:bg-black/[0.02]">Save</button>
					</div>
				</div>
			))}
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
			{opps.map((opp, idx) => (
				<div
					key={idx}
					className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] mb-1 transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-0.5"
					style={{ boxShadow: "var(--card-shadow)" }}
				>
					<span className="bg-[rgba(155,79,223,0.06)] text-[#7c2dbd] px-3 py-1 rounded-[6px] text-[11px] font-bold uppercase mb-3 inline-block border border-[rgba(155,79,223,0.1)] tracking-[0.03em]">
						{opp.type}
					</span>
					<h3 className="text-[18px] font-bold text-[var(--text-card-primary)] mb-3 tracking-[-0.03em] leading-[1.35]">{opp.title}</h3>
					<div className="text-[13px] text-[var(--text-card-secondary)] mb-3 font-medium tracking-[-0.01em]">{opp.author}</div>
					<p className="text-[14px] text-[var(--text-card-primary)] leading-[1.65] mb-5 tracking-[-0.01em]">{opp.desc}</p>
					<button className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white border-none py-2.5 px-6 rounded-lg font-semibold text-[13px] cursor-pointer tracking-[-0.01em] transition-all duration-[180ms] hover:shadow-[0_4px_20px_rgba(155,79,223,0.3)] hover:-translate-y-px active:scale-[0.97]">Contact Privately</button>
				</div>
			))}
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
					<span key={tag} className="bg-black/[0.03] text-[var(--text-card-secondary)] px-3.5 py-1 rounded-full text-[12px] font-medium border border-[var(--border-card)] tracking-[-0.01em] hover:bg-[rgba(155,79,223,0.06)] hover:border-[rgba(155,79,223,0.2)] hover:text-[var(--accent-purple)] transition-all duration-[180ms] cursor-default">
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
function Main() {
	const [activeTab, setActiveTab] = useState("jobs");

	return (
		<div className="[grid-area:main] flex flex-col gap-5">
			<LiquidGlassNav activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === "jobs"    && <JobsFeed />}
			{activeTab === "market" && <MarketplaceFeed />}
			{activeTab === "network" && <NetworkingFeed />}
		</div>
	);
}

export default Main;
