import React, { useState } from "react";
import { connect } from "react-redux";
import { Upload, Briefcase, MapPin, Users, Settings, Plus, FileText, CheckCircle2, ChevronRight, Sparkles, RefreshCw, Building2 } from 'lucide-react';

const Profile = ({ user, showJobs, setShowJobs }) => {
  const [resumeName, setResumeName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setIsUploading(true);
      // Mocking AI extraction
      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-[var(--bg-card)] rounded-[32px] overflow-hidden border border-[var(--border-card)] shadow-[var(--card-shadow-elevated)]">
        {/* Cover Image */}
        <div className="h-40 bg-gradient-to-r from-[#1a1a2e] via-[#4338ca] to-[#1a1a2e] relative">
          <div className="absolute inset-0 bg-black/20" />
          <button className="absolute bottom-4 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white p-2 rounded-full hover:bg-white/20 transition-all">
            <Settings size={18} />
          </button>
        </div>

        <div className="px-8 pb-8 relative">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-8">
            <div className="relative group">
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-32 h-32 rounded-3xl border-4 border-[var(--bg-card)] object-cover shadow-2xl bg-white" />
              ) : (
                <div className="w-32 h-32 rounded-3xl border-4 border-[var(--bg-card)] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
                  <span className="text-4xl text-gray-300 font-bold">{user?.displayName?.charAt(0) || 'U'}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Upload className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between pt-20 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-[32px] font-black text-[var(--text-card-primary)] tracking-tighter">
                  {user?.displayName || "Anonymous Professional"}
                </h1>
                <span className="bg-blue-500/10 text-blue-600 p-1 rounded-full" title="Identity Verified"><CheckCircle2 size={16} /></span>
                {user?.email?.includes('@') && !['gmail.com', 'outlook.com', 'yahoo.com'].includes(user.email.split('@')[1]) && (
                  <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/20 flex items-center gap-1.5 shadow-sm">
                    <Building2 size={10} /> Verified Business
                  </span>
                )}
              </div>
              <p className="text-[16px] text-[var(--text-card-secondary)] font-semibold tracking-tight">
                Senior Systems Architect & Product Strategy
              </p>
              <div className="flex items-center gap-4 text-[13px] text-[var(--text-card-muted)] font-medium pt-1">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="opacity-60" /> San Francisco, CA</span>
                <span className="flex items-center gap-1.5"><Users size={14} className="opacity-60" /> 2.4k Connections</span>
              </div>
              <div className="pt-3 flex gap-2">
                 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/20 text-purple-500 text-[12px] font-bold hover:bg-purple-500/10 transition-all group">
                    <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                    AI Profile Optimizer
                 </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-xl border border-[var(--border-card)] text-[var(--text-card-primary)] font-bold text-[13px] hover:bg-black/5 transition-all">
                More
              </button>
              <button className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#9b4fdf] to-[#3674e0] text-white font-bold text-[13px] shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
                Open to work
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Stats & Settings */}
        <div className="space-y-6 md:col-span-1">
          {/* Job Interest Toggle Card */}
          <div className="bg-[var(--bg-card)] rounded-[24px] p-6 border border-[var(--border-card)] shadow-[var(--card-shadow)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[var(--text-card-primary)]">Career Focus</h3>
              <Sparkles size={16} className="text-purple-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">Job Content</span>
                  <span className="text-[11px] text-[var(--text-card-muted)]">Show hiring feed</span>
                </div>
                <button 
                  onClick={() => setShowJobs(!showJobs)}
                  className={`w-11 h-6 rounded-full transition-all relative ${showJobs ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showJobs ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-[var(--bg-card)] rounded-[24px] p-6 border border-[var(--border-card)] shadow-[var(--card-shadow)]">
            <h3 className="text-[15px] font-bold text-[var(--text-card-primary)] mb-4">Analytics</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Profile Views", val: "1,240", change: "+12%" },
                { label: "Search Appearances", val: "482", change: "+5%" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                  <div className="text-[11px] text-[var(--text-card-muted)] uppercase font-black tracking-widest mb-1">{stat.label}</div>
                  <div className="flex items-end justify-between">
                    <span className="text-[20px] font-black">{stat.val}</span>
                    <span className="text-[11px] font-bold text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Resume Card */}
          <div className="bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] rounded-[24px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <FileText size={80} className="text-purple-500" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[20px] font-black text-white mb-2 tracking-tight">AI Resume Analysis</h3>
              <p className="text-white/40 text-[14px] mb-8 max-w-[320px]">Upload your resume to automatically populate your profile and get personalized career tips.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input 
                    type="file" 
                    id="resume" 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={handleResumeUpload}
                  />
                  <div className="h-14 rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center gap-3 text-white/50 font-bold text-[13px] group-hover:border-purple-500/50 transition-all">
                    {isUploading ? (
                      <><RefreshCw size={18} className="animate-spin text-purple-500" /> Extracting Data...</>
                    ) : resumeName ? (
                      <><CheckCircle2 size={18} className="text-green-500" /> {resumeName}</>
                    ) : (
                      <><Upload size={18} /> Choose Resume (PDF/DOC)</>
                    )}
                  </div>
                </div>
                <button className="h-14 px-8 rounded-xl bg-white text-black font-black text-[13px] hover:scale-[1.03] transition-all disabled:opacity-50" disabled={!resumeName || isUploading}>
                  Auto-Update Profile
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Job Experience Section */}
          {showJobs && (
            <div className="bg-[var(--bg-card)] rounded-[24px] p-6 border border-[var(--border-card)] shadow-[var(--card-shadow)] animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[17px] font-black text-[var(--text-card-primary)] tracking-tight">Experience History</h3>
                <button className="w-8 h-8 rounded-full border border-[var(--border-card)] flex items-center justify-center hover:bg-black/5 transition-all">
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-6">
                {[
                  { role: "Senior Frontend Lead", company: "Linear Tech", date: "2022 - Present", icon: "💎", desc: "Leading the core UI foundations team, building high-performance workspace tools used by 500k+ developers." },
                  { role: "Frontend Architect", company: "Vercel", date: "2020 - 2022", icon: "▲", desc: "Optimized deployment workflows and worked on Next.js core components for enterprise scale." }
                ].map((exp, i) => (
                  <div key={i} className="flex gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[20px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {exp.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[15px] font-bold text-[var(--text-card-primary)]">{exp.role}</h4>
                        <span className="text-[11px] font-bold text-[var(--text-card-muted)] uppercase tracking-wider">{exp.date}</span>
                      </div>
                      <p className="text-[13px] font-semibold text-purple-600">{exp.company}</p>
                      <p className="text-[13px] text-[var(--text-card-secondary)] leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showJobs && (
            <div className="p-12 text-center bg-[var(--bg-subtle)] border border-dashed border-[var(--border-subtle)] rounded-[32px] animate-fadeIn">
              <Briefcase size={40} className="mx-auto text-[var(--text-card-muted)] mb-4" />
              <h3 className="text-[16px] font-bold text-black/40 mb-2 tracking-tight">Job Content Hidden</h3>
              <p className="text-[13px] text-black/30 max-w-[280px] mx-auto">You've disabled job-related content. Toggle it on in settings to see experience and hiring feed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(Profile);
