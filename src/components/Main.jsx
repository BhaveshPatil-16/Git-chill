import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
	grid-area: main;
	display: flex;
	gap: 24px;
	
	@media (max-width: 1024px) {
		flex-direction: column;
	}
`;

const FeedArea = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 20px;
	min-width: 0;
`;

const RightPanel = styled.aside`
	width: 300px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	gap: 16px;
	
	@media (max-width: 1024px) {
		width: 100%;
	}
`;

const RightCard = styled.div`
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	padding: 20px;
	box-shadow: var(--card-shadow);
	border: 1px solid var(--border-card);
	transition: all var(--transition-normal);
`;

const RightCardTitle = styled.h3`
	font-size: 14px;
	font-weight: 700;
	color: var(--text-card-primary);
	margin-bottom: 16px;
	letter-spacing: -0.02em;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const CompanyRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 0;
	border-bottom: 1px solid rgba(0,0,0,0.04);
	transition: all var(--transition-fast);
	cursor: pointer;
	
	&:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	
	&:first-of-type {
		padding-top: 0;
	}
	
	&:hover {
		transform: translateX(2px);
	}
`;

const CompanyLogoSmall = styled.div`
	width: 36px;
	height: 36px;
	border-radius: var(--radius-sm);
	background: #f8f9fb;
	border: 1px solid var(--border-card);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	overflow: hidden;
	
	img {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}
`;

const CompanyMeta = styled.div`
	flex: 1;
	min-width: 0;
	
	.name {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-card-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		letter-spacing: -0.01em;
	}
	
	.detail {
		font-size: 11.5px;
		color: var(--text-card-muted);
		letter-spacing: -0.01em;
		margin-top: 2px;
	}
`;

const FollowBtn = styled.button`
	background: transparent;
	border: 1px solid var(--border-card);
	color: var(--accent-blue);
	font-size: 11px;
	font-weight: 600;
	padding: 4px 12px;
	border-radius: 20px;
	cursor: pointer;
	transition: all var(--transition-fast);
	white-space: nowrap;
	letter-spacing: -0.01em;
	
	&:hover {
		background: rgba(54, 116, 224, 0.06);
		border-color: var(--accent-blue);
	}
	
	&:active {
		transform: scale(0.96);
	}
`;

const TrendingCard = styled(RightCard)``;

const TrendingItem = styled.div`
	padding: 8px 0;
	
	&:last-child {
		padding-bottom: 0;
	}
	
	.topic {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-card-primary);
		letter-spacing: -0.01em;
	}
	
	.stats {
		font-size: 11px;
		color: var(--text-card-muted);
		margin-top: 2px;
	}
`;

/* ═══════════════════════════════════════════
   APPLE LIQUID GLASS TAB NAV
   ═══════════════════════════════════════════ */
const LiquidNav = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 6px;
	border-radius: 99px;
	
	/* Deep frosted glass */
	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(40px) saturate(180%);
	-webkit-backdrop-filter: blur(40px) saturate(180%);
	
	/* Multi-layer shadows for 3D volume */
	box-shadow:
		0 20px 50px -15px rgba(0, 0, 0, 0.15),
		0 8px 20px -8px rgba(0, 0, 0, 0.1),
		inset 0 1.5px 2px -0.5px rgba(255, 255, 255, 0.5),
		inset 0 -1px 3px -1px rgba(255, 255, 255, 0.15),
		inset 0 0 0 0.5px rgba(255, 255, 255, 0.25);
	
	transition: all 0.4s ease;
	z-index: 10;
	overflow: hidden;

	[data-theme='light'] & {
		background: rgba(255, 255, 255, 0.45);
		box-shadow:
			0 20px 50px -15px rgba(0, 0, 0, 0.08),
			0 8px 20px -8px rgba(0, 0, 0, 0.05),
			inset 0 1.5px 2px -0.5px rgba(255, 255, 255, 0.8),
			inset 0 -1px 3px -1px rgba(255, 255, 255, 0.3),
			inset 0 0 0 0.5px rgba(255, 255, 255, 0.5);
	}
`;

/* The curved aqua reflection overlay ("wet" look) */
const LiquidReflection = styled.div`
	position: absolute;
	top: 1px;
	left: 1px;
	right: 1px;
	height: 50%;
	border-radius: 99px 99px 20px 20px;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%);
	pointer-events: none;
	z-index: 6;
	transition: background 0.4s ease;

	[data-theme='light'] & {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
	}
