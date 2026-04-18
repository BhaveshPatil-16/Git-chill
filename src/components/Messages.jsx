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
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-card);
  transition: all var(--transition-normal);
`;

const InboxItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  transition: all var(--transition-fast);
  
  &:hover {
    background: rgba(155, 79, 223, 0.03);
  }
  
  &.active {
    background: rgba(155, 79, 223, 0.04);
    border-left: 2px solid var(--accent-purple);
  }
`;

const InboxName = styled.div`
  font-weight: 600;
  font-size: 13.5px;
  letter-spacing: -0.02em;
`;

const InboxPreview = styled.div`
  font-size: 12.5px;
  color: var(--text-card-muted);
  margin-top: 3px;
  letter-spacing: -0.01em;
`;

const MessageBubble = styled.div`
  background: var(--bg-card);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  max-width: 70%;
  margin-bottom: 12px;
  border: 1px solid var(--border-card);
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  
  p {
    font-size: 13.5px;
    color: var(--text-card-primary);
    line-height: 1.6;
    letter-spacing: -0.01em;
  }
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-card);
  background: var(--input-bg);
  color: var(--text-card-primary);
  font-size: 13.5px;
  transition: all var(--transition-fast);
  letter-spacing: -0.01em;
  
  &:focus {
    outline: 1px solid rgba(155, 79, 223, 0.3);
    box-shadow: 0 0 0 3px rgba(155, 79, 223, 0.06);
  }
  
  &::placeholder {
    color: var(--text-card-muted);
  }
`;

const SendBtn = styled.button`
  background: var(--gradient-accent);
  color: #fff;
  border: none;
  padding: 0 18px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
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
`;

const Messages = () => {
  return (
    <PageContainer>
      <Left />
      <ContentArea>
        <Card style={{ padding: 0, display: "flex", height: "70vh", overflow: "hidden" }}>
          <div style={{ flex: 1, borderRight: "1px solid var(--border-card)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 16px", borderBottom: "1px solid var(--border-card)", fontWeight: 700, fontSize: '14px', color: "var(--text-card-primary)", letterSpacing: '-0.02em' }}>
              Inbox
            </div>
            <InboxItem className="active">
              <InboxName style={{ color: "var(--accent-blue)" }}>Sarah (Recruiter @ Stripe)</InboxName>
              <InboxPreview>Are you available for a quick chat?</InboxPreview>
            </InboxItem>
            <InboxItem>
              <InboxName style={{ color: "var(--text-card-primary)" }}>DevClash Founders</InboxName>
              <InboxPreview>Let's partner up.</InboxPreview>
            </InboxItem>
          </div>
          <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid var(--border-card)", fontWeight: 700, fontSize: '14px', color: "var(--text-card-primary)", letterSpacing: '-0.02em' }}>
              Sarah (Recruiter @ Stripe)
            </div>
            <div style={{ flex: 1, padding: "24px", background: "var(--bg-primary)" }}>
              <MessageBubble>
                <p>Hi! We saw your experienced profile and loved your React work. Are you available for a quick chat regarding a Senior position?</p>
              </MessageBubble>
            </div>
            <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border-card)", display: "flex", gap: "8px" }}>
              <MessageInput type="text" placeholder="Type a message..." />
              <SendBtn>Send</SendBtn>
            </div>
          </div>
        </Card>
      </ContentArea>
    </PageContainer>
  );
};

export default Messages;
