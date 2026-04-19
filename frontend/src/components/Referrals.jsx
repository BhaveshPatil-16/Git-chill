import React, { useState } from 'react';
import { connect } from "react-redux";
import { Users, Gift, Copy, CheckCircle, ArrowRight, Share2, Award, Zap } from 'lucide-react';

const Referrals = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "HIREX-X9" + (user?.uid?.substring(0, 4) || "77");

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Total Referrals", val: "12", icon: <Users size={20} className="text-blue-500" /> },
    { label: "Verified Leads", val: "8", icon: <CheckCircle size={20} className="text-green-500" /> },
    { label: "Credits Earned", val: "$400", icon: <Gift size={20} className="text-purple-500" /> }
  ];

  const activities = [
    { name: "John Smith", status: "Verified", reward: "$50", date: "2 days ago" },
    { name: "Sarah Connor", status: "In Progress", reward: "-", date: "5 days ago" },
    { name: "Mike Wazowski", status: "Verified", reward: "$50", date: "1 week ago" }
  ];

  return (
    <div className="w-full space-y-8 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[140%] bg-[radial-gradient(circle,rgba(155,79,223,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-6">
              <Zap size={14} /> New Reward Program
            </div>
            <h1 className="text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Invite friends,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">earn together.</span>
            </h1>
            <p className="text-white/40 text-[18px] leading-relaxed max-w-[480px] mb-10 font-medium">
              Share the future of professional networking. Earn <span className="text-white">$50 platform credit</span> for every verified professional you refer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-auto flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 transition-all hover:border-white/20 group">
                <span className="font-mono text-[20px] font-black text-white tracking-widest mr-8">{referralCode}</span>
                <button 
                  onClick={handleCopy}
                  className="bg-transparent border-none text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 font-black text-[14px] uppercase tracking-wider"
                >
                  {copied ? <><CheckCircle size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                </button>
              </div>
              <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-black font-black text-[16px] hover:scale-[1.03] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                <Share2 size={20} /> Share Link
              </button>
            </div>
          </div>

          <div className="w-full max-w-[340px] relative hidden lg:block">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-2xl animate-float">
               <div className="flex justify-center mb-6">
                 <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-2xl">
                    <Gift size={40} />
                 </div>
               </div>
               <div className="text-center space-y-2">
                  <div className="text-white/40 text-[12px] font-bold uppercase tracking-widest">Available Credit</div>
                  <div className="text-white text-[48px] font-black tracking-tighter">$400.00</div>
                  <div className="pt-4">
                    <button className="w-full py-4 rounded-xl bg-white/10 border border-white/10 text-white font-bold text-[14px] hover:bg-white/20 transition-all">Redeem Rewards</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Milestones */}
      <div className="bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border-card)] shadow-[var(--card-shadow)] overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
           <div>
              <h2 className="text-[22px] font-black text-[var(--text-card-primary)] tracking-tight mb-1">Growth Milestones</h2>
              <p className="text-[13px] text-[var(--text-card-muted)] font-medium">Complete milestones to unlock exclusive platform features.</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="text-right">
                 <div className="text-[14px] font-black text-[var(--text-card-primary)]">Silver Tier</div>
                 <div className="text-[11px] text-[var(--text-card-muted)] font-bold uppercase tracking-widest">Next: Gold (15 Ref)</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-500/10 text-gray-500 flex items-center justify-center border border-gray-500/20 shadow-inner">
                 <Award size={24} />
              </div>
           </div>
        </div>

        <div className="relative h-4 bg-black/[0.03] rounded-full border border-[var(--border-card)] overflow-hidden">
           <div 
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-shimmer" 
             style={{ width: '60%', backgroundSize: '200% 100%' }}
           />
        </div>
        
        <div className="flex justify-between mt-4">
           {[
             { label: "Explorer", threshold: "0", active: true },
             { label: "Connector", threshold: "5", active: true },
             { label: "Influencer", threshold: "10", active: true },
             { label: "Ambassador", threshold: "25", active: false },
             { label: "Legend", threshold: "50", active: false }
           ].map((m, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mb-2 ${m.active ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-black/10'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${m.active ? 'text-[var(--text-card-primary)]' : 'text-[var(--text-card-muted)]'}`}>{m.label}</span>
                <span className="text-[9px] text-[var(--text-card-muted)] font-bold">{m.threshold}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[var(--bg-card)] rounded-[24px] p-6 border border-[var(--border-card)] shadow-[var(--card-shadow)] flex items-center gap-5 group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-subtle)] flex items-center justify-center transition-transform group-hover:scale-110">
              {s.icon}
            </div>
            <div>
              <div className="text-[12px] text-[var(--text-card-muted)] font-black uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-[24px] font-black text-[var(--text-card-primary)]">{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Referral Activity */}
        <div className="md:col-span-2 bg-[var(--bg-card)] rounded-[32px] p-8 border border-[var(--border-card)] shadow-[var(--card-shadow)]">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-[20px] font-black text-[var(--text-card-primary)] tracking-tight">Recent Activity</h2>
              <button className="text-[13px] font-bold text-blue-500 hover:underline">View all referrals</button>
           </div>

           <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle-hover)] transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[15px]">{a.name}</div>
                        <div className="text-[12px] text-[var(--text-card-muted)] font-medium">{a.date}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-12">
                      <div className="hidden sm:block">
                        <div className={`text-[12px] font-bold px-3 py-1 rounded-full ${a.status === 'Verified' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
                          {a.status}
                        </div>
                      </div>
                      <div className="text-right w-16">
                        <div className="font-black text-[16px]">{a.reward}</div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-[32px] p-8 border border-blue-500/10 shadow-[var(--card-shadow)] space-y-8">
           <h2 className="text-[20px] font-black tracking-tight">How it works</h2>
           
           <div className="space-y-8">
              {[
                { step: "01", title: "Share Code", desc: "Send your unique referral code to friends and colleagues." },
                { step: "02", title: "Get Verified", desc: "Your friend signs up and completes identity verification." },
                { step: "03", title: "Collect Rewards", desc: "Receive $50 credit instantly in your reward wallet." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[14px] font-black text-purple-500 opacity-40">{step.step}</span>
                  <div>
                    <h4 className="font-bold text-[15px] mb-1">{step.title}</h4>
                    <p className="text-[13px] text-[var(--text-card-secondary)] leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
           </div>

           <div className="pt-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                 <Award className="text-yellow-500 flex-shrink-0" />
                 <p className="text-[12px] text-[var(--text-card-secondary)] font-medium">Refer 50 friends to unlock the <span className="text-[var(--text-card-primary)] font-bold">Ambassador Badge</span>.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(Referrals);