`;

/* Mouse-tracking glare */
const LiquidGlare = styled.div`
	position: absolute;
	inset: 0;
	border-radius: 99px;
	overflow: hidden;
	pointer-events: none;
	z-index: 5;
`;

const GlareInner = styled.div`
	position: absolute;
	inset: 0;
	opacity: 0;
	transition: opacity 0.3s ease;
	background: radial-gradient(circle 80px at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.35) 0%, transparent 100%);
	mix-blend-mode: overlay;

	${LiquidNav}:hover & {
		opacity: 1;
	}
`;

/* Container for nav buttons */
const NavItems = styled.div`
	position: relative;
	display: flex;
	gap: 2px;
	z-index: 3;
	width: 100%;
`;

/* The sliding pill */
const ActivePill = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: rgba(255, 255, 255, 0.55);
	border-radius: 99px;
	box-shadow:
		0 4px 14px rgba(0, 0, 0, 0.06),
		0 1px 3px rgba(0, 0, 0, 0.04),
		inset 0 1px 1px rgba(255, 255, 255, 0.7);
	transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
				width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
	z-index: 1;
	will-change: transform, width;

	[data-theme='light'] & {
		background: rgba(255, 255, 255, 0.75);
		box-shadow:
			0 4px 14px rgba(0, 0, 0, 0.05),
			0 1px 3px rgba(0, 0, 0, 0.03),
			inset 0 1px 1px rgba(255, 255, 255, 0.9);
	}
`;

/* Individual tab button */
const GlassTabBtn = styled.button`
	position: relative;
	flex: 1;
	background: transparent;
	border: none;
	padding: 0 20px;
	height: 44px;
	border-radius: 99px;
	font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
	font-size: 13.5px;
	font-weight: 600;
	color: ${props => props.active 
		? 'var(--text-card-primary)' 
		: 'rgba(255,255,255,0.5)'};
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	transition: color 0.3s ease;
	outline: none;
	z-index: 2;
	letter-spacing: -0.01em;
	white-space: nowrap;

	[data-theme='light'] & {
		color: ${props => props.active 
			? 'var(--text-card-primary)' 
			: 'rgba(0,0,0,0.4)'};
	}

	&:hover {
		color: var(--text-card-primary);
		
		[data-theme='light'] & {
			color: var(--text-card-primary);
		}
	}
`;

const BtnContent = styled.div`
	display: flex;
	align-items: center;
	gap: 7px;
	pointer-events: none;
	transition: transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);

	${GlassTabBtn}:active & {
		transform: scale(0.93);
	}
`;

const Card = styled.div`
	background: var(--bg-card);
	border-radius: var(--radius-lg);
	padding: 24px;
	box-shadow: var(--card-shadow);
	border: 1px solid var(--border-card);
	transition: all var(--transition-normal);
	
	&:hover {
		box-shadow: var(--card-shadow-hover);
		transform: translateY(-2px);
	}
`;

const SponsoredBanner = styled.div`
	background: linear-gradient(100deg, rgba(54, 116, 224, 0.06), rgba(155, 79, 223, 0.06));
	border-left: 3px solid var(--accent-purple);
	border-radius: var(--radius-sm);
	padding: 14px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	
	div {
		display: flex;
		flex-direction: column;
		gap: 3px;
		
		span {
			font-size: 10px;
			font-weight: 700;
			color: var(--accent-purple);
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}
		
		p {
			font-size: 13px;
			color: var(--text-card-primary);
			font-weight: 500;
			letter-spacing: -0.01em;
		}
	}
	
	button {
		background: var(--gradient-accent);
		color: #ffffff;
		border: none;
		padding: 8px 18px;
		border-radius: 20px;
		font-weight: 600;
		font-size: 12px;
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(155, 79, 223, 0.2);
		transition: all var(--transition-fast);
		letter-spacing: -0.01em;
		white-space: nowrap;
		
		&:hover {
			transform: translateY(-1px);
			box-shadow: 0 4px 16px rgba(155, 79, 223, 0.35);
		}
		
		&:active {
			transform: translateY(0) scale(0.97);
		}
	}
`;

