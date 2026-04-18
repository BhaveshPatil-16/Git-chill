import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	grid-area: main;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const TabsContainer = styled.div`
	display: flex;
	background: var(--bg-card);
	border-radius: 12px;
	padding: 8px;
	box-shadow: var(--card-shadow);
	border: 1px solid var(--border-color);
	gap: 8px;
	
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const TabButton = styled.button`
	flex: 1;
	background: ${props => props.active ? "var(--bg-primary)" : "transparent"};
	color: ${props => props.active ? "var(--text-card-primary)" : "var(--text-card-secondary)"};
	border: none;
	padding: 12px 16px;
	border-radius: 8px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	box-shadow: ${props => props.active ? "inset 0 0 0 1px var(--border-color)" : "none"};
	
	&:hover {
		background: ${props => props.active ? "var(--bg-primary)" : "rgba(0,0,0,0.02)"};
		color: var(--text-card-primary);
	}
`;

const Card = styled.div`
	background: var(--bg-card);
	border-radius: 16px;
	padding: 24px;
	box-shadow: var(--card-shadow);
	border: 1px solid var(--border-color);
`;

const SponsoredBanner = styled.div`
	background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
	border-left: 4px solid var(--accent-purple);
	border-radius: 8px;
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;
	
	div {
		display: flex;
		flex-direction: column;
		gap: 4px;
		
		span {
			font-size: 11px;
			font-weight: 700;
			color: var(--accent-purple);
			text-transform: uppercase;
		}
		
		p {
			font-size: 14px;
			color: var(--text-card-primary);
			font-weight: 600;
		}
	}
	
	button {
		background: var(--gradient-accent);
		color: #ffffff;
		border: none;
		padding: 10px 20px;
		border-radius: 20px;
		font-weight: 700;
		font-size: 13px;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
		transition: all 0.2s;
		
		&:hover {
			transform: scale(1.05);
			box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
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
	gap: 16px;
	
	img {
		width: 56px;
		height: 56px;
		border-radius: 8px;
		object-fit: contain;
		background: #fff;
		border: 1px solid var(--border-card);
		padding: 4px;
	}
	
	div {
		display: flex;
		flex-direction: column;
		gap: 2px;
		
		.company-name {
			font-size: 16px;
			font-weight: 700;
			color: var(--text-card-primary);
			display: flex;
			align-items: center;
			gap: 6px;
		}
		
		.verified-badge {
			background: #e0e7ff;
			color: #4f46e5;
			font-size: 10px;
			padding: 2px 6px;
			border-radius: 12px;
			font-weight: 700;
			text-transform: uppercase;
		}
	}
`;

const ExperienceBadge = styled.span`
	background: ${props => props.isFresher ? "#dcfce7" : "#fef3c7"};
	color: ${props => props.isFresher ? "#166534" : "#92400e"};
	font-size: 12px;
	font-weight: 700;
	padding: 4px 12px;
	border-radius: 16px;
`;

const JobTitle = styled.h3`
	font-size: 20px;
	font-weight: 700;
	color: var(--text-card-primary);
	margin-bottom: 12px;
`;

const JobMetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	margin-bottom: 16px;
	font-size: 14px;
	color: var(--text-card-secondary);
	font-weight: 500;
`;

const SkillsTags = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 16px;
`;

const SkillChip = styled.span`
	background: var(--bg-primary);
	color: var(--text-card-secondary);
	padding: 4px 12px;
	border-radius: 16px;
	font-size: 12px;
	font-weight: 600;
	border: 1px solid var(--border-color);
`;

const ActionRow = styled.div`
	display: flex;
	gap: 12px;
	margin-top: 24px;
`;

const ApplyButton = styled.button`
	background: var(--accent-blue);
	color: white;
	border: none;
	padding: 10px 24px;
	border-radius: 8px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	flex-grow: 1;
`;

const OppTypeBadge = styled.span`
	background: #f3e8ff;
	color: #7e22ce;
	padding: 4px 12px;
	border-radius: 4px;
	font-size: 12px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 12px;
	display: inline-block;
`;

function JobsFeed() {
	const jobs = [
		{
			company: "Stripe",
			logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
			title: "Senior Payment Platform Engineer",
			location: "Remote (US)",
			salary: "$180k - $240k",
			type: "Full-time",
			exp: "Experienced (5+ Yrs)",
			isFresher: false,
			skills: ["Go", "React", "Distributed Systems"]
		},
		{
			company: "Netflix",
			logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
			title: "Frontend Developer (UI Foundations)",
			location: "Los Gatos, CA",
			salary: "$120k - $160k",
			type: "Full-time",
			exp: "Fresher Friendly",
			isFresher: true,
			skills: ["React", "JavaScript", "CSS Architecture"]
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
				<Card key={idx} style={{ marginBottom: '24px' }}>
					<JobHeader>
						<CompanyInfo>
							<img src={job.logo} alt={job.company} />
							<div>
								<div className="company-name">{job.company} <span className="verified-badge">✓ Verified</span></div>
								<span style={{ fontSize: '13px', color: 'var(--text-card-muted)' }}>Posted 2 hours ago</span>
							</div>
						</CompanyInfo>
						<ExperienceBadge isFresher={job.isFresher}>{job.exp}</ExperienceBadge>
					</JobHeader>
					<JobTitle>{job.title}</JobTitle>
					<JobMetaRow>
						<span>📍 {job.location}</span>
						<span>💼 {job.type}</span>
						<span>💰 <strong style={{ color: '#059669' }}>{job.salary}</strong></span>
					</JobMetaRow>
					<SkillsTags>
						{job.skills.map((s, i) => <SkillChip key={i}>{s}</SkillChip>)}
					</SkillsTags>
					<ActionRow>
						<ApplyButton>Easy Apply</ApplyButton>
						<button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-card-secondary)', borderRadius: '8px', padding: '0 20px', fontWeight: 'bold' }}>Save</button>
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
			title: "Seed Round - AI Healthcare Startup",
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
				<Card key={idx} style={{ marginBottom: '24px' }}>
					<OppTypeBadge>{opp.type}</OppTypeBadge>
					<JobTitle>{opp.title}</JobTitle>
					<div style={{ fontSize: '14px', color: 'var(--text-card-secondary)', marginBottom: '16px', fontWeight: '500' }}>{opp.author}</div>
					<p style={{ fontSize: '15px', color: 'var(--text-card-primary)', lineHeight: '1.6', marginBottom: '24px' }}>{opp.desc}</p>
					<ApplyButton style={{ width: 'auto' }}>Contact Privately</ApplyButton>
				</Card>
			))}
		</>
	);
}

function NetworkingFeed() {
	return (
		<Card>
			<div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
				<img src="/images/user.svg" alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
				<div>
					<div style={{ fontWeight: '700', color: 'var(--text-card-primary)' }}>Alex Rivera</div>
					<div style={{ fontSize: '12px', color: 'var(--text-card-secondary)' }}>Principal Engineer @ Vercel</div>
				</div>
			</div>
			<p style={{ fontSize: '14px', color: 'var(--text-card-primary)', lineHeight: '1.6' }}>
				Just published a deep dive on React Server Components and how they fundamentally shift our mental model for rendering. We moved 80% of our client-side logic to the server resulting in a 40% performance gain on mobile. Link in the comments! 🚀
			</p>
			<div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
				<SkillChip>#React</SkillChip>
				<SkillChip>#WebDev</SkillChip>
			</div>
		</Card>
	);
}

function Main() {
	const [activeTab, setActiveTab] = useState("jobs");

	return (
		<Container>
			<TabsContainer>
				<TabButton active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")}>
					💼 Jobs Board
				</TabButton>
				<TabButton active={activeTab === "market"} onClick={() => setActiveTab("market")}>
					🤝 Opportunity Market
				</TabButton>
				<TabButton active={activeTab === "network"} onClick={() => setActiveTab("network")}>
					🌐 Networking
				</TabButton>
			</TabsContainer>

			{activeTab === "jobs" && <JobsFeed />}
			{activeTab === "market" && <MarketplaceFeed />}
			{activeTab === "network" && <NetworkingFeed />}

		</Container>
	);
}

export default Main;
