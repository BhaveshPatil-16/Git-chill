import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Building2, Search, Filter, ArrowUpRight, ShieldCheck, Briefcase, Zap, Globe, MessageSquare } from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    company: "Nexus Dev Labs",
    category: "Technical Services",
    title: "Enterprise Node.js Scaling & Architecture",
    desc: "We help fintech startups scale their backend infrastructure from 10k to 1M+ active users with 99.99% uptime.",
    rating: 4.9,
    completed: 124,
    tags: ["Backend", "Cloud", "Fintech"],
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    company: "Pixel Perfect",
    category: "Design & UX",
    title: "SaaS Design System Architecture",
    desc: "Specialized in creating scalable, accessible, and high-conversion design systems for complex SaaS products.",
    rating: 5.0,
    completed: 82,
    tags: ["UI/UX", "Design System", "SaaS"],
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    company: "Global Scale Consulting",
    category: "Consulting",
    title: "Market Entry & Growth Strategy (APAC)",
    desc: "Strategic guidance for North American software companies expanding into South East Asian markets.",
    rating: 4.8,
    completed: 45,
    tags: ["Strategy", "APAC", "Growth"],
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop"
  }
];

const BusinessExchange = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="w-full space-y-8 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle,rgba(54,116,224,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-6">
              <Building2 size={14} /> B2B Ecosystem
            </div>
            <h1 className="text-[40px] md:text-[52px] font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Business Service<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Exchange Hub.</span>
            </h1>
            <p className="text-white/40 text-[18px] leading-relaxed max-w-[500px] mb-8 font-medium">
              Collaborate with specialized organizations for technical services, consulting, and outsourcing through verified workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-black font-black text-[16px] hover:scale-[1.03] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                 List Your Company Services
               </button>
               <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[16px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 Find Partners
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search companies, services, or expertise..." 
              className="w-full h-14 bg-[var(--bg-card)] border border-[var(--border-card)] rounded-2xl pl-12 pr-4 text-[14px] font-medium text-[var(--text-card-primary)] outline-none focus:border-blue-500/50 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["All", "Technical Services", "Design & UX", "Consulting", "Outsourcing"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all border ${category === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-[var(--bg-card)] border-[var(--border-card)] text-[var(--text-card-secondary)] hover:border-blue-500/30'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* Service Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-[var(--bg-card)] rounded-[32px] border border-[var(--border-card)] p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1 transition-all group flex flex-col h-full">
             <div className="flex items-start justify-between mb-6">
                <img src={service.logo} alt="" className="w-14 h-14 rounded-2xl object-cover shadow-lg border border-[var(--border-card)]" />
                <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                   <ShieldCheck size={12} /> Verified
                </div>
             </div>

             <div className="flex-1 space-y-3">
                <div className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{service.category}</div>
                <h3 className="text-[20px] font-black text-[var(--text-card-primary)] leading-tight tracking-tight group-hover:text-blue-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-[14px] text-[var(--text-card-secondary)] font-medium leading-relaxed line-clamp-3">
                  {service.desc}
                </p>
             </div>

             <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] space-y-5">
                <div className="flex flex-wrap gap-2">
                   {service.tags.map(tag => (
                     <span key={tag} className="px-3 py-1 rounded-lg bg-[var(--bg-subtle)] text-[11px] font-bold text-[var(--text-card-muted)]">#{tag}</span>
                   ))}
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                         <span className="text-[14px] font-black">{service.rating}</span>
                         <span className="text-[10px] text-[var(--text-card-muted)] font-bold uppercase">Rating</span>
                      </div>
                      <div className="w-px h-6 bg-[var(--border-subtle)]" />
                      <div className="flex flex-col">
                         <span className="text-[14px] font-black">{service.completed}+</span>
                         <span className="text-[10px] text-[var(--text-card-muted)] font-bold uppercase">Deals</span>
                      </div>
                   </div>
                   <button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all">
                      <ArrowUpRight size={20} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Collaboration Flow Feature Card */}
      <div className="bg-gradient-to-br from-indigo-600/5 to-blue-600/5 rounded-[40px] border border-blue-500/10 p-10 flex flex-col md:flex-row items-center gap-12">
         <div className="flex-1 space-y-6">
            <h2 className="text-[28px] font-black text-[var(--text-card-primary)] tracking-tight">Structured Professional Workflows</h2>
            <p className="text-[16px] text-[var(--text-card-secondary)] leading-relaxed font-medium">
              Every collaboration on the Business Exchange hub follows a verified structure: Discovery → Proposal → Smart Contract → Milestone Execution → Delivery.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                     <ShieldCheck size={18} />
                  </div>
                  <span className="text-[13px] font-bold">Identity Verified</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                     <Zap size={18} />
                  </div>
                  <span className="text-[13px] font-bold">Escrow Payments</span>
               </div>
            </div>
         </div>
         <div className="w-full max-w-[320px] bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border-card)] shadow-2xl">
            <h4 className="text-[15px] font-black mb-6">Recent B2B Contracts</h4>
            <div className="space-y-4">
               {[
                 { type: "Consulting", val: "$12,400", time: "2h ago" },
                 { type: "Dev Services", val: "$45,000", time: "5h ago" },
                 { type: "UX Audit", val: "$3,200", time: "8h ago" }
               ].map((c, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                    <span className="text-[13px] font-bold text-[var(--text-card-primary)]">{c.type}</span>
                    <div className="text-right">
                       <div className="text-[13px] font-black text-green-600">{c.val}</div>
                       <div className="text-[10px] text-[var(--text-card-muted)] font-bold">{c.time}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default connect(null)(BusinessExchange);