/* Job Card Styling */
const JobHeader = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const CompanyInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 14px;
	
	img {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-sm);
		object-fit: contain;
		background: #fafbfc;
		border: 1px solid var(--border-card);
		padding: 6px;
		transition: transform var(--transition-fast);
	}
	
	img:hover {
		transform: scale(1.05);
	}
	
	div {
		display: flex;
		flex-direction: column;
		gap: 2px;
		
		.company-name {
			font-size: 14px;
			font-weight: 600;
			color: var(--text-card-primary);
			display: flex;
			align-items: center;
			gap: 6px;
			letter-spacing: -0.02em;
		}
		
		.verified-badge {
			background: #eef0ff;
			color: #4338ca;
			font-size: 10px;
			padding: 1px 6px;
			border-radius: 10px;
			font-weight: 600;
			letter-spacing: 0;
		}
	}
`;

const ExperienceBadge = styled.span`
	background: ${props => props.isFresher ? "rgba(13, 147, 98, 0.08)" : "rgba(217, 154, 28, 0.08)"};
	color: ${props => props.isFresher ? "#0d7c52" : "#96680a"};
	font-size: 11px;
	font-weight: 600;
	padding: 4px 12px;
	border-radius: 20px;
	border: 1px solid ${props => props.isFresher ? "rgba(13, 147, 98, 0.15)" : "rgba(217, 154, 28, 0.15)"};
	white-space: nowrap;
	letter-spacing: -0.01em;
`;

const JobTitle = styled.h3`
	font-size: 18px;
	font-weight: 700;
	color: var(--text-card-primary);
	margin-bottom: 12px;
	letter-spacing: -0.03em;
	line-height: 1.35;
`;

const JobMetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 14px;
	margin-bottom: 16px;
	font-size: 13px;
	color: var(--text-card-secondary);
	font-weight: 400;
	letter-spacing: -0.01em;
`;

const SalaryHighlight = styled.strong`
	color: var(--accent-green);
	font-weight: 700;
	letter-spacing: -0.01em;
`;

const SkillsTags = styled.div`
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
	margin-bottom: 16px;
`;

const SkillChip = styled.span`
	background: rgba(0, 0, 0, 0.03);
	color: var(--text-card-secondary);
	padding: 5px 14px;
	border-radius: 20px;
	font-size: 12px;
	font-weight: 500;
	border: 1px solid var(--border-card);
	transition: all var(--transition-fast);
	cursor: default;
	letter-spacing: -0.01em;
	
	&:hover {
		background: rgba(155, 79, 223, 0.06);
		border-color: rgba(155, 79, 223, 0.2);
		color: var(--accent-purple);
		transform: translateY(-1px);
	}
`;

const ActionRow = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
	padding-top: 16px;
	border-top: 1px solid rgba(0, 0, 0, 0.04);
`;

const ApplyButton = styled.button`
	background: var(--gradient-accent);
	color: white;
	border: none;
	padding: 10px 24px;
	border-radius: var(--radius-sm);
	font-weight: 600;
	font-size: 13px;
	cursor: pointer;
	flex-grow: 1;
	transition: all var(--transition-fast);
	box-shadow: 0 2px 8px rgba(155, 79, 223, 0.15);
	letter-spacing: -0.01em;
	
	&:hover {
		box-shadow: 0 4px 20px rgba(155, 79, 223, 0.3);
		transform: translateY(-1px);
	}
	
	&:active {
		transform: translateY(0) scale(0.98);
	}
`;

const SaveButton = styled.button`
	background: transparent;
	border: 1px solid var(--border-card);
	color: var(--text-card-secondary);
	border-radius: var(--radius-sm);
	padding: 0 20px;
	font-weight: 600;
	font-size: 13px;
	cursor: pointer;
	transition: all var(--transition-fast);
	letter-spacing: -0.01em;
	
	&:hover {
		border-color: var(--text-card-secondary);
		background: rgba(0, 0, 0, 0.02);
	}
	
	&:active {
		transform: scale(0.97);
	}
`;

const OppTypeBadge = styled.span`
	background: rgba(155, 79, 223, 0.06);
	color: #7c2dbd;
	padding: 4px 12px;
	border-radius: 6px;
	font-size: 11px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 12px;
	display: inline-block;
	letter-spacing: 0.03em;
	border: 1px solid rgba(155, 79, 223, 0.1);
`;

const PostedTime = styled.span`
	font-size: 12px;
	color: var(--text-card-muted);
	letter-spacing: -0.01em;
