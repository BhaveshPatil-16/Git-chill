import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Sparkles, TrendingUp, Target, BarChart3, Users, Rocket, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const Promotions = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const campaignStats = [
    { label: "Total Reach", val: "45.2k", icon: <Users size={20} className="text-blue-500" /> },
    { label: "Engagement", val: "8.4%", icon: <Zap size={20} className="text-orange-500" /> },
    { label: "Conversions", val: "1.2k", icon: <Target size={20} className="text-purple-500" /> }
  ];

  return (
    <div className="w-full space-y-8 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[120%] bg-[radial-gradient(circle,rgba(155,79,223,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Sponsored Reach Engine
            </div>
            <h1 className="text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Boost Your<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Professional Reach.</span>
            </h1>
            <p className="text-white/40 text-[18px] leading-relaxed max-w-[500px] mb-10 font-medium">
              A high-visibility promotion system designed to help you reach the right audience through targeted placements and AI-driven discovery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-black font-black text-[16px] hover:scale-[1.03] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                 Create New Campaign
               </button>
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[16px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 Analyze Results
               </button>
            </div>
          </div>

          <div className="w-full max-w-[360px] hidden lg:block">
             <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-[15px] font-black text-white">Daily Performance</h4>
                   <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="space-y-4">
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[75%] rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                   </div>
                   <div className="flex justify-between text-[11px] font-bold text-white/40">
                      <span>REACH GAIN</span>
                      <span className="text-white">+24.5%</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-black text-white/30 uppercase mb-1">Clicks</div>
                      <div className="text-[18px] font-black text-white">1,204</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-black text-white/30 uppercase mb-1">Impr.</div>
                      <div className="text-[18px] font-black text-white">12.5k</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-[var(--border-subtle)] pb-2 px-2">
        {['Campaigns', 'Audience', 'Billing'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-4 text-[14px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.toLowerCase() ? 'text-[var(--text-card-primary)] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-purple-500 after:rounded-full' : 'text-[var(--text-card-muted)] hover:text-[var(--text-card-primary)]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        <h3 className="text-[20px] font-black text-[var(--text-card-primary)] tracking-tight px-2">Active Sponsored Placements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Senior Node.js Developer Hiring", type: "Job Placement", reach: "12,400", ctr: "5.2%", status: "Active" },
             { title: "AWS Startup Summit 2026", type: "Event Promotion", reach: "45,000", ctr: "8.4%", status: "Active" }
           ].map((c, i) => (
             <div key={i} className="bg-[var(--bg-card)] rounded-[24px] p-6 border border-[var(--border-card)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all group">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <div className="text-[11px] font-black text-purple-500 uppercase tracking-widest mb-1">{c.type}</div>
                      <h4 className="text-[16px] font-black text-[var(--text-card-primary)] group-hover:text-purple-500 transition-colors">{c.title}</h4>
                   </div>
                   <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {c.status}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                   <div>
                      <div className="text-[10px] text-[var(--text-card-muted)] font-bold uppercase mb-1">Total Reach</div>
                      <div className="text-[18px] font-black">{c.reach}</div>
                   </div>
                   <div>
                      <div className="text-[10px] text-[var(--text-card-muted)] font-bold uppercase mb-1">CTR</div>
                      <div className="text-[18px] font-black">{c.ctr}</div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { title: "Smart Targeting", icon: <Target className="text-blue-500" />, desc: "AI algorithms ensure your promotion reaches professionals with matching skill sets and interests." },
           { title: "Performance Discovery", icon: <BarChart3 className="text-green-500" />, desc: "Real-time analytics to track visibility, engagement, and conversion rates across platforms." },
           { title: "Campaign discovery", icon: <Rocket className="text-purple-500" />, desc: "Boost your high-impact posts or jobs into the 'Top Picks' section for immediate attention." }
         ].map((f, i) => (
            <div key={i} className="bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border-card)] shadow-[var(--card-shadow)] hover:-translate-y-1 transition-all">
               <div className="w-12 h-12 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                  {f.icon}
               </div>
               <h4 className="text-[18px] font-black text-[var(--text-card-primary)] tracking-tight mb-3">{f.title}</h4>
               <p className="text-[13px] text-[var(--text-card-secondary)] font-medium leading-relaxed">{f.desc}</p>
            </div>
         ))}
      </div>
    </div>
  );
};

export default connect(null)(Promotions);
