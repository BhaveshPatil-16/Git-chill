import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TrendingUp, ShieldCheck, UserCheck, Handshake, Info, ArrowUpRight, Filter, Search, Building, DollarSign } from 'lucide-react';

const InvestmentHub = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [introStatus, setIntroStatus] = useState({ id: null, msg: '' });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v2/investment/deals');
        const data = await res.json();
        if (data.success) setDeals(data.deals);
      } catch (err) {
        console.error('Failed to fetch deals');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleRequestIntro = async (dealId) => {
    setIntroStatus({ id: dealId, msg: 'Sending request...' });
    try {
      const res = await fetch('http://localhost:3001/api/v2/investment/request-intro', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Assuming we store token here
        },
        body: JSON.stringify({ dealId, investorNote: 'I am interested in discussing this deal further.' })
      });
      const data = await res.json();
      if (data.success) {
        setIntroStatus({ id: dealId, msg: '✅ Request Sent' });
      } else {
        setIntroStatus({ id: dealId, msg: '❌ Failed' });
      }
    } catch {
      setIntroStatus({ id: dealId, msg: '❌ Error' });
    }
  };

  return (
    <div className="w-full space-y-10 pb-24 animate-fadeIn">
      {/* Premium Hero */}
      <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1e1b4b] rounded-[48px] p-12 border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent 70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent 70%)] pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-5 py-2 rounded-full text-[13px] font-black uppercase tracking-widest border border-purple-500/20">
            <TrendingUp size={16} /> Investment Hub
          </div>
          <h1 className="text-[48px] md:text-[60px] font-black text-white leading-[1.05] tracking-tighter">
            Direct Founder-to-Investor<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6]">Trust Ecosystem.</span>
          </h1>
          <p className="text-white/40 text-[18px] leading-relaxed max-w-[600px] font-medium">
            Browse high-growth opportunities verified directly at the ownership level. No middlemen, no brokers—just pure professional alignment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button className="h-16 px-10 rounded-2xl bg-white text-black font-black text-[16px] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
               List Investment Deal
             </button>
             <button className="h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[16px] hover:bg-white/10 transition-all">
               Verify My Entity
             </button>
          </div>
        </div>
      </div>

      {/* Trust Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/3 p-6 rounded-[32px] border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search deals by industry, stage, or valuation..."
            className="w-full h-14 bg-transparent pl-12 pr-4 text-[15px] text-white placeholder-white/20 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold text-white/30 uppercase tracking-widest mr-2">Filter By:</span>
          <button className="px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[13px] font-black flex items-center gap-2">
            <ShieldCheck size={16} /> Verified Founders
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-[13px] font-bold hover:bg-white/10 transition-all">
            Equity Only
          </button>
        </div>
      </div>

      {/* Deal Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-[400px] bg-white/5 rounded-[40px]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deals.map(deal => (
            <div key={deal.id} className="bg-white/3 border border-white/5 rounded-[40px] p-10 hover:border-white/15 transition-all group relative overflow-hidden">
               {/* Background Accent */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-[100px] -z-10 transition-all group-hover:scale-110" />
               
               <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <div className="text-[12px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                       <Building size={14} /> {deal.entityName}
                    </div>
                    <h3 className="text-[26px] font-black text-white tracking-tight">{deal.title}</h3>
                  </div>
                  {deal.trustIndicators.isFounderVerified && (
                    <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                       <UserCheck size={14} /> Verified Founder
                    </div>
                  )}
               </div>

               <p className="text-white/40 text-[15px] font-medium leading-relaxed line-clamp-3 mb-8">
                 {deal.description}
               </p>

               <div className="grid grid-cols-3 gap-6 mb-10">
                  <div className="space-y-1">
                     <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Goal</span>
                     <div className="text-[18px] font-black text-white">${deal.fundingGoal}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Valuation</span>
                     <div className="text-[18px] font-black text-white">${deal.valuation}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Equity</span>
                     <div className="text-[18px] font-black text-green-500">{deal.equityOffered}%</div>
                  </div>
               </div>

               <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => handleRequestIntro(deal.id)}
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-black text-[15px] shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {introStatus.id === deal.id ? introStatus.msg : <><Handshake size={18} /> Request Direct Intro</>}
                  </button>
                  <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all">
                    <Info size={20} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Anti-Middleman Safeguard Notice */}
      <div className="bg-gradient-to-r from-red-500/5 to-transparent border-l-4 border-red-500/30 p-8 rounded-r-3xl">
         <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center shrink-0">
               <ShieldCheck size={24} className="text-red-500" />
            </div>
            <div className="space-y-2">
               <h4 className="text-[18px] font-black text-white tracking-tight">Direct Trust Enforcement</h4>
               <p className="text-white/40 text-[14px] leading-relaxed max-w-[800px]">
                 HireX strictly prohibits unauthorized brokers or middlemen. Every intro request is sent directly to the verified owner's private terminal. If you detect a third-party representative misrepresenting themselves as a founder, please report the deal immediately for administrative review.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.userState.user });
export default connect(mapStateToProps)(InvestmentHub);
