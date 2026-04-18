import React from "react";

const EVENTS_DATA = [
  {
    title: "AWS Startups Summit 2026",
    desc: "Join top CTOs discussing infrastructure scaling and generative AI deployment. Hear from founders who scaled from $0 to $10M ARR.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "cloud compute", className: "bg-[#3674e0]/15 text-[#3674e0]" },
      { label: "sponsored", className: "bg-[#9b4fdf]/15 text-[#9b4fdf]" }
    ]
  },
  {
    title: "React Server Components Webinar",
    desc: "Learn how Vercel migrated their core infrastructure to RSC, reducing bundle sizes by 40%. Live Q&A with the core engineering team.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "frontend", className: "bg-[#10b981]/15 text-[#10b981]" },
      { label: "architecture", className: "bg-[#f59e0b]/15 text-[#f59e0b]" }
    ]
  },
  {
    title: "Product Design Leadership Group",
    desc: "An exclusive invite-only mixer for Lead and Principal Product Designers. Sharing case studies on user retention and growth loops.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    tags: [
      { label: "design", className: "bg-[#ec4899]/15 text-[#ec4899]" },
      { label: "leadership", className: "bg-[#6366f1]/15 text-[#6366f1]" }
    ]
  }
];

const Events = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[24px] font-extrabold text-[var(--text-card-primary)] tracking-[-0.03em]">
          Industry Events
        </h2>
        <button
          className="text-[13px] border border-[var(--border-card)] py-2.5 px-5 rounded-lg cursor-pointer font-bold transition-all duration-[260ms] tracking-[-0.01em] hover:-translate-y-0.5"
          style={{
            background: "var(--bg-card)",
            color: "var(--text-card-primary)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          + Create Event
        </button>
      </div>

      <p className="text-[var(--text-card-secondary)] text-[15px] mb-8 tracking-[-0.01em]">
        Leading companies have trusted us to host premium, exclusive opportunities.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
        {EVENTS_DATA.map((event, idx) => (
          <div key={idx} className="flex flex-col group">
            <div className="relative w-full h-[220px] rounded-t-2xl rounded-bl-2xl overflow-hidden">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Arrow button */}
              <div className="absolute -bottom-1.5 -right-1.5 w-20 h-20 rounded-tl-full"
                style={{ background: "var(--bg-primary)" }}
              >
                <a
                  href="#"
                  className="absolute inset-2.5 rounded-full flex justify-center items-center no-underline transition-all duration-300 hover:scale-110"
                  style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 12px rgba(155,79,223,0.3)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="py-5 px-1">
              <h3 className="text-[18px] font-extrabold text-[var(--text-card-primary)] mb-2 tracking-[-0.02em]">
                {event.title}
              </h3>
              <p className="text-[var(--text-card-secondary)] leading-[1.6] mb-4 text-[13.5px] tracking-[-0.01em]">
                {event.desc}
              </p>
              <ul className="m-0 p-0 list-none flex items-center flex-wrap gap-2">
                {event.tags.map((tag, i) => (
                  <li key={i} className={`uppercase font-bold text-[11px] py-1.5 px-2.5 rounded-md tracking-[0.5px] ${tag.className}`}>
                    {tag.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
