import React from "react";
import styled from "styled-components";
import Left from "./Left";

const PageContainer = styled.div`
  margin-left: var(--sidebar-width); 
  padding: 32px 24px;
  display: flex;
  justify-content: center;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 24px 16px;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: var(--bg-card);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
`;

const TitleLine = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-card-primary);
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AIBanner = styled.div`
  background: linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid var(--accent-purple);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  h4 {
    color: var(--accent-purple);
    margin-bottom: 4px;
    font-size: 14px;
  }
  p {
    font-size: 13px;
    color: var(--text-card-secondary);
    line-height: 1.5;
  }
  button {
    background: var(--accent-purple);
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
  }
`;

const Profile = () => {
  return (
    <PageContainer>
      <Left />
      <ContentArea>
        <AIBanner>
          <div style={{ fontSize: "24px" }}>✨</div>
          <div style={{ flex: 1 }}>
            <h4>AI Profile Optimizer</h4>
            <p>Your profile visibility is at 60%. Completing your "Projects" section typically increases top-tier recruiter messages by 2.4x. Let AI draft a summary for you based on your GitHub?</p>
          </div>
          <button>Auto-Generate Draft</button>
        </AIBanner>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <img src="/images/user.svg" alt="" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "4px solid var(--border-color)", objectFit: 'cover', background: '#fff' }} />
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-card-primary)" }}>Software Professional</h1>
                <p style={{ fontSize: "16px", color: "var(--text-card-secondary)", marginTop: "4px" }}>Senior Frontend Engineer | 5+ Years Experience</p>
                <p style={{ fontSize: "14px", color: "var(--text-card-muted)", marginTop: "8px" }}>San Francisco, CA • 500+ Connections</p>
              </div>
            </div>
            <button style={{ background: "transparent", color: "var(--accent-blue)", border: "1px solid var(--accent-blue)", padding: "8px 16px", borderRadius: "20px", fontWeight: 600, cursor: "pointer" }}>Edit Profile</button>
          </div>
        </Card>

        <Card>
          <TitleLine>Verified Experience</TitleLine>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border-color)" }}>
            <div style={{ background: "var(--bg-primary)", padding: "12px", borderRadius: "8px" }}>🚀</div>
            <div>
              <h4 style={{ color: "var(--text-card-primary)", fontSize: "16px" }}>Senior React Developer</h4>
              <p style={{ color: "var(--text-card-secondary)", fontSize: "14px", margin: "4px 0" }}>TechCorp Inc. • Full-time</p>
              <p style={{ color: "var(--text-card-muted)", fontSize: "12px" }}>2020 - Present</p>
            </div>
          </div>
        </Card>
      </ContentArea>
    </PageContainer>
  );
};

export default Profile;
