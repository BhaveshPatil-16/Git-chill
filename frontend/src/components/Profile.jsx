import React from "react";

const Profile = () => {
  return (
    <div className="w-full flex flex-col gap-5">

      {/* AI Optimizer Banner */}
      <div className="bg-gradient-to-r from-[var(--accent-purple)]/10 to-[var(--accent-blue)]/10 border border-[var(--accent-purple)]/30 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-2xl flex-shrink-0">✨</div>
        <div className="flex-1">
          <h4 className="text-[var(--accent-purple)] mb-1 text-[14px] font-bold tracking-[-0.02em]">AI Profile Optimizer</h4>
          <p className="text-[13px] text-[var(--text-card-secondary)] leading-[1.5] font-medium tracking-[-0.01em]">
            Your profile visibility is at 60%. Completing your "Projects" section typically increases top-tier recruiter messages by 2.4x. Let AI draft a summary for you based on your GitHub?
          </p>
        </div>
        <button className="bg-[var(--accent-purple)] text-white border-none py-2 px-4 rounded-lg cursor-pointer whitespace-nowrap font-semibold text-[13px] tracking-[-0.01em] transition-all duration-[180ms] hover:opacity-90 hover:-translate-y-px flex-shrink-0">
          Auto-Generate Draft
        </button>
      </div>

      {/* Profile Card */}
      <div
        className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)]"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-5">
            <img
              src="/images/user.svg"
              alt=""
              className="w-[100px] h-[100px] rounded-full border-4 border-[var(--border-card)] object-cover bg-white flex-shrink-0"
            />
            <div>
              <h1 className="text-[24px] font-extrabold text-[var(--text-card-primary)] tracking-[-0.03em]">
                Software Professional
              </h1>
              <p className="text-[14px] text-[var(--text-card-secondary)] mt-1 tracking-[-0.01em]">
                Senior Frontend Engineer | 5+ Years Experience
              </p>
              <p className="text-[12.5px] text-[var(--text-card-muted)] mt-2 tracking-[-0.01em]">
                San Francisco, CA · 500+ Connections
              </p>
            </div>
          </div>
          <button className="bg-transparent border border-[var(--accent-blue)] py-2 px-4 rounded-full font-semibold text-[13px] cursor-pointer transition-all duration-[180ms] hover:bg-[var(--accent-blue)]/10 tracking-[-0.01em] flex-shrink-0" style={{ color: "var(--accent-blue)" }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Experience Card */}
      <div
        className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-card)] transition-all duration-[260ms] hover:shadow-[var(--card-shadow-hover)]"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <h2 className="text-[16px] font-bold text-[var(--text-card-primary)] mb-5 tracking-[-0.02em]">
          Verified Experience
        </h2>
        <div className="flex gap-4 pb-4 border-b border-[var(--border-card)]">
          <div className="bg-[#f8f9fb] p-3 rounded-lg text-2xl border border-[var(--border-card)] flex-shrink-0 flex items-center justify-center w-14 h-14">
            🚀
          </div>
          <div>
            <h4 className="text-[var(--text-card-primary)] text-[15px] font-bold tracking-[-0.02em]">
              Senior React Developer
            </h4>
            <p className="text-[var(--text-card-secondary)] text-[13px] my-1 tracking-[-0.01em]">
              TechCorp Inc. · Full-time
            </p>
            <p className="text-[var(--text-card-muted)] text-[11.5px] tracking-[-0.01em]">
              2020 – Present
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
