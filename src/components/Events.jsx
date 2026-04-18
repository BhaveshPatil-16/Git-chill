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
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;

const TitleLine = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.03em;
`;

const CreateEventBtn = styled.button`
  font-size: 13px;
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-card);
  padding: 9px 20px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-fast);
  letter-spacing: -0.01em;
  
  &:hover {
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const GridContainer = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 28px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-normal);
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  /* Outer cutout color needs to match background of page */
  background: var(--bg-primary); 
  border-radius: var(--radius-xl);
  border-bottom-right-radius: 0;
  overflow: hidden;
`;

const CardBox = styled.div`
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
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
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img {
    transform: scale(1.06);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 72px;
  height: 72px;
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
  box-shadow: 0 3px 10px rgba(155, 79, 223, 0.25);
  
  svg {
    color: #fff;
    width: 22px;
    height: 22px;
    stroke-width: 2.5;
  }
`;

const EventContent = styled.div`
  padding: 18px 8px;
  
  h3 {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
    letter-spacing: -0.02em;
    line-height: 1.35;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 16px;
    font-size: 13px;
    letter-spacing: -0.01em;
  }
`;

const TagsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

const TagItem = styled.li`
  text-transform: uppercase;
  background: ${props => props.bg || 'rgba(155, 79, 223, 0.08)'};
  color: ${props => props.color || 'var(--accent-purple)'};
  font-weight: 600;
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const EVENTS_DATA = [
  {
    title: "AWS Startups Summit 2026",
    desc: "Join top CTOs discussing infrastructure scaling and generative AI deployment. Hear from founders who scaled from $0 to $10M ARR.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "cloud compute", bg: "rgba(54, 116, 224, 0.1)", color: "var(--accent-blue)" },
      { label: "sponsored", bg: "rgba(155, 79, 223, 0.1)", color: "var(--accent-purple)" }
    ]
  },
  {
    title: "React Server Components Webinar",
    desc: "Learn how Vercel migrated their core infrastructure to RSC, reducing bundle sizes by 40%. Live Q&A with the core engineering team.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "frontend", bg: "rgba(13, 147, 98, 0.1)", color: "#0d8758" },
      { label: "architecture", bg: "rgba(217, 154, 28, 0.1)", color: "#c78c0a" }
    ]
  },
  {
    title: "Product Design Leadership Group",
    desc: "An exclusive invite-only mixer for Lead and Principal Product Designers. We will be sharing case studies on user retention.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "design", bg: "rgba(209, 65, 139, 0.1)", color: "#c73e87" },
      { label: "leadership", bg: "rgba(88, 91, 214, 0.1)", color: "#585bd6" }
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
          <CreateEventBtn>+ Create Event</CreateEventBtn>
        </TitleLine>
        
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "4px", letterSpacing: "-0.01em" }}>
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
