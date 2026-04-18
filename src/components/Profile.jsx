import React from "react";
import styled from "styled-components";
import Left from "./Left";

const PageContainer = styled.div`
  margin-left: var(--sidebar-width); 
  padding: 28px 24px;
  display: flex;
  justify-content: center;
  transition: margin-left var(--transition-normal);
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px 16px;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  }
`;

const TitleLine = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-card-primary);
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.02em;
`;

const AIBanner = styled.div`
  background: linear-gradient(100deg, rgba(155, 79, 223, 0.06), rgba(54, 116, 224, 0.06));
  border: 1px solid rgba(155, 79, 223, 0.12);
  border-radius: var(--radius-md);
  padding: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all var(--transition-normal);
  
  &:hover {
    border-color: rgba(155, 79, 223, 0.2);
    box-shadow: 0 4px 16px rgba(155, 79, 223, 0.06);
  }

  h4 {
    color: var(--accent-purple);
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  p {
    font-size: 12.5px;
    color: var(--text-card-secondary);
    line-height: 1.55;
    letter-spacing: -0.01em;
  }
  button {
    background: var(--gradient-accent);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
    font-size: 12px;
    transition: all var(--transition-fast);
    box-shadow: 0 2px 8px rgba(155, 79, 223, 0.15);
    letter-spacing: -0.01em;
    
    &:hover {
      box-shadow: 0 4px 16px rgba(155, 79, 223, 0.3);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0) scale(0.97);
    }
  }
`;

const EditBtn = styled.button`
  background: transparent;
  color: var(--accent-blue);
  border: 1px solid var(--border-card);
  padding: 8px 18px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
  letter-spacing: -0.01em;
  
  &:hover {
    border-color: var(--accent-blue);
    background: rgba(54, 116, 224, 0.04);
  }
  
  &:active {
    transform: scale(0.97);
  }
`;

const ExperienceRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ExperienceIcon = styled.div`
  background: rgba(155, 79, 223, 0.06);
  padding: 10px;
  border-radius: var(--radius-sm);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
`;

const Profile = () => {
  return (
    <PageContainer>
      <Left />
      <ContentArea>
        <AIBanner>
          <div style={{ fontSize: "20px", flexShrink: 0 }}>✨</div>
          <div style={{ flex: 1 }}>
            <h4>AI Profile Optimizer</h4>
            <p>Your profile visibility is at 60%. Completing your "Projects" section typically increases top-tier recruiter messages by 2.4x. Let AI draft a summary for you based on your GitHub?</p>
          </div>
          <button>Auto-Generate Draft</button>
        </AIBanner>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "18px" }}>
              <img src="/images/user.svg" alt="" style={{ width: "88px", height: "88px", borderRadius: "50%", border: "3px solid var(--border-card)", objectFit: 'cover', background: '#fafbfc' }} />
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-card-primary)", letterSpacing: "-0.03em" }}>Software Professional</h1>
                <p style={{ fontSize: "14px", color: "var(--text-card-secondary)", marginTop: "4px", letterSpacing: "-0.01em" }}>Senior Frontend Engineer | 5+ Years Experience</p>
                <p style={{ fontSize: "12.5px", color: "var(--text-card-muted)", marginTop: "8px", letterSpacing: "-0.01em" }}>San Francisco, CA · 500+ Connections</p>
              </div>
            </div>
            <EditBtn>Edit Profile</EditBtn>
          </div>
        </Card>

        <Card>
          <TitleLine>Verified Experience</TitleLine>
          <ExperienceRow>
            <ExperienceIcon>🚀</ExperienceIcon>
            <div>
              <h4 style={{ color: "var(--text-card-primary)", fontSize: "15px", fontWeight: "700", letterSpacing: "-0.02em" }}>Senior React Developer</h4>
              <p style={{ color: "var(--text-card-secondary)", fontSize: "13px", margin: "4px 0", letterSpacing: "-0.01em" }}>TechCorp Inc. · Full-time</p>
              <p style={{ color: "var(--text-card-muted)", fontSize: "11.5px", letterSpacing: "-0.01em" }}>2020 – Present</p>
            </div>
          </ExperienceRow>
        </Card>
      </ContentArea>
    </PageContainer>
  );
};

export default Profile;
