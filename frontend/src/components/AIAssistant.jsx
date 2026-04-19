import React, { useState, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Lightbulb, TrendingUp, UserPlus, Zap } from 'lucide-react';

const AIAssistant = ({ currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tips, setTips] = useState([]);

  const pageTips = {
    '/feed': [
      { id: 1, icon: <TrendingUp size={16} />, text: "Trending: 'Generative AI' is the most searched skill today. Update your posts to include it." },
      { id: 2, icon: <UserPlus size={16} />, text: "Networking Suggestion: You have 5 common connections with Sarah from Stripe. Reach out!" },
      { id: 3, icon: <Zap size={16} />, text: "Usage Tip: Sponsored posts get 3x more engagement on weekends." }
    ],
    '/profile': [
      { id: 1, icon: <Lightbulb size={16} />, text: "Profile Guidance: Adding a professional cover photo increases profile views by 20%." },
      { id: 2, icon: <Sparkles size={16} />, text: "Content Enhancement: Your 'Experience' section is a bit short. Add 2 more bullet points for better SEO." },
      { id: 3, icon: <MessageSquare size={16} />, text: "Usage Suggestion: Toggle 'Open to work' to attract recruiters specifically for 'Senior' roles." }
    ],
    '/events': [
      { id: 1, icon: <Zap size={16} />, text: "Event Tip: High-signal webinars perform best on Tuesday afternoons." },
      { id: 2, icon: <Lightbulb size={16} />, text: "Promotion Suggestion: Use 'Industry Events' to find co-hosts for your next session." }
    ]
  };

  useEffect(() => {
    setTips(pageTips[currentPage] || [
      { id: 1, icon: <Zap size={16} />, text: "Hi! I'm Designer X. I'll provide smart tips and suggestions based on where you are in the platform." }
    ]);
  }, [currentPage]);

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      {/* Assistant Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-[#9b4fdf] to-[#3674e0] text-white flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? <X size={24} /> : <span className="text-[24px] font-bold leading-none animate-pulse">X</span>}
      </button>

      {/* Assistant Panel */}
      <div 
        className={`absolute bottom-20 right-0 w-80 border border-white/10 rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.4)] p-6 transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ backgroundColor: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center text-[18px] font-bold">
            X
          </div>
          <div>
            <h3 className="text-[16px] font-black text-white tracking-tight">Designer X</h3>
            <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest">Smart Suggestions</p>
          </div>
        </div>

        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-purple-500/30 transition-all cursor-default group">
              <div className="flex gap-3">
                <div className="mt-1 text-purple-500 transition-transform group-hover:scale-110">
                  {tip.icon}
                </div>
                <p className="text-[12px] text-[var(--text-card-secondary)] leading-relaxed font-medium">
                  {tip.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-black/[0.03] border border-[var(--border-card)] text-[11px] font-black text-[var(--text-card-muted)] uppercase tracking-widest hover:bg-black/5 hover:text-[var(--text-card-primary)] transition-all">
          View All AI Insights
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
