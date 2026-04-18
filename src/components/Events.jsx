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
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;

const TitleLine = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
`;

const GridContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 32px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  /* Outer cutout color needs to match background of page */
  background: var(--bg-primary); 
  border-radius: 1.25rem;
  border-bottom-right-radius: 0;
  overflow: hidden;
`;

const CardBox = styled.div`
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  border-radius: 1.25rem;
  overflow: hidden;
  position: relative;
`;

const ImgBox = styled.div`
  position: absolute;
  inset: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 80px;
  height: 80px;
  background: var(--bg-primary);
  border-top-left-radius: 50%;
  
  &:hover .iconBox {
    transform: scale(1.1);
  }
  
  &::before {
    position: absolute;
    content: "";
    bottom: 6px;
    left: -20px;
    background: transparent;
    width: 20px;
    height: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 5px 5px 0 5px var(--bg-primary);
  }
  
  &::after {
    position: absolute;
    content: "";
    top: -20px;
    right: 6px;
    background: transparent;
    width: 20px;
    height: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 5px 5px 0 5px var(--bg-primary);
  }
`;

const IconBox = styled.a`
  position: absolute;
  inset: 10px;
  background: var(--gradient-accent);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  
  svg {
    color: #fff;
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
  }
`;

const EventContent = styled.div`
  padding: 20px 10px;
  
  h3 {
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 800;
    color: var(--text-card-primary);
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-card-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const TagsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagItem = styled.li`
  text-transform: uppercase;
  background: ${props => props.bg || 'rgba(168, 85, 247, 0.1)'};
  color: ${props => props.color || 'var(--accent-purple)'};
  font-weight: 700;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
`;

const EVENTS_DATA = [
  {
    title: "AWS Startups Summit 2026",
    desc: "Join top CTOs discussing infrastructure scaling and generative AI deployment. Hear from founders who scaled from $0 to $10M ARR.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "cloud compute", bg: "rgba(59, 130, 246, 0.15)", color: "var(--accent-blue)" },
      { label: "sponsored", bg: "rgba(168, 85, 247, 0.15)", color: "var(--accent-purple)" }
    ]
  },
  {
    title: "React Server Components Webinar",
    desc: "Learn how Vercel migrated their core infrastructure to RSC, reducing bundle sizes by 40%. Live Q&A with the core engineering team.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "frontend", bg: "rgba(16, 185, 129, 0.15)", color: "#10b981" },
      { label: "architecture", bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }
    ]
  },
  {
    title: "Product Design Leadership Group",
    desc: "An exclusive invite-only mixer for Lead and Principal Product Designers. We will be sharing case studies on user retention.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "design", bg: "rgba(236, 72, 153, 0.15)", color: "#ec4899" },
      { label: "leadership", bg: "rgba(99, 102, 241, 0.15)", color: "#6366f1" }
    ]
  }
];

const Events = () => {
  return (
    <PageContainer>
      <Left />
      <ContentArea>
        <TitleLine>
          Industry Events
          <button style={{ fontSize: "14px", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border-color)", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", boxShadow: "var(--card-shadow)" }}>
            + Create Event
          </button>
        </TitleLine>
        
        <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "8px" }}>
          Leading companies have trusted us to host premium, exclusive opportunities.
        </p>

        <GridContainer>
          {EVENTS_DATA.map((event, idx) => (
            <EventCard key={idx}>
              <CardInner>
                <CardBox>
                  <ImgBox>
                    <img src={event.img} alt={event.title} />
                  </ImgBox>
                  <IconWrapper>
                    <IconBox href="#" className="iconBox">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </IconBox>
                  </IconWrapper>
                </CardBox>
              </CardInner>
              <EventContent>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <TagsList>
                  {event.tags.map((tag, i) => (
                     <TagItem key={i} bg={tag.bg} color={tag.color}>{tag.label}</TagItem>
                  ))}
                </TagsList>
              </EventContent>
            </EventCard>
          ))}
        </GridContainer>
      </ContentArea>
    </PageContainer>
  );
};

export default Events;
