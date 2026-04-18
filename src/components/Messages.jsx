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
  max-width: 1100px;
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

const Messages = () => {
  return (
    <PageContainer>
      <Left />
      <ContentArea>
        <Card style={{ padding: 0, display: "flex", height: "70vh", overflow: "hidden" }}>
          <div style={{ flex: 1, borderRight: "1px solid var(--border-color)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)", fontWeight: 700, color: "var(--text-card-primary)" }}>
              Inbox
            </div>
            <div style={{ padding: "16px", background: "rgba(0,0,0,0.02)", cursor: "pointer", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ fontWeight: 600, color: "var(--accent-blue)" }}>Sarah (Recruiter @ Stripe)</div>
              <div style={{ fontSize: "13px", color: "var(--text-card-secondary)", marginTop: "4px" }}>Are you available for a quick chat?</div>
            </div>
            <div style={{ padding: "16px", cursor: "pointer", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ fontWeight: 600, color: "var(--text-card-primary)" }}>DevClash Founders</div>
              <div style={{ fontSize: "13px", color: "var(--text-card-secondary)", marginTop: "4px" }}>Let's partner up.</div>
            </div>
          </div>
          <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)", fontWeight: 700, color: "var(--text-card-primary)" }}>
              Sarah (Recruiter @ Stripe)
            </div>
            <div style={{ flex: 1, padding: "24px", background: "var(--bg-primary)" }}>
              <div style={{ background: "var(--bg-card)", padding: "12px", borderRadius: "8px", maxWidth: "70%", marginBottom: "16px", border: "1px solid var(--border-color)" }}>
                <p style={{ fontSize: "14px", color: "var(--text-card-primary)" }}>Hi! We saw your experienced profile and loved your React work. Are you available for a quick chat regarding a Senior position?</p>
              </div>
            </div>
            <div style={{ padding: "16px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "8px" }}>
              <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--input-bg)", color: "var(--text-card-primary)" }} />
              <button style={{ background: "var(--accent-blue)", color: "#fff", border: "none", padding: "0 16px", borderRadius: "8px", fontWeight: 600 }}>Send</button>
            </div>
          </div>
        </Card>
      </ContentArea>
    </PageContainer>
  );
};

export default Messages;
