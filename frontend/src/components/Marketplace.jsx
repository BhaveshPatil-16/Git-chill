import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Landmark, TrendingUp, Handshake, Briefcase, Globe, Filter, Search, ArrowUpRight, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

const OPPORTUNITIES = [
  {
    id: 1,
    type: "Funding Round",
    title: "Seed Round: AI-Driven Logistics Platform",
    company: "LogiSmart AI",
    amount: "$2.5M",
    equity: "10-15%",
    desc: "Series Seed for a logistics automation startup with $50k MRR and 300% YoY growth. Looking for lead investors.",
    tags: ["Seed", "AI", "Logistics"],
    status: "Open",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    type: "Acquisition",
    title: "SaaS Analytics Tool for E-commerce",
    company: "DataDash",
    amount: "$1.2M",
    equity: "100%",
    desc: "Profitable micro-SaaS with $15k MRR looking for a strategic exit. High automation, low churn, and clean codebase.",
    tags: ["Acquisition", "SaaS", "E-commerce"],
    status: "Private",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    type: "Partnership",
    title: "Joint Venture: Renewable Energy Tech",
    company: "EcoFlow Systems",
    amount: "N/A",
    equity: "Co-Development",
    desc: "Looking for an engineering partner to co-develop smart grid integration modules for solar installations.",
    tags: ["Partnership", "GreenTech", "Hardware"],
    status: "Active",
    logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=100&h=100&fit=crop"
  }
];

const Marketplace = () => {
  const [filter, setFilter] = useState("All");

  return (
    <div className="w-full space-y-8 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-6">
              <Landmark size={14} /> Strategic Growth
            </div>
            <h1 className="text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Business Opportunity<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Marketplace.</span>
            </h1>
            <p className="text-white/40 text-[18px] leading-relaxed max-w-[500px] mb-10 font-medium">
              A high-signal space where startups, investors, and partners discover funding, acquisitions, and strategic collaborations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-blue-600 text-white font-black text-[16px] flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20">
                 Post Opportunity
               </button>
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[16px] transition-all flex items-center justify-center gap-2">
                 Investor Portal
               </button>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-[400px]">
             {[
               { label: "M&A Deals", val: "$1.2B+", icon: <TrendingUp className="text-green-500" /> },
               { label: "Active Investors", val: "450+", icon: <Globe className="text-blue-500" /> },
               { label: "Partnerships", val: "890+", icon: <Handshake className="text-purple-500" /> },
               { label: "Funding Rounds", val: "120+", icon: <PieChart className="text-orange-500" /> }
             ].map((stat, i) => (
               <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-white/40">
                    {stat.icon}
                  </div>
                  <div className="text-[20px] font-black text-white">{stat.val}</div>
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["All", "Funding Round", "Acquisition", "Partnership", "Growth"].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all border ${filter === f ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-[var(--bg-card)] border-[var(--border-card)] text-[var(--text-card-secondary)] hover:border-blue-500/30'}`}
              >
                {f}
              </button>
            ))}
         </div>
         <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
            <input type="text" placeholder="Filter by industry, tech..." className="w-full h-12 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-2xl pl-12 pr-4 text-[14px] font-medium text-[var(--text-card-primary)] outline-none focus:border-blue-500/30 shadow-sm" />
         </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {OPPORTUNITIES.map((opt) => (
          <div key={opt.id} className="bg-[var(--bg-card)] rounded-[32px] border border-[var(--border-card)] p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group flex flex-col h-full">
             <div className="flex items-start justify-between mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${opt.type === 'Acquisition' ? 'bg-orange-500/10 text-orange-600' : opt.type === 'Funding Round' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                   {opt.type}
                </div>
                <div className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                   <ShieldCheck size={12} /> Verified Opportunity
                </div>
             </div>

             <div className="flex-1 space-y-4">
                <h3 className="text-[20px] font-black text-[var(--text-card-primary)] leading-tight tracking-tight group-hover:text-blue-500 transition-colors">
                  {opt.title}
                </h3>
                <div className="flex items-center gap-3">
                   <img src={opt.logo} alt="" className="w-8 h-8 rounded-lg object-cover" />
                   <span className="text-[14px] font-bold text-[var(--text-card-secondary)]">{opt.company}</span>
                </div>
                <p className="text-[14px] text-[var(--text-card-secondary)] font-medium leading-relaxed line-clamp-3">
                  {opt.desc}
                </p>
             </div>

             <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                      <div className="text-[10px] text-[var(--text-card-muted)] font-black uppercase mb-1">Target</div>
                      <div className="text-[16px] font-black text-blue-600">{opt.amount}</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                      <div className="text-[10px] text-[var(--text-card-muted)] font-black uppercase mb-1">Equity/Terms</div>
                      <div className="text-[16px] font-black">{opt.equity}</div>
                   </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] font-black text-[14px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/5">
                   View Deal Details <ArrowUpRight size={18} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Strategic Value Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-10 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Handshake size={160} />
         </div>
         <div className="relative z-10 space-y-6 max-w-[600px]">
            <h2 className="text-[32px] font-black leading-tight tracking-tight">Expand through Strategic Collaborations</h2>
            <p className="text-white/70 text-[18px] font-medium leading-relaxed">
               Whether you're looking for an exit, a lead investor, or a technical partner for a joint venture, our marketplace connects you with verified high-signal entities.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
               <button className="h-14 px-8 rounded-2xl bg-white text-black font-black text-[15px] transition-all">List Your Intent</button>
               <button className="h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[15px] transition-all">Browse M&A Deals</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default connect(null)(Marketplace);
