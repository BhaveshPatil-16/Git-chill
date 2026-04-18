import React from "react";

const Messages = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-card)] p-0 flex overflow-hidden"
        style={{ boxShadow: "var(--card-shadow)", height: "75vh" }}
      >
        {/* Inbox List */}
        <div className="w-[280px] border-r border-[var(--border-card)] flex flex-col flex-shrink-0 md:w-[200px]">
          <div className="p-4 border-b border-[var(--border-card)] font-bold text-[var(--text-card-primary)] text-[15px] tracking-[-0.02em]">
            Inbox
          </div>
          <div className="p-4 bg-black/[0.03] cursor-pointer border-b border-[var(--border-card)] hover:bg-black/[0.05] transition-colors duration-[180ms]">
            <div className="font-semibold text-[var(--accent-blue)] text-[14px] tracking-[-0.02em]">Sarah (Recruiter @ Stripe)</div>
            <div className="text-[12.5px] text-[var(--text-card-muted)] mt-1 tracking-[-0.01em]">Are you available for a quick chat?</div>
          </div>
          <div className="p-4 cursor-pointer border-b border-[var(--border-card)] hover:bg-black/[0.03] transition-colors duration-[180ms]">
            <div className="font-semibold text-[var(--text-card-primary)] text-[14px] tracking-[-0.02em]">DevClash Founders</div>
            <div className="text-[12.5px] text-[var(--text-card-muted)] mt-1 tracking-[-0.01em]">Let's partner up.</div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-4 border-b border-[var(--border-card)] font-bold text-[var(--text-card-primary)] text-[15px] tracking-[-0.02em]">
            Sarah (Recruiter @ Stripe)
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div
              className="bg-[var(--bg-card)] p-3.5 rounded-2xl rounded-tl-sm max-w-[70%] mb-4 border border-[var(--border-card)]"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <p className="text-[14px] text-[var(--text-card-primary)] leading-[1.6] tracking-[-0.01em]">
                Hi! We saw your experienced profile and loved your React work. Are you available for a quick chat regarding a Senior position?
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-[var(--border-card)] flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2.5 rounded-lg border border-[var(--border-card)] text-[var(--text-card-primary)] text-[14px] tracking-[-0.01em] transition-all duration-[180ms] focus:outline-none focus:ring-1 focus:ring-[var(--accent-purple)]"
              style={{ background: "var(--input-bg)" }}
            />
            <button
              className="text-white border-none px-5 rounded-lg font-semibold cursor-pointer transition-all duration-[180ms] text-[13px] tracking-[-0.01em] hover:opacity-90"
              style={{ background: "var(--gradient-accent)" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