`;

/* Related Companies Data */
const RELATED_COMPANIES = [
	{ name: "Stripe", detail: "FinTech · 8,000+ employees", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
	{ name: "Vercel", detail: "DevTools · 500+ employees", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico" },
	{ name: "Linear", detail: "Productivity · 100+ employees", logo: "https://linear.app/static/apple-touch-icon.png" },
	{ name: "Notion", detail: "Productivity · 2,000+ employees", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
];

const TRENDING_TOPICS = [
	{ topic: "React Server Components", stats: "2.4k discussions · Trending" },
	{ topic: "AI in Hiring", stats: "1.8k discussions · Growing" },
	{ topic: "Remote Engineering", stats: "3.1k discussions · Popular" },
];

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
			posted: "2h ago"
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
			posted: "5h ago"
		}
	];

	return (
		<>
			<SponsoredBanner>
				<div>
					<span>Sponsored</span>
					<p>Scale your startup with AWS Activate. Get up to $100k in credits.</p>
				</div>
				<button>Apply Now</button>
			</SponsoredBanner>
			{jobs.map((job, idx) => (
				<Card key={idx} style={{ marginBottom: '4px' }}>
					<JobHeader>
						<CompanyInfo>
							<img src={job.logo} alt={job.company} />
							<div>
								<div className="company-name">{job.company} <span className="verified-badge">✓ Verified</span></div>
								<PostedTime>Posted {job.posted}</PostedTime>
							</div>
						</CompanyInfo>
						<ExperienceBadge isFresher={job.isFresher}>{job.exp}</ExperienceBadge>
					</JobHeader>
					<JobTitle>{job.title}</JobTitle>
					<JobMetaRow>
						<span>📍 {job.location}</span>
						<span>💼 {job.type}</span>
						<span>💰 <SalaryHighlight>{job.salary}</SalaryHighlight></span>
					</JobMetaRow>
					<SkillsTags>
						{job.skills.map((s, i) => <SkillChip key={i}>{s}</SkillChip>)}
					</SkillsTags>
					<ActionRow>
						<ApplyButton>Easy Apply</ApplyButton>
						<SaveButton>Save</SaveButton>
					</ActionRow>
				</Card>
			))}
		</>
	);
}

function MarketplaceFeed() {
	const opps = [
		{
			type: "Seeking Investment",
			title: "Seed Round – AI Healthcare Startup",
			author: "Dr. Sarah Chen, CEO at MedAI",
			desc: "We are raising $1.5M to scale our generative AI diagnostic tool. Currently at $20k MRR with 5 hospital pilot programs. Looking for strategic healthcare investors."
		},
		{
			type: "Partnership",
			title: "B2B SaaS seeking Marketing Agency",
			author: "Growth at Acme Corp",
			desc: "Expanding to European markets. We need a performance marketing agency with a proven track record in enterprise SaaS software. Budget: $20k/mo."
		}
	];
	
	return (
		<>
			{opps.map((opp, idx) => (
				<Card key={idx} style={{ marginBottom: '4px' }}>
					<OppTypeBadge>{opp.type}</OppTypeBadge>
					<JobTitle>{opp.title}</JobTitle>
					<div style={{ fontSize: '13px', color: 'var(--text-card-secondary)', marginBottom: '14px', fontWeight: '500', letterSpacing: '-0.01em' }}>{opp.author}</div>
					<p style={{ fontSize: '14px', color: 'var(--text-card-primary)', lineHeight: '1.65', marginBottom: '20px', letterSpacing: '-0.01em' }}>{opp.desc}</p>
					<ApplyButton style={{ width: 'auto' }}>Contact Privately</ApplyButton>
				</Card>
			))}
		</>
	);
}

function NetworkingFeed() {
	return (
		<Card>
			<div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
				<img src="/images/user.svg" alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-card)' }} />
				<div>
					<div style={{ fontWeight: '700', color: 'var(--text-card-primary)', fontSize: '14px', letterSpacing: '-0.02em' }}>Alex Rivera</div>
					<div style={{ fontSize: '12px', color: 'var(--text-card-muted)', letterSpacing: '-0.01em', marginTop: '2px' }}>Principal Engineer @ Vercel</div>
				</div>
			</div>
			<p style={{ fontSize: '14px', color: 'var(--text-card-primary)', lineHeight: '1.65', letterSpacing: '-0.01em' }}>
				Just published a deep dive on React Server Components and how they fundamentally shift our mental model for rendering. We moved 80% of our client-side logic to the server resulting in a 40% performance gain on mobile. Link in the comments! 🚀
			</p>
			<div style={{ marginTop: '14px', display: 'flex', gap: '6px' }}>
				<SkillChip>#React</SkillChip>
				<SkillChip>#WebDev</SkillChip>
			</div>
		</Card>
	);
}

/* ═══════════════════════════════════════════
   LIQUID GLASS TAB NAV COMPONENT
   ═══════════════════════════════════════════ */
function LiquidGlassNav({ activeTab, setActiveTab }) {
	const navRef = useRef(null);
	const pillRef = useRef(null);
	const glareRef = useRef(null);
	const btnRefs = useRef({});
	const tabKeys = ["jobs", "market", "network"];

	const updatePill = useCallback((key, smooth = true) => {
		const btn = btnRefs.current[key];
		const pill = pillRef.current;
		if (!btn || !pill) return;

		if (!smooth) {
			pill.style.transition = 'none';
		} else {
			pill.style.transition = 
				'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), ' +
				'width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)';
		}

		pill.style.width = `${btn.offsetWidth}px`;
		pill.style.transform = `translateX(${btn.offsetLeft}px)`;
	}, []);

	// Position pill on mount & tab change
	useEffect(() => {
		// Small delay for initial layout calculation
		const timer = setTimeout(() => {
			updatePill(activeTab, false);
			// Force reflow then enable transitions
			if (pillRef.current) void pillRef.current.offsetWidth;
		}, 50);
		return () => clearTimeout(timer);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		updatePill(activeTab, true);
	}, [activeTab, updatePill]);

	// Reposition on resize
	useEffect(() => {
		const handleResize = () => updatePill(activeTab, false);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [activeTab, updatePill]);

	// Mouse-tracking glare
	const handleMouseMove = (e) => {
		const nav = navRef.current;
		const glare = glareRef.current;
		if (!nav || !glare) return;
		const rect = nav.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		glare.style.setProperty('--gx', `${x}px`);
		glare.style.setProperty('--gy', `${y}px`);
	};

	const handleClick = (key) => {
		setActiveTab(key);
	};

	const tabLabels = {
		jobs: { icon: '💼', label: 'Jobs Board' },
		market: { icon: '🤝', label: 'Marketplace' },
		network: { icon: '🌐', label: 'Network' },
	};

	return (
		<LiquidNav ref={navRef} onMouseMove={handleMouseMove}>
			<LiquidReflection />
			<LiquidGlare>
				<GlareInner ref={glareRef} />
			</LiquidGlare>
			<NavItems>
				<ActivePill ref={pillRef} />
				{tabKeys.map((key) => (
					<GlassTabBtn
						key={key}
						ref={el => btnRefs.current[key] = el}
						active={activeTab === key}
						onClick={() => handleClick(key)}
					>
						<BtnContent>
							<span>{tabLabels[key].icon}</span>
							<span>{tabLabels[key].label}</span>
						</BtnContent>
					</GlassTabBtn>
				))}
			</NavItems>
		</LiquidNav>
	);
}

function Main() {
	const [activeTab, setActiveTab] = useState("jobs");

	return (
		<Container>
			<FeedArea>
				<LiquidGlassNav activeTab={activeTab} setActiveTab={setActiveTab} />

				{activeTab === "jobs" && <JobsFeed />}
				{activeTab === "market" && <MarketplaceFeed />}
				{activeTab === "network" && <NetworkingFeed />}
			</FeedArea>
			
			<RightPanel>
				<RightCard>
					<RightCardTitle>
						<span style={{ fontSize: '14px' }}>🏢</span>
						Related Companies
					</RightCardTitle>
					{RELATED_COMPANIES.map((co, idx) => (
						<CompanyRow key={idx}>
							<CompanyLogoSmall>
								<img src={co.logo} alt={co.name} />
							</CompanyLogoSmall>
							<CompanyMeta>
								<div className="name">{co.name}</div>
								<div className="detail">{co.detail}</div>
							</CompanyMeta>
							<FollowBtn>Follow</FollowBtn>
						</CompanyRow>
					))}
				</RightCard>
				
				<TrendingCard>
					<RightCardTitle>
						<span style={{ fontSize: '14px' }}>📈</span>
						Trending Topics
					</RightCardTitle>
					{TRENDING_TOPICS.map((item, idx) => (
						<TrendingItem key={idx}>
							<div className="topic">{item.topic}</div>
							<div className="stats">{item.stats}</div>
						</TrendingItem>
					))}
				</TrendingCard>
			</RightPanel>
		</Container>
	);
}

export default Main;
